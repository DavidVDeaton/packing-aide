package learn.easypacking.domain;

import learn.easypacking.data.AppUserRepository;
import learn.easypacking.models.AppUser;
import learn.easypacking.models.Event;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository repository;

    @MockBean
    PasswordEncoder encoder;

    @Test
    void shouldLoadUserByUsername() {
        AppUser expected = new AppUser(1, "test", "testPassword", true, List.of("USER"));
        when(repository.findByUsername("test")).thenReturn(expected);

        UserDetails result = service.loadUserByUsername("test");

        assertEquals(expected, result);
    }

    @Test
    void shouldCreateAppUser() {
        String username = "mark@melancon.com";
        String password = "H0meRun!";

        AppUser createUser = new AppUser(6, "mark@melancon.com", "hashedPassword", true, List.of("USER"));

        when(repository.create(any())).thenReturn(createUser);

        Result<AppUser> result = service.createUser(username, password);

        assertTrue(result.isSuccess());
        assertEquals(6, result.getPayload().getAppUserId());
        assertEquals("mark@melancon.com", result.getPayload().getUsername());
        assertEquals("hashedPassword", result.getPayload().getPassword());
        assertEquals(1, result.getPayload().getAuthorities().size());
        assertTrue(createUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER")));
    }

    @Test
    void shouldNotCreateWithNullUsername() {
        Result<AppUser> result = service.createUser(null, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithBlankUsername() {
        Result<AppUser> result = service.createUser("", "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithUsernameGreaterThan50Chars() {
        Result<AppUser> result = service.createUser("a".repeat(51), "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username must be less than 50 characters", result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateAppUserWithExistingUsername() {
        String username = "mark@melancon.com";
        String password = "H0meRun!";

        when(repository.create(any())).thenThrow(DuplicateKeyException.class);

        Result<AppUser> result = service.createUser(username, password);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("The provided username already exists", result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithNullPassword() {
        Result<AppUser> result = service.createUser("valid@username.com", null);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithLessThan8Chars() {
        Result<AppUser> result = service.createUser("valid@username.com", "invalid");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithoutNumberInPassword() {
        Result<AppUser> result = service.createUser("valid@username.com", "HomeRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWithoutSpecialCharInPassword() {
        Result<AppUser> result = service.createUser("valid@username.com", "H0meruns");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

//    @Test
//    void shouldUpdateAppUserUsername() {
//        AppUser user = new AppUser(6, "mark@melancon.com", "H0meRun!", true, List.of("USER"));
//
//        Result<AppUser> result = service.updateUser(user, "H0meRun!");
//
//        assertTrue(result.isSuccess());
//        assertEquals(6, result.getPayload().getAppUserId());
//        assertEquals("mark@melancon.com", result.getPayload().getUsername());
//        assertEquals("H0meRun!", result.getPayload().getPassword());
//    }

    @Test
    void shouldNotUpdateWithNullUsername() {
        AppUser user = new AppUser(6, null, "H0meRun!", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateWithBlankUsername() {
        AppUser user = new AppUser(6, "", "H0meRun!", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateWithUsernameGreaterThan50Chars() {
        AppUser user = new AppUser(6, "a".repeat(51), "H0meRun!", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("username must be less than 50 characters", result.getMessages().get(0));
    }

//    @Test
//    void shouldNotUpdateAppUserWithExistingUsername() {
//        AppUser user = new AppUser(6, "john@smith.com", "H0meRun!", true, List.of("USER"));
//
//        Result<AppUser> result = service.updateUser(user, "H0meRun!");
//
//        assertFalse(result.isSuccess());
//        assertNull(result.getPayload());
//        assertEquals(1, result.getMessages().size());
//        assertEquals("The provided username already exists", result.getMessages().get(0));
//    }

    @Test
    void shouldNotUpdateWithNullPassword() {
        AppUser user = new AppUser(6, "mark@melancon.com", null, true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateWithLessThan8Chars() {
        AppUser user = new AppUser(6, "mark@melancon.com", "Pw123!", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateWithoutNumberInPassword() {
        AppUser user = new AppUser(6, "mark@melancon.com", "HomeRun!", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateWithoutSpecialCharInPassword() {
        AppUser user = new AppUser(6, "mark@melancon.com", "HomeRuns", true, List.of("USER"));
        Result<AppUser> result = service.updateUser(user, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter",
                result.getMessages().get(0));
    }

    @Test
    void shouldDeleteUser(){
        when(repository.deleteUser(1)).thenReturn(true);
        Result<AppUser> actual = service.deleteUser(1);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteUserIfDoesNotExist(){
        when(repository.deleteUser(61)).thenReturn(false);
        Result<AppUser> actual = service.deleteUser(61);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

}