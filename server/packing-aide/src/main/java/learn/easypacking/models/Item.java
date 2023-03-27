package learn.easypacking.models;

public class Item {
    private int itemId;


    private String itemName;

    private boolean packStatus;

    private int quantity;

    private String description;

    private int userId;

    private int containerId;

    public Item(int itemId, String itemName, boolean packStatus, int quantity, String description, int userId, int containerId) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.packStatus = packStatus;
        this.quantity = quantity;
        this.description = description;
        this.userId = userId;
        this.containerId = containerId;
    }

    public Item() {

    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public boolean isPackStatus() {
        return packStatus;
    }

    public void setPackStatus(boolean packStatus) {
        this.packStatus = packStatus;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getContainerId() {
        return containerId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

}
