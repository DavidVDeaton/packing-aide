package learn.easypacking.domain;

import learn.easypacking.data.ContainersRepository;
import learn.easypacking.data.ItemRepository;
import learn.easypacking.models.Container;
import net.bytebuddy.build.HashCodeAndEqualsPlugin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ContainerServiceTest {

    @Autowired
    ContainerService service;

    @MockBean
    ContainersRepository repository;

    @MockBean
    ItemRepository itemRepository;


    @Test
    void findAll() {
    }

    @Test
    void findById() {
    }

    @Test
    void createContainer() {
    }

    @Test
    void updateContainer() {
    }

    @Test
    void deleteById() {
    }

}