package learn.easypacking.data.mappers;

import learn.easypacking.models.Item;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemMapper implements RowMapper<Item> {
    @Override
    public Item mapRow(ResultSet resultSet, int i) throws SQLException {
        Item item = new Item();
        item.setItemId(resultSet.getInt("item_id"));
        item.setItemName(resultSet.getString("item_name"));
        item.setPackStatus(resultSet.getBoolean("pack_status"));
        item.setQuantity(resultSet.getInt("quantity"));
        item.setDescription(resultSet.getString("description"));
        item.setUserId(resultSet.getInt("user_id"));
        item.setContainerId(resultSet.getInt("container_id"));
        return item;
    }
}
