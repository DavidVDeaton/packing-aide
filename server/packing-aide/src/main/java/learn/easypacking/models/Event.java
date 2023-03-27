package learn.easypacking.models;

public class Event {

    private int eventId;
    private String eventName;
    private boolean eventType;
    private String startDate;
    private String endDate;
    private int appUserId;
    private int startLocationId;
    private int endLocationId;

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public boolean getEventType() {
        return eventType;
    }

    public void setEventType(boolean eventType) {
        this.eventType = eventType;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public int getStartLocationId() {
        return startLocationId;
    }

    public void setStartLocationId(int startLocationId) {
        this.startLocationId = startLocationId;
    }

    public int getEndLocationId() {
        return endLocationId;
    }

    public void setEndLocationId(int endLocationId) {
        this.endLocationId = endLocationId;
    }
}
