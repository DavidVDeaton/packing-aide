package learn.easypacking.domain;

import learn.easypacking.data.LocationRepository;
import learn.easypacking.models.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class LocationServiceTest {

    @Autowired
    LocationService service;

    @MockBean
    LocationRepository repository;

    @Test
    void shouldCreateLocation(){
        Location locationToCreate = createTestLocation();
        Location mockResult = createTestLocation();
        mockResult.setLocationId(4);

        when(repository.createLocation(locationToCreate)).thenReturn(mockResult);
        Result<Location> actual = service.createLocation(locationToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateLocationWhenInvalid(){
        Location invalidLocation = createTestLocation();
        invalidLocation.setCity("   ");

        Result<Location> actual = service.createLocation(invalidLocation);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidLocation = createTestLocation();
        invalidLocation.setZip(0);
        actual = service.createLocation(invalidLocation);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidLocation = createTestLocation();
        invalidLocation.setLocationId(5);
        actual = service.createLocation(invalidLocation);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdateLocation(){
        Location locationToUpdate = createTestLocation();
        locationToUpdate.setLocationId(2);

        when(repository.updateLocation(locationToUpdate)).thenReturn(true);

        Result<Location> actual = service.updateLocation(locationToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid(){
        Location locationToUpdate = createTestLocation();
        Result<Location> actual = service.updateLocation(locationToUpdate);
        assertEquals(ResultType.INVALID, actual.getType());

        locationToUpdate = createTestLocation();
        locationToUpdate.setZip(0);
        actual = service.createLocation(locationToUpdate);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    private Location createTestLocation(){
        Location location = new Location();
        location.setStreetAddress("Test street address");
        location.setCity("Test city");
        location.setState("Te");
        location.setZip(10495);
        return location;
    }

}