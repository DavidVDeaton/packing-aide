package learn.easypacking.domain;

import learn.easypacking.data.ToDoRepository;
import learn.easypacking.models.ToDo;
import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    private final ToDoRepository repository;

    public ToDoService(ToDoRepository repository) {
        this.repository = repository;
    }

    public ToDo findById(int toDoListId){return repository.findById(toDoListId);}

    public Result<ToDo> createToDo(ToDo toDo){
        Result<ToDo> result = validate(toDo);
        if(!result.isSuccess()){
            return result;
        }

        if(toDo.getToDoId() != 0){
            result.setMessages("EventId cannot be set before the createToDo operation", ResultType.INVALID);
            return result;
        }
        toDo = repository.createToDo(toDo);
        result.setPayload(toDo);
        return result;
    }

    public Result<ToDo> updateToDo(ToDo todo){
        Result<ToDo> result = validate(todo);
        if(!result.isSuccess()){
            return result;
        }

        if(todo.getToDoId() <= 0){
            result.setMessages("toDoId required for update operation", ResultType.INVALID);
            return result;
        }

        if(!repository.updateToDo(todo)){
            String message = String.format("toDoId: %s not found", todo.getToDoId());
            result.setMessages(message,  ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<ToDo> deleteToDo(int toDoId){
        Result<ToDo> result = new Result<>();
        if(toDoId <= 0){
            result.setMessages("toDoId required for delete operation", ResultType.INVALID);
            return result;
        }

        if(!repository.deleteToDo(toDoId)){
            String message = String.format("toDoId: %s not found", toDoId);
            result.setMessages(message,  ResultType.NOT_FOUND);
        }

        return result;
    }
    private Result<ToDo> validate(ToDo toDo) {
        Result<ToDo> result = new Result<>();

        if (toDo == null) {
            result.setMessages("ToDo cannot be null", ResultType.INVALID);
            return result;
        }
        if (toDo.getToDoDate().isBlank() || toDo.getToDoDate() == null) {
            result.setMessages("Date is required", ResultType.INVALID);
        }
        if (toDo.getToDoName().isBlank() || toDo.getToDoName() == null) {
            result.setMessages("Name is required", ResultType.INVALID);
        }

        if (toDo.getEventId() == 0) {
            result.setMessages("Event Id is required", ResultType.INVALID);
        }
        return result;
    }
}

