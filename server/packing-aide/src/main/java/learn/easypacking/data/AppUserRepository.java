package learn.easypacking.data;

import learn.easypacking.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

    @Transactional
    AppUser findByUsername(String username);

    @Transactional
    AppUser findByUserId(int appUserId);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    void update(AppUser user);

    @Transactional
    boolean deleteUser(int appUserId);
}