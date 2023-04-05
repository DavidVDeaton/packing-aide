package learn.easypacking.data;

import learn.easypacking.data.mappers.AppUserMapper;
import learn.easypacking.data.mappers.ContainerMapper;
import learn.easypacking.data.mappers.EventMapper;
import learn.easypacking.models.AppUser;
import learn.easypacking.models.Container;
import learn.easypacking.models.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select app_user_id, username, password_hash, disabled "
                + "from app_user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser findByUserId(int appUserId) {
        List<String> roles = getRolesByUserId(appUserId);

        final String sql = "select app_user_id, username, password_hash, disabled "
                + "from app_user "
                + "where app_user_id = ?;";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), appUserId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser create(AppUser user) {

        final String sql = "insert into app_user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    @Transactional
    public void update(AppUser user) {

        final String sql = "update app_user set "
                + "username = ?, "
                + "password_hash = ? "
                + "where app_user_id = ?";

        jdbcTemplate.update(sql,
                user.getUsername(), user.isEnabled(), user.getAppUserId());

        updateRoles(user);
    }

    private void updateRoles(AppUser user) {
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", user.getAppUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = "insert into app_user_role (app_user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where `name` = ?;";
            jdbcTemplate.update(sql, user.getAppUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }

    private List<String> getRolesByUserId(int appUserId) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.app_user_id = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), appUserId);
    }

    @Override
    @Transactional
    public boolean deleteUser(int appUserId) {

        jdbcTemplate.update("delete from item where app_user_id = ?", appUserId);
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?", appUserId);
        List<Event> events = jdbcTemplate.query("Select * from event where app_user_id = ?;", new EventMapper(), appUserId).stream()
                .collect(Collectors.toList());

        for(int i = 0; i<events.size(); i++) {
            List<Container> containers = jdbcTemplate.query("Select * from container where event_id = ?;",
                    new ContainerMapper(), events.get(i).getEventId()).stream().collect(Collectors.toList());

            for(int j = 0; j < containers.size(); j++){
                jdbcTemplate.update("delete from item where container_id = ?;", containers.get(j).getContainerId());
            }
            jdbcTemplate.update("delete from todo where event_id = ?", events.get(i).getEventId());
            jdbcTemplate.update("delete from container where event_id = ?;", events.get(i).getEventId());
            jdbcTemplate.update("delete from `event` where event_id = ?;", events.get(i).getEventId());
        }
        return jdbcTemplate.update("delete from app_user where app_user_id = ?;", appUserId) > 0;
    }
}
