package learn.easypacking.data;

import learn.easypacking.data.mappers.ItemMapper;
import learn.easypacking.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ItemJdbcTemplateRepository implements ItemRepository{

    private final JdbcTemplate jdbcTemplate;

    public ItemJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "Select * from item";
        return jdbcTemplate.query(sql, new ItemMapper());
    }

    @Override
    public Item findById(int itemId) {
        final String sql = "Select * from item where item_id =?;";
        return jdbcTemplate.query(sql, new ItemMapper(), itemId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Item> findByContainerId(int containerId) {
        final String sql = "Select * from item where container_id = ?;";
        return jdbcTemplate.query(sql, new ItemMapper(), containerId).stream().collect(Collectors.toList());
    }

    @Override
    public List<Item> findByUserId(int appUserId) {
        final String sql = "Select * from item where app_user_id = ?;";
        return jdbcTemplate.query(sql, new ItemMapper(), appUserId).stream().collect(Collectors.toList());

    }

    @Override
    public Item createItem (Item item) {
        final String sql = "Insert into item (item_name, pack_status, quantity, `description`, app_user_id, container_id) "
                + "values (?,?,?,?,?,?);" ;

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getItemName());
            ps.setBoolean(2, item.isPackStatus());
            ps.setInt(3, item.getQuantity());
            ps.setString(4, item.getDescription());
            ps.setInt(5, item.getAppUserId());
            ps.setInt(6, item.getContainerId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());
        return item;
    }

    @Override
    public boolean updateItem (Item item) {
        final String sql = "update item set "
                + "item_name = ?, "
                + "pack_status = ?, "
                + "quantity = ?, "
                + "`description` = ?, "
                + "app_user_id = ?, "
                + "container_id = ? "
                + "where item_id = ?;";

        return jdbcTemplate.update(sql,
                item.getItemName(),
                item.isPackStatus(),
                item.getQuantity(),
                item.getDescription(),
                item.getAppUserId(),
                item.getContainerId(),
                item.getItemId()) > 0;
    }

    @Override
    public boolean deleteById(int itemId) {
        return jdbcTemplate.update(
                "delete from item where item_id = ?", itemId
        ) > 0;
    }


}

