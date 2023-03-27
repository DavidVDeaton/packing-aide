package learn.easypacking.data.mappers;

import learn.easypacking.models.Container;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ContainerMapper implements RowMapper<Container> {
    @Override
    public Container mapRow(ResultSet resultSet, int i) throws SQLException {
        Container container = new Container();
        container.setContainerId(resultSet.getInt("container_id"));
        container.setParentContainerId(resultSet.getInt("parent_container_id"));
        container.setContainerName(resultSet.getString("container_name"));
        container.setEventId(resultSet.getInt("event_id"));
        return container;
    }
}
