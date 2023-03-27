package learn.easypacking.data;

import learn.easypacking.data.mappers.ToDoMapper;
import learn.easypacking.models.ToDo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class ToDoJdbcTemplateRepository implements ToDoRepository {

    private final JdbcTemplate jdbcTemplate;

    public ToDoJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public ToDo findById(int toDoListId) {
        String sqlStatement = "Select * from todo where todo_id =?;";
        return jdbcTemplate.query(sqlStatement, new ToDoMapper(), toDoListId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public ToDo createToDo(ToDo toDo) {
        String sqlStatement = "Insert into todo (todo_date, todo_name, todo_description, todo_status, event_id) " +
                "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, toDo.getToDoDate());
            ps.setString(2, toDo.getToDoName());
            ps.setString(3, toDo.getToDoDescription());
            ps.setBoolean(4, toDo.getToDoStatus());
            ps.setInt(5, toDo.getEventId());
            return ps;
            }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }
        toDo.setToDoId(keyHolder.getKey().intValue());
        return toDo;
    }

    @Override
    public boolean updateToDo(ToDo toDo) {
        String sqlStatement = "update todo set " +
                "todo_date = ?, " +
                "todo_name = ?, " +
                "todo_description = ?, " +
                "todo_status = ?, " +
                "event_id = ? where todo_id = ?;";
        return jdbcTemplate.update(sqlStatement, toDo.getToDoDate(), toDo.getToDoName(), toDo.getToDoDescription(), toDo.getToDoStatus(), toDo.getEventId(), toDo.getToDoId()) > 0;
    }

    @Override
    public boolean deleteToDo(int toDoListId) {
        String sqlStatement = "delete from todo where todo_id = ?;";
        return jdbcTemplate.update(sqlStatement, toDoListId) > 0;
    }
}
