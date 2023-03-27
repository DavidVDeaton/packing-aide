package learn.easypacking.domain;

import learn.easypacking.data.EventRepository;
import learn.easypacking.models.Event;
import learn.easypacking.models.ToDo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class EventServiceTest {

    @Autowired
    EventService service;

    @MockBean
    EventRepository repository;

    @Test
    void shouldCreateEvent() {
        Event eventToCreate = createTestEvent();
        Event mockResult = createTestEvent();
        mockResult.setEventId(5);

        when(repository.createEvent(eventToCreate)).thenReturn(mockResult);
        Result<Event> actual = service.createEvent(eventToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateEventWhenInvalid(){
        Event invalidEvent = createTestEvent();
        invalidEvent.setAppUserId(0);

        Result<Event> actual = service.createEvent(invalidEvent);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidEvent = createTestEvent();
        invalidEvent.setEventId(40);
        actual = service.createEvent(invalidEvent);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdateEvent(){
        Event eventToUpdate = createTestEvent();
        eventToUpdate.setEventId(2);

        when(repository.updateEvent(eventToUpdate)).thenReturn(true);

        Result<Event> actual = service.updateEvent(eventToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateEventWhenInvalid(){
        Event invalidEvent = createTestEvent();
        invalidEvent.setAppUserId(0);

        Result<Event> actual = service.createEvent(invalidEvent);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidEvent = createTestEvent();
        invalidEvent.setEventId(40);
        actual = service.createEvent(invalidEvent);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDeleteEvent(){
        when(repository.deleteEvent(2)).thenReturn(true);
        Result<Event> actual = service.deleteEvent(2);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteIfDoesntExist(){
        when(repository.deleteEvent(6)).thenReturn(false);
        Result<Event> actual = service.deleteEvent(6);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
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
