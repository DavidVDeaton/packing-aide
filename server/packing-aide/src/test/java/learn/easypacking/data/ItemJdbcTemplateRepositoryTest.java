//package learn.easypacking.data;
//
//import learn.easypacking.models.Item;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class ItemJdbcTemplateRepositoryTest {
//
//    @Autowired
//    ItemJdbcTemplateRepository repository;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//    static boolean hasSetup = false;
//    @BeforeEach
//    void setup() {
//        if (!hasSetup){
//            jdbcTemplate.update("call set_known_good_state();");
//            hasSetup = true;
//        }
//    }
//
//    @Test
//    void findAll() {
//        List<Item> items = repository.findAll();
//        assertNotNull(items);
//    }
//
//    @Test
//    void findById() {
//        List<Item> actual = repository.findByContainerId(1);
//        assertEquals("Spoon", actual.getItemName());
//    }
//
//    @Test
//    void shouldNotFindNull () {
//       Item actual = repository.findByContainerId(10);
//        assertNull(actual);
//    }
//
//    @Test
//    void add() {
//        Item itemToAdd = createItem();
//        Item actual = repository.createItem(itemToAdd);
//        assertNotNull(actual);
//        assertEquals(4, actual.getItemId());
//    }
//
//    @Test
//    void update() {
//        Item itemToUpdate = new Item();
//        itemToUpdate.setItemName("test");
//        itemToUpdate.setPackStatus(false);
//        itemToUpdate.setQuantity(1);
//        itemToUpdate.setDescription("test description");
//        itemToUpdate.setUserId(1);
//        itemToUpdate.setContainerId(1);
//
//        assertTrue(repository.updateItem(itemToUpdate));
//        assertEquals(false, repository.findByContainerId(1).isPackStatus());
//    }
//
//    @Test
//    void deleteById() {
//        assertTrue(repository.deleteById(4));
//        assertFalse(repository.deleteById(4));
//    }
//
//    private Item createItem () {
//        Item item  = new Item();
//        item.setItemName("test");
//        item.setPackStatus(true);
//        item.setQuantity(1);
//        item.setDescription("test description");
//        item.setUserId(1);
//        item.setContainerId(1);
//        return item;
//    }
//}