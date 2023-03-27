package learn.easypacking.data;

import learn.easypacking.models.Event;

import java.util.List;
public interface EventRepository {

    Event findById(int eventId);
    List<Event> findByUserId(int userId);
    Event createEvent(Event event);
    boolean updateEvent(Event event);

    boolean deleteEvent(int eventId);
}
