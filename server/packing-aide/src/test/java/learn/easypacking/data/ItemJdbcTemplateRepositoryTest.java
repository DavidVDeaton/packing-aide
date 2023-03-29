package learn.easypacking.data;

import learn.easypacking.models.AppUser;
import learn.easypacking.models.Container;
import learn.easypacking.models.Event;
import learn.easypacking.models.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemJdbcTemplateRepositoryTest {

    @Autowired
    ItemJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    static boolean hasSetup = false;
    @BeforeEach
    void setup() {
        hasSetup = false;
        if (!hasSetup){
            jdbcTemplate.update("call set_known_good_state();");
            hasSetup = true;
        }
    }

    @Test
    void findAll() {
        List<Item> items = repository.findAll();
        assertNotNull(items);
    }

    @Test
    void findById() {
        Item actual = repository.findById(2);
        assertEquals("Fork", actual.getItemName());
    }

    @Test
    void shouldNotFindNull () {
       Item actual = repository.findById(10);
        assertNull(actual);
    }

    @Test
    void findByContainerId() {
        List<Item> items = repository.findByContainerId(2);
        assertEquals(2, items.size());
        assertEquals("Spoon",items.get(0).getItemName());
    }

    @Test
    void findByUserId() {
        List<Item> items = repository.findByUserId(2);
        assertEquals(2, items.size());
        assertEquals("Spoon", items.get(0).getItemName());
    }


    @Test
    void add() {
        Item itemToAdd = createItem();
        AppUser appUser = createUser();
        Item actual = repository.createItem(itemToAdd);
        assertNotNull(actual);
        assertEquals(4, actual.getItemId());
    }

    @Test
    void update() {
        Item itemToUpdate = new Item();
        itemToUpdate.setItemId(1);
        itemToUpdate.setItemName("test");
        itemToUpdate.setPackStatus(false);
        itemToUpdate.setQuantity(1);
        itemToUpdate.setDescription("test description");
        itemToUpdate.setAppUserId(1);
        itemToUpdate.setContainerId(1);

        assertTrue(repository.updateItem(itemToUpdate));
        assertEquals(false, repository.findById(1).isPackStatus());
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(3));
    }

    @Test
    void shouldNotDeleteById() {
        assertFalse(repository.deleteById(4));
    }

    private Item createItem () {
        Item item  = new Item();
        item.setItemName("test");
        item.setPackStatus(true);
        item.setQuantity(1);
        item.setDescription("test description");
        item.setAppUserId(1);
        item.setContainerId(1);
        return item;
    }

    private AppUser createUser() {
        AppUser appUser = new AppUser(1, "test username", "test password", true, List.of("USER"));
        return appUser;
    }

}