package learn.easypacking.data;

import learn.easypacking.models.Container;
import learn.easypacking.models.ToDo;

import java.util.List;

public interface ToDoRepository {

    ToDo findById(int toDoListId);
    List<ToDo> findByEventId(int eventId);
    ToDo createToDo(ToDo toDo);
    boolean updateToDo(ToDo toDo);

    boolean deleteToDo(int toDoListId);
}
