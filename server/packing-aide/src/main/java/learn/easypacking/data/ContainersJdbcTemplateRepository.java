package learn.easypacking.data;

import learn.easypacking.data.mappers.ContainerMapper;
import learn.easypacking.data.mappers.EventMapper;
import learn.easypacking.data.mappers.ItemMapper;
import learn.easypacking.models.Container;
import learn.easypacking.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ContainersJdbcTemplateRepository implements ContainersRepository{
    private final JdbcTemplate jdbcTemplate;

    public ContainersJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Container> findAll() {
        final String sql = "select * from container; ";
        return jdbcTemplate.query(sql, new ContainerMapper());
    }

    @Override
    public Container findById (int containerId) {
        final String sql = "select * from container where container_id =?;";

        return jdbcTemplate.query(sql, new ContainerMapper(), containerId).stream()
                .findFirst().orElse(null);

    }

    @Override
    public List<Container> findByEventId(int eventId) {
        String sql = "Select * from container where event_id = ?;";
        return jdbcTemplate.query(sql, new ContainerMapper(), eventId).stream()
                .collect(Collectors.toList());
    }


    @Override
    public Container createContainer (Container container) {
        final String sql = "Insert into container (parent_container_id, container_name, event_id) values"
                + "(?,?,?);";

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
    @Transactional
    public boolean deleteById(int containerId) {
        List<Item> items  = jdbcTemplate.query("select * from item where container_id =?;",
                new ItemMapper(), containerId).stream().collect(Collectors.toList());

        for(int i = 0; i < items.size(); i++) {
            jdbcTemplate.update("delete from item where container_id = ?;", items.get(i).getContainerId());
        }
        return jdbcTemplate.update("delete from container where container_id = ?;", containerId) > 0;
    }


}
