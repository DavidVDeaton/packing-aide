package learn.easypacking.domain;

import learn.easypacking.data.AppUserRepository;
import learn.easypacking.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository repository;

    @MockBean
    PasswordEncoder encoder;

    @Test
    void loadUserByUsername() {
        AppUser expected = new AppUser(1, "test", "testPassword", true, List.of("USER"));
        when(repository.findByUsername("test")).thenReturn(expected);

        UserDetails result = service.loadUserByUsername("test");

        assertEquals(expected, result);
    }

    @Test
    void create() {
    }
}