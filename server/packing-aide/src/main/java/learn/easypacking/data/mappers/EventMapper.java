package learn.easypacking.data.mappers;

import learn.easypacking.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EventMapper implements RowMapper<Event> {

    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        Event event = new Event();
        event.setEventId(rs.getInt("event_id"));
        event.setEventName(rs.getString("event_name"));
        event.setEventType(rs.getBoolean("event_type"));
        event.setStartDate(rs.getString("start_date"));
        event.setEndDate(rs.getString("end_date"));
        event.setAppUserId(rs.getInt("app_user_id"));
        event.setStartLocationId(rs.getInt("start_location_id"));
        event.setEndLocationId(rs.getInt("end_location_id"));
        return event;
    }
}
