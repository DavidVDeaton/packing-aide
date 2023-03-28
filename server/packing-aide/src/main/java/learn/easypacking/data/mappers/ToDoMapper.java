package learn.easypacking.data.mappers;

import learn.easypacking.models.ToDo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ToDoMapper implements RowMapper<ToDo> {


    @Override
    public ToDo mapRow(ResultSet rs, int rowNum) throws SQLException {
        ToDo toDo = new ToDo();
        toDo.setToDoId(rs.getInt("todo_id"));
        toDo.setToDoDate(rs.getString("todo_date"));
        toDo.setToDoName(rs.getString("todo_name"));
        toDo.setToDoDescription(rs.getString("todo_description"));
        toDo.setToDoStatus(rs.getBoolean("todo_status"));
        toDo.setEventId(rs.getInt("event_id"));
        return toDo;
    }
}
