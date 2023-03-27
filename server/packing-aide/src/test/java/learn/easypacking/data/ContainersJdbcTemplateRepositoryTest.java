package learn.easypacking.data;

import learn.easypacking.models.Container;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ContainersJdbcTemplateRepositoryTest {
    @Autowired
    ContainersJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        if (!hasSetup){
            jdbcTemplate.update("call set_known_good_state();");
            hasSetup = true;
        }
    }

    @Test
    void findAll() {
        List<Container> containers = repository.findAll();
        assertNotNull(containers);
    }

    @Test
    void findById() {
        Container actual = repository.findById(1);
        assertEquals("Kitchen", actual.getContainerName());
    }

    @Test
    void shouldNotFindNull () {
        Container actual = repository.findById(10);
        assertNull(actual);
    }

    @Test
    void add() {
        Container containerToAdd = createContainer();
        Container actual = repository.createContainer(containerToAdd);
        assertNotNull(actual);
        assertEquals(5, actual.getContainerId());
    }

    @Test
    void update() {
        Container containerToUpdate = new Container();
        containerToUpdate.setParentContainerId(2);
        containerToUpdate.setContainerName("updated test");
        containerToUpdate.setEventId(2);

        assertTrue(repository.updateContainer(containerToUpdate));
        assertEquals("updated test", repository.findById(2).getContainerName());
    }

    @Test
    void shouldNotUpdate() {
        Container containerToUpdate = new Container();
        containerToUpdate.setParentContainerId(2);
        containerToUpdate.setContainerName("updated test");
        containerToUpdate.setEventId(2);

        assertFalse(repository.updateContainer(containerToUpdate));
    }


    @Test
    void deleteById() {
        assertTrue(repository.deleteById(4));
        assertTrue(repository.deleteById(4));
    }

    private Container createContainer() {
        Container container = new Container();
        container.setParentContainerId(1);
        container.setContainerName("test");
        container.setEventId(1);
        return container;

    }
}