package learn.easypacking.data;

import learn.easypacking.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    private AppUserJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        if (!hasSetup) {
            hasSetup = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }

    @Test
    void shouldFindByUsername() {
        AppUser result = repository.findByUsername("john@smith.com");

        assertNotNull(result);
    }

    @Test
    void shouldNotFindByUsername() {
        AppUser result = repository.findByUsername("jack@smith.com");

        assertNull(result);
    }

//    @Test
//    void shouldCreateUser() {
//        AppUser appUserToAdd = createAppUser();
//    }

//    @Test
//    void update() {
//        AppUser appUserToUpdate = new AppUser();
//        appUserToUpdate.se;
//    }

//    private AppUser createAppUser() {
//        AppUser user = new AppUser();
//        user.setUsername
//    }
}
