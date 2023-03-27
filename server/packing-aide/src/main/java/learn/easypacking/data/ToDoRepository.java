package learn.easypacking.data;

import learn.easypacking.models.ToDo;

public interface ToDoRepository {

    ToDo findById(int toDoListId);
    ToDo createToDo(ToDo toDo);
    boolean updateToDo(ToDo toDo);

    boolean deleteToDo(int toDoListId);
}
