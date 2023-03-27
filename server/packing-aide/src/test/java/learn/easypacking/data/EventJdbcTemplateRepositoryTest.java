package learn.easypacking.data;

import learn.easypacking.models.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EventJdbcTemplateRepositoryTest {

    @Autowired
    private EventJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;
    @BeforeEach
    void setup() {
        hasSetup = false;
        if (!hasSetup) {
            jdbcTemplate.update("call set_known_good_state();");
            hasSetup = true;
        }
    }
    @Test
    void shouldFindById() {
        Event event = repository.findById(1);
        assertEquals("Springbreak", event.getEventName());
    }
    @Test
    void shouldNotFindNonExistent() {
        Event event = repository.findById(3);
        assertNull(event);
    }
    @Test
    void findByUserId() {
        List<Event> events = repository.findByUserId(2);
        assertEquals(1, events.size());
        assertEquals("First House", events.get(0).getEventName());
    }

    @Test
    void shouldReturnEmptyArrayIfUserDoesntExist(){
        List<Event> events = repository.findByUserId(3);
        assertEquals(0, events.size());
    }

    @Test
    void shouldCreateEvent() {
        Event eventToAdd = createTestEvent();
        Event actual = repository.createEvent(eventToAdd);
        assertNotNull(actual);
        assertEquals(3, actual.getEventId());
    }

    @Test
    void shouldUpdateEvent() {
        Event event = new Event();
        event.setEventName("updated name");
        event.setEventType(false);
        event.setStartDate("updated date");
        event.setEndDate("updated date");
        event.setAppUserId(1);
        event.setStartLocationId(1);
        event.setEndLocationId(1);
        event.setEventId(2);

        assertTrue(repository.updateEvent(event));
        assertEquals("updated name", repository.findById(2).getEventName());
    }

    @Test
    void shouldNotUpdateIfDoesntExist(){
        Event event = new Event();
        event.setEventId(20);

        assertFalse(repository.updateEvent(event));
    }

    @Test
    void shouldDeleteEvent() {
        assertTrue(repository.deleteEvent(2));
    }

    @Test
    void shouldNotDeleteIfDoesntExists(){
        assertFalse(repository.deleteEvent(5));
    }

    private Event createTestEvent(){
        Event event = new Event();
        event.setEventName("Moving to Mexico");
        event.setEventType(true);
        event.setStartDate("2023-03-01");
        event.setEndDate("2023-03-10");
        event.setAppUserId(1);
        event.setStartLocationId(1);
        event.setEndLocationId(1);
        return event;
    }
}
