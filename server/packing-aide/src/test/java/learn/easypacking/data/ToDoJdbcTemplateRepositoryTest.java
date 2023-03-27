//package learn.easypacking.data;
//
//import learn.easypacking.models.ToDo;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import java.sql.Date;
//import java.time.LocalDate;
//
//import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
//class ToDoJdbcTemplateRepositoryTest {
//
//    @Autowired
//    private ToDoJdbcTemplateRepository repository;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    static boolean hasSetup = false;
//    @BeforeEach
//    void setup() {
//        if (!hasSetup) {
//            jdbcTemplate.update("call set_known_good_state();");
//            hasSetup = true;
//        }
//    }
//
//    @Test
//    void shouldFindById() {
//        ToDo actual = repository.findById(1);
//        assertEquals(false, actual.getToDoStatus());
//    }
//
//    @Test
//    void shouldNotFindNull(){
//        ToDo actual = repository.findById(0);
//        assertNull(actual);
//    }
//
//    @Test
//    void shouldCreateToDo() {
//        ToDo toDoListToAdd = createTestToDoList();
//        ToDo actual = repository.createToDo(toDoListToAdd);
//        assertNotNull(actual);
//        assertEquals(4, actual.getToDoId());
//    }
//    @Test
//    void shouldUpdateToDo() {
//        ToDo todoToUpdate = new ToDo();
//        todoToUpdate.setToDoDate("updated date");
//        todoToUpdate.setToDoName("updated name");
//        todoToUpdate.setToDoDescription("go to the beach at 12pm");
//        todoToUpdate.setToDoStatus(false);
//        todoToUpdate.setEventId(1);
//        todoToUpdate.setToDoId(1);
//
//        assertTrue(repository.updateToDo(todoToUpdate));
//        assertEquals("updated name", repository.findById(1).getToDoName());
//    }
//
//    @Test
//    void shouldNotUpdateToDoIfDoesntExist(){
//        ToDo todoToUpdate = new ToDo();
//        todoToUpdate.setToDoDate("updated date");
//        todoToUpdate.setToDoName("updated name");
//        todoToUpdate.setToDoDescription("go to the beach at 12pm");
//        todoToUpdate.setToDoStatus(false);
//        todoToUpdate.setEventId(1);
//        todoToUpdate.setToDoId(10);
//
//        assertFalse( repository.updateToDo(todoToUpdate));
//    }
//    @Test
//    void shouldDeleteToDo() {
//        assertTrue(repository.deleteToDo(3));
//    }
//    @Test
//    void shouldNotDeleteToDoIfDoesntExist() {
//        assertFalse(repository.deleteToDo(30));
//    }
//
//
//    private ToDo createTestToDoList() {
//        ToDo toDo = new ToDo();
//        toDo.setToDoName("Test name");
//        toDo.setToDoDescription("Test description");
//        toDo.setToDoDate("2023-01-20");
//        toDo.setToDoStatus(true);
//        toDo.setEventId(1);
//        return toDo;
//    }
//
//}