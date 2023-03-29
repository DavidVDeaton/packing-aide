//package learn.easypacking.domain;
//
//import learn.easypacking.data.LocationRepository;
//import learn.easypacking.models.Location;
//import org.springframework.stereotype.Service;
//
//@Service
//public class LocationService {
//    private final LocationRepository repository;
//
//    public LocationService(LocationRepository repository) {
//        this.repository = repository;
//    }
//
//    public Location findById(int locationId){
//        return repository.findById(locationId);
//    }
//
//    public Result<Location> createLocation(Location location) {
//        Result<Location> result = validate(location);
//        if(!result.isSuccess()){
//            return result;
//        }
//        if(location.getLocationId() != 0){
//            result.setMessages("locationId cannot be set before the createLocation operation", ResultType.INVALID);
//            return result;
//        }
//        location = repository.createLocation(location);
//        result.setPayload(location);
//        return result;
//    }
//
//    public Result<Location> updateLocation(Location location){
//        Result<Location> result = validate(location);
//        if(!result.isSuccess()){
//            return result;
//        }
//        if(location.getLocationId() <= 0){
//            result.setMessages("locationId required for update operation", ResultType.INVALID);
//            return result;
//        }
//        if(!repository.updateLocation(location)){
//            String message = String.format("Location Id: %s not found", location.getLocationId());
//            result.setMessages(message, ResultType.NOT_FOUND);
//        }
//        return result;
//    }
//    private Result<Location> validate(Location location) {
//        Result<Location> result = new Result<>();
//
//        if (location == null) {
//            result.setMessages("Location cannot be null", ResultType.INVALID);
//            return result;
//        }
//        return result;
//    }
//}
