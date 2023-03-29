package learn.easypacking.data;

import learn.easypacking.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

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
        hasSetup = false;
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

    @Test
    void shouldCreateUser() {
        AppUser appUser = new AppUser(0, "userTest", "pw123", true, List.of("USER"));

        repository.create(appUser);
        AppUser result = repository.findByUsername("userTest");
        assertEquals("userTest", result.getUsername());
        assertEquals("pw123", result.getPassword());
    }

    @Test
    void shouldUpdateUser() {
        AppUser userToUpdate = repository.findByUsername("john@smith.com");
        userToUpdate.setUsername("updatedTest");
        userToUpdate.setPassword("update123");
        userToUpdate.setEnabled(false);

        repository.update(userToUpdate);

        AppUser updateVerify = repository.findByUsername("updatedTest");

        assertNull(repository.findByUsername("john@smith.com"));
        assertNotNull(repository.findByUsername("updatedTest"));
        assertEquals(true, updateVerify.isEnabled());
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteUser(1));
        assertFalse(repository.deleteUser(1));
    }

    @Test
    void shouldNotDeleteIfDoesNotExists(){
        assertFalse(repository.deleteUser(5));
    }

}
