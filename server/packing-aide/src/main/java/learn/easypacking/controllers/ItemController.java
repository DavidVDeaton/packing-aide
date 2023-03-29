package learn.easypacking.controllers;

import learn.easypacking.domain.ItemService;
import learn.easypacking.domain.Result;
import learn.easypacking.models.Event;
import learn.easypacking.models.Item;
import learn.easypacking.models.Location;
import org.apache.coyote.Response;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> findAll() throws DataAccessException {
        return service.findAll();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> findById(@PathVariable int itemId) throws DataAccessException {
        Item item = service.findById(itemId);
        if(item == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(item);
    }

    @GetMapping("/user/{appUserId}")
    public List<Item> findByUserId(@PathVariable int appUserId) throws DataAccessException {
        return service.findByUserId(appUserId);
    }

    @GetMapping("/container/{containerId}")
    public List<Item> findByContainer(@PathVariable int containerId) throws DataAccessException {
        return service.findByContainerId(containerId);
    }

    @PostMapping
    public ResponseEntity<Object> createItem(@RequestBody Item item){
        Result<Item> result = service.createItem(item);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> updateItem(@PathVariable int itemId, @RequestBody Item item){
        if (itemId != item.getItemId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Item> result = service.updateItem(item);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Object> deleteItem(@PathVariable int itemId){
        Result<Item> result = service.deleteById(itemId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }



}
