package learn.easypacking.domain;

import learn.easypacking.data.ContainersRepository;
import learn.easypacking.data.ItemRepository;
import learn.easypacking.models.Container;
import learn.easypacking.models.Item;
import learn.easypacking.models.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContainerService {
    private final ContainersRepository repository;

    private final ItemRepository itemRepository;

    public ContainerService(ContainersRepository repository, ItemRepository itemRepository) {
        this.repository = repository;
        this.itemRepository = itemRepository;
    }

    public List<Container> findAll() {
        return repository.findAll();
    }

    public Container findById(int containerId) {
        List<Item> items = itemRepository.findByContainerId(containerId);
        Container container = repository.findById(containerId);
        container.setItems(items);
        return  repository.findById(containerId);
    }

    public Result<Container> createContainer(Container container) {
        Result<Container> result = validate(container);
        if(!result.isSuccess()) {
            return result;
        }
        if(container.getContainerId() != 0) {
            result.setMessages("containerId cannot be set before the createContainer operation", ResultType.INVALID);
            return result;
        }
        container = repository.createContainer(container);
        result.setPayload(container);
        return result;
    }

    public Result<Container> updateContainer(Container container){
        Result<Container> result = validate(container);
        if(!result.isSuccess()){
            return result;
        }
        if(container.getContainerId() <= 0){
            result.setMessages("containerId required for update operation", ResultType.INVALID);
            return result;
        }
        if(!repository.updateContainer(container)){
            String message = String.format("Container Id: %s not found", container.getContainerId());
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int containerId) {
        return repository.deleteById(containerId);
    }

    private Result<Container> validate(Container container) {
        Result<Container> result = new Result<>();

        if(container == null) {
            result.setMessages("Container cannot be null", ResultType.INVALID);
        }

        if(container.getContainerName().isBlank() || container.getContainerName() == null) {
            result.setMessages("container name is required", ResultType.INVALID);
        }
        if(container.getEventId() < 1) {
            result.setMessages("container eventId is required", ResultType.INVALID);
        }
        return result;
    }
}
