//package learn.easypacking.controllers;
//
//import learn.easypacking.domain.AppUserService;
//import learn.easypacking.domain.LocationService;
//import learn.easypacking.domain.Result;
//import learn.easypacking.models.Location;
//import org.springframework.dao.DataAccessException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/location")
//public class LocationController {
//    private final LocationService locationService;
//    private final AppUserService userService;
//    public LocationController(LocationService locationService, AppUserService userService) {
//        this.locationService = locationService;
//        this.userService = userService;
//    }
//
//    @GetMapping("/{locationId}")
//    public ResponseEntity<Location> findById(@PathVariable int locationId) throws DataAccessException {
//        Location location = locationService.findById(locationId);
//        if(location == null){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(location);
//    }
//
//    @PostMapping
//    public ResponseEntity<Object> createLocation(@RequestBody Location location){
//        Result<Location> result = locationService.createLocation(location);
//        if(result.isSuccess()){
//            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
//        }
//        return ErrorResponse.build(result);
//    }
//
//
//    @PutMapping("/{locationId}")
//    public ResponseEntity<Object> updateLocation(@PathVariable int locationId, @RequestBody Location location){
//        if (locationId != location.getLocationId()) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
//        Result<Location> result = locationService.updateLocation(location);
//        if(result.isSuccess()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return ErrorResponse.build(result);
//    }
//
//}
