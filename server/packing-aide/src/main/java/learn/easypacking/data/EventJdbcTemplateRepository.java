package learn.easypacking.data;

import learn.easypacking.data.mappers.ContainerMapper;
import learn.easypacking.data.mappers.EventMapper;
import learn.easypacking.models.Container;
import learn.easypacking.models.Event;
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
public class EventJdbcTemplateRepository implements EventRepository{

    private JdbcTemplate jdbcTemplate;

    public EventJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Event findById(int eventId) {
        String sqlStatement = "Select * from `event` where event_id = ?;";
        return jdbcTemplate.query(sqlStatement, new EventMapper(), eventId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Event> findByUserId(int userId) {
        String sqlStatement = "Select * from `event` where app_user_id = ?;";
        return jdbcTemplate.query(sqlStatement, new EventMapper(), userId).stream()
                .collect(Collectors.toList());
    }

    @Override
    public Event createEvent(Event event) {
        String sqlStatement = "Insert into `event` (event_name, event_type, start_date, end_date, app_user_id, start_location_id, end_location_id) values " +
                "(?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, event.getEventName());
            ps.setBoolean(2, event.getEventType());
            ps.setString(3, event.getStartDate());
            ps.setString(4, event.getEndDate());
            ps.setInt(5, event.getAppUserId());
            ps.setInt(6, event.getStartLocationId());
            ps.setInt(7, event.getEndLocationId());
            return ps;
        }, keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        event.setEventId(keyHolder.getKey().intValue());
        return event;
    }

    @Override
    public boolean updateEvent(Event event) {
        String sqlStatement = "update `event` set " +
                "event_name = ?, " +
                "event_type = ?, " +
                "start_date = ?, " +
                "end_date = ?, " +
                "start_location_id = ?, " +
                "end_location_id = ? " +
                "where event_id = ?;";
        return jdbcTemplate.update(sqlStatement,
                event.getEventName(), event.getEventType(),
                event.getStartDate(), event.getEndDate(), event.getStartLocationId(),
                event.getEndLocationId(), event.getEventId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteEvent(int eventId) {
        List<Container> containers = jdbcTemplate.query("Select * from container where event_id = ?;", new ContainerMapper(), eventId).stream()
                .collect(Collectors.toList());

        for(int i = 0; i < containers.size(); i++){
            jdbcTemplate.update("delete from item where container_id = ?;", containers.get(i).getContainerId());
        }
        jdbcTemplate.update("delete from todo where event_id = ?", eventId);
        jdbcTemplate.update("delete from container where event_id = ?;", eventId);
        return jdbcTemplate.update("delete from `event` where event_id = ?;", eventId) > 0;
    }
}
