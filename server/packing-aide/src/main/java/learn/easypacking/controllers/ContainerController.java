package learn.easypacking.controllers;

import learn.easypacking.domain.ContainerService;
import learn.easypacking.domain.Result;
import learn.easypacking.domain.ResultType;
import learn.easypacking.models.Container;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/container")
public class ContainerController {
    private final ContainerService service;
    public ContainerController(ContainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Container> findAll() {
        return service.findAll();
    }

    @GetMapping("/{containerId}")
    public ResponseEntity<Container> findById(@PathVariable int containerId) throws DataAccessException {
        Container container = service.findById(containerId);
        if(container == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(container);
    }

    @GetMapping("/event/{eventId}")
    public List<Container> findByEventId(@PathVariable int eventId) throws DataAccessException {
        return service.findByEventId(eventId);
    }

    @PostMapping
    public ResponseEntity<Object> createContainer (@RequestBody Container container) throws DataAccessException {
        Result<Container> result = service.createContainer(container);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @PutMapping("/{containerId}")
    public ResponseEntity<Object> updateContainer (@PathVariable int containerId, @RequestBody Container container) throws DataAccessException {
        if (containerId != container.getContainerId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
        }

        Result<Container> result = service.updateContainer(container);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 404
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{containerId}")
    public ResponseEntity<Object> deleteById(@PathVariable int containerId) throws DataAccessException {
        Result<Container> result = service.deleteById(containerId);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 404
        }
        return ErrorResponse.build(result);
    }
}
