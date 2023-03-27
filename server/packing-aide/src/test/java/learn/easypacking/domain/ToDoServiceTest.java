package learn.easypacking.domain;

import learn.easypacking.data.ToDoRepository;
import learn.easypacking.models.ToDo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ToDoServiceTest {

    @Autowired
    ToDoService service;

    @MockBean
    ToDoRepository repository;

    @Test
    void shouldCreateToDoList() {
        ToDo toDoToCreate = createTestToDoList();
        ToDo mockResult = createTestToDoList();
        mockResult.setToDoId(4);

        when(repository.createToDo(toDoToCreate)).thenReturn(mockResult);
        Result<ToDo> actual = service.createToDo(toDoToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateToDoWhenInvalid(){
        ToDo invalidToDo = createTestToDoList();
        invalidToDo.setToDoName("    ");

        Result<ToDo> actual = service.createToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidToDo = createTestToDoList();
        invalidToDo.setToDoDate("   ");
        actual = service.createToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidToDo = createTestToDoList();
        invalidToDo.setToDoId(40);
        actual = service.createToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());

    }

    @Test
    void shouldUpdateToDo(){
        ToDo toDoToUpdate = createTestToDoList();
        toDoToUpdate.setToDoId(2);

        when(repository.updateToDo(toDoToUpdate)).thenReturn(true);

        Result<ToDo> actual = service.updateToDo(toDoToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid(){
        ToDo invalidToDo = createTestToDoList();
        Result<ToDo> actual = service.updateToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidToDo = createTestToDoList();
        invalidToDo.setToDoName("    ");

        actual = service.createToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidToDo = createTestToDoList();
        invalidToDo.setToDoDate("   ");
        actual = service.createToDo(invalidToDo);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDeleteToDo(){
        when(repository.deleteToDo(3)).thenReturn(true);
        Result<ToDo> actual = service.deleteToDo(3);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteNonExistent(){
        when(repository.deleteToDo(6)).thenReturn(false);
        Result<ToDo> actual = service.deleteToDo(6);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    private ToDo createTestToDoList() {
        ToDo toDo = new ToDo();
        toDo.setToDoName("Test name");
        toDo.setToDoDescription("Test description");
        toDo.setToDoDate("2023-01-20");
        toDo.setToDoStatus(true);
        toDo.setEventId(1);
        return toDo;
    }
}