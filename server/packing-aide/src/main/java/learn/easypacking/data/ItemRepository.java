package learn.easypacking.data;


import learn.easypacking.models.Item;

import java.util.List;

public interface ItemRepository {

    List<Item> findAll();

    List<Item> findByContainerId(int containerId);

    List<Item> findByUserId(int userId);

    Item findById(int itemId);

    Item createItem (Item item);

    boolean updateItem (Item item);

    boolean deleteById(int itemId);
}
