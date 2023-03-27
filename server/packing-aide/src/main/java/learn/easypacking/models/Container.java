package learn.easypacking.models;


import java.util.ArrayList;
import java.util.List;

public class Container {
    private int containerId;

    private int parentContainerId;

    private String containerName;

    private int eventId;

    private List<Item> items = new ArrayList<>();

    public List<Item> getItems() {
        return items;
    }


    public void setItems(List<Item> items) {
        this.items = items;
    }

    public int getContainerId() {
        return containerId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    public int getParentContainerId() {
        return parentContainerId;
    }

    public void setParentContainerId(int parentContainerId) {
        this.parentContainerId = parentContainerId;
    }

    public String getContainerName() {
        return containerName;
    }

    public void setContainerName(String containerName) {
        this.containerName = containerName;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }


}
