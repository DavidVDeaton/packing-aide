package learn.easypacking.domain;

import learn.easypacking.data.ItemRepository;
import learn.easypacking.models.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ItemServiceTest {

    @Autowired
    ItemService service;

    @MockBean
    ItemRepository repository;

    @Test
    void createItem() {
        Item itemToCreate = makeItem();
        Item mockResult = makeItem();
        mockResult.setItemId(1);

        when(repository.createItem(itemToCreate)).thenReturn(mockResult);
        Result<Item> actual = service.createItem(itemToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateWhenInvalid() {
        Item invalidItem = makeItem();
        invalidItem.setItemId(0);

        Result<Item> actual = service.createItem(invalidItem);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidItem = makeItem();
        invalidItem.setContainerId(0);
        actual = service.createItem(invalidItem);
        assertEquals(ResultType.INVALID, actual.getType());
    }


    @Test
    void updateItem() {
        Item itemToUpdate = makeItem();
        itemToUpdate.setQuantity(8);

        when(repository.updateItem(itemToUpdate)).thenReturn(true);

        Result<Item> actual = service.updateItem(itemToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Item invalidItem = makeItem();
        invalidItem.setAppUserId(0);

        Result<Item> actual = service.createItem(invalidItem);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidItem = makeItem();
        invalidItem.setContainerId(0);
        actual = service.createItem(invalidItem);
        assertEquals(ResultType.INVALID, actual.getType());
    }


    @Test
    void deleteById() {
        when(repository.deleteById(2)).thenReturn(true);
        Result<Item> actual = service.deleteById(2);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteIfDoesntExist() {
        when(repository.deleteById(9)).thenReturn(false);
        Result<Item> actual = service.deleteById(9);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    private Item makeItem() {
        Item item = new Item();
        item.setItemId(1);
        item.setItemName("test");
        item.setPackStatus(false);
        item.setQuantity(2);
        item.setDescription("test description");
        item.setAppUserId(1);
        item.setContainerId(1);
        return item;
    }

}