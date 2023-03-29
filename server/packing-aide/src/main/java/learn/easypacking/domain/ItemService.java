package learn.easypacking.domain;

import learn.easypacking.data.ItemRepository;
import learn.easypacking.models.Container;
import learn.easypacking.models.Item;
import org.apache.logging.log4j.message.ReusableMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repository;


    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }


    public List<Item> findAll() {
        return repository.findAll();
    }

    public Item findById(int itemId) { return repository.findById(itemId);}

    public List<Item> findByUserId(int userId) {
        return (List<Item>) repository.findByUserId(userId);
    }

    public List<Item> findByContainerId(int containerId) {
        return (List<Item>) repository.findByContainerId(containerId);
    }

    public Result<Item> createItem(Item item) {
        Result<Item> result = validate(item);
        if(!result.isSuccess()){
            return result;
        }
        if(item.getItemId() != 0){
            result.setMessages("itemId cannot be set before the createItem operation", ResultType.INVALID);
            return result;
        }
        item = repository.createItem(item);
        result.setPayload(item);
        return result;
    }

    public Result<Item> updateItem(Item item){
        Result<Item> result = validate(item);
        if(!result.isSuccess()){
            return result;
        }
        if(item.getItemId() <= 0){
            result.setMessages("itemId required for update operation", ResultType.INVALID);
            return result;
        }
        if(!repository.updateItem(item)){
            String message = String.format("Item Id: %s not found", item.getItemId());
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Item> deleteById (int itemId) {
        Result<Item> result = new Result<>();
        if(itemId <= 0) {
            result.setMessages("Item ID required for delete operation", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteById(itemId)) {
            String message = String.format("Item Id: %s not found", itemId);
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Item> validate(Item item) {
        Result<Item> result = new Result<>();

        if(item == null) {
            result.setMessages("Item cannot be null", ResultType.INVALID);
            return result;
        }
        if (item.getContainerId() == 0) {
            result.setMessages("Container Id cannot be zero", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
