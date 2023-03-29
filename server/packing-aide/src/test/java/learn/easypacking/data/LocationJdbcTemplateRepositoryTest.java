//package learn.easypacking.data;
//
//import learn.easypacking.models.Location;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
//class LocationJdbcTemplateRepositoryTest {
//    @Autowired
//    LocationJdbcTemplateRepository repository;
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//    static boolean hasSetup = false;
//    @BeforeEach
//    void setup() {
//        if (!hasSetup){
//            jdbcTemplate.update("call set_known_good_state();");
//            hasSetup = true;
//        }
//    }
//    @Test
//    void shouldFindById() {
//        Location actual = repository.findById(2);
//        System.out.println(actual.getStreetAddress());
//        assertEquals(10023, actual.getZip());
//    }
//
//    @Test
//    void shouldNotFindNull(){
//        Location actual = repository.findById(7);
//        assertNull(actual);
//    }
//    @Test
//    void shouldCreateLocation() {
//        Location locationToAdd = createTestLocation();
//        Location actual = repository.createLocation(locationToAdd);
//        assertNotNull(actual);
//        assertEquals(5, actual.getLocationId());
//    }
//    @Test
//    void shouldUpdateLocation() {
//        Location locationToUpdate = new Location();
//        locationToUpdate.setStreetAddress("updated street address");
//        locationToUpdate.setCity("updated City");
//        locationToUpdate.setState("TX");
//        locationToUpdate.setZip(11111);
//        locationToUpdate.setLocationId(2);
//
//        assertTrue( repository.updateLocation(locationToUpdate));
//        assertEquals("updated City", repository.findById(2).getCity());
//    }
//
//    @Test
//    void shouldNotUpdateLocationIfDoesntExist(){
//        Location locationToUpdate = new Location();
//        locationToUpdate.setStreetAddress("updated street address");
//        locationToUpdate.setCity("updated City");
//        locationToUpdate.setState("TX");
//        locationToUpdate.setZip(11111);
//        locationToUpdate.setLocationId(20);
//
//        assertFalse( repository.updateLocation(locationToUpdate));
//    }
//
//
////    @Test
////    void shouldDeleteLocation() {
////        assertTrue(repository.deleteLocation(3));
////    }
////
////    @Test
////    void shouldNotDeleteIfDoesntExist(){
////        assertFalse(repository.deleteLocation(5));
////    }
//
//    private Location createTestLocation(){
//        Location location = new Location();
//        location.setStreetAddress("Test street address");
//        location.setCity("Test city");
//        location.setState("Te");
//        location.setZip(10495);
//        return location;
//    }
//
//}