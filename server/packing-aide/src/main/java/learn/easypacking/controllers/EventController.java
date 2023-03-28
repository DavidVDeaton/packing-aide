package learn.easypacking.controllers;

import learn.easypacking.domain.AppUserService;
import learn.easypacking.domain.EventService;
import learn.easypacking.domain.Result;
import learn.easypacking.models.Event;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    private final EventService service;
    private final AppUserService userService;

    public EventController(EventService service, AppUserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> findById(@PathVariable int eventId){
        Event event = service.findById(eventId);
        if(event == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(event);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> findByUserId(@PathVariable int userId){
        List<Event> event = service.findByUserId(userId);
        if(event == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<Object> createEvent(@RequestBody Event event){
        Result<Event> result = service.createEvent(event);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Object> updateEvent(@PathVariable int eventId, @RequestBody Event event){
        if(eventId != event.getEventId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Event> result = service.updateEvent(event);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Object> deleteEvent(@PathVariable int eventId){
        Result<Event> result = service.deleteEvent(eventId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

}
