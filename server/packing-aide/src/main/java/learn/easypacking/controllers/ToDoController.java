package learn.easypacking.controllers;

import learn.easypacking.domain.AppUserService;
import learn.easypacking.domain.Result;
import learn.easypacking.domain.ToDoService;
import learn.easypacking.models.AppUser;
import learn.easypacking.models.ToDo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todo")
public class ToDoController {

    private final ToDoService service;
    private final AppUserService userService;

    public ToDoController(ToDoService service, AppUserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("/{toDoId}")
    public ResponseEntity<ToDo> findById(@PathVariable int toDoId){
        ToDo toDo = service.findById(toDoId);
        if(toDo == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(toDo);
    }

    @PostMapping
    public ResponseEntity<Object> createToDo(@RequestBody ToDo toDo){
        Result<ToDo> result = service.createToDo(toDo);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{toDoId}")
    public ResponseEntity<Object> updateToDo(@PathVariable int toDoId, @RequestBody ToDo toDo){
        if(toDoId != toDo.getToDoId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<ToDo> result = service.updateToDo(toDo);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{toDoId}")
    public ResponseEntity<Object> deleteToDo(@PathVariable int toDoId){
        Result<ToDo> result = service.deleteToDo(toDoId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

}
