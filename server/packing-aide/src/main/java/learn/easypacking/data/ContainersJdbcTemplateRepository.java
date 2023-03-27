package learn.easypacking.data;

import learn.easypacking.data.mappers.ContainerMapper;
import learn.easypacking.models.Container;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ContainersJdbcTemplateRepository implements ContainersRepository{
    private final JdbcTemplate jdbcTemplate;

    public ContainersJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Container> findAll() {
        final String sql = "select container_id, parent_container_id, container_name, event_id "
                + "from container;" ;
        return jdbcTemplate.query(sql, new ContainerMapper());
    }

    @Override
    public Container findById (int containerId) {
        final String sql = "Select select container_id, parent_container_id, container_name, event_id "
        + "from container"
        + "where container_id = ?;";

        return jdbcTemplate.query(sql, new ContainerMapper(), containerId).stream()
                .findFirst().orElse(null);

    }

    @Override
    public Container createContainer (Container container) {
        final String sql = "insert into container (parent_container_id, container_name, event_id) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, container.getParentContainerId());
            ps.setString(2, container.getContainerName());
            ps.setInt(3, container.getEventId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        container.setContainerId(keyHolder.getKey().intValue());
        return container;
    }

    @Override
    public boolean updateContainer (Container container) {
        final String sql = "update container set "
                + "parent_container_id = ?, "
                + "container_name = ?, "
                + "event_id = ? "
                + "where container_id = ?;";

        return jdbcTemplate.update(sql,
                container.getParentContainerId(),
                container.getContainerName(),
                container.getEventId(),
                container.getContainerId()) > 0;
    }

    @Override
    public boolean deleteById(int containerId) {
        return jdbcTemplate.update("delete from container where container_id = ?;", containerId) > 0;
    }


}
