package learn.easypacking.data;


import learn.easypacking.models.Item;

import java.util.List;

public interface ItemRepository {

    List<Item> findAll();

    List<Item> findByContainerId(int containerId);

    Item createItem (Item item);

    boolean updateItem (Item item);

    boolean deleteById(int itemId);
}
