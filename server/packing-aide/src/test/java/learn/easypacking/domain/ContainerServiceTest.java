package learn.easypacking.domain;

import learn.easypacking.data.ContainersRepository;
import learn.easypacking.data.ItemRepository;
import learn.easypacking.models.Container;
import learn.easypacking.models.Event;
import net.bytebuddy.build.HashCodeAndEqualsPlugin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ContainerServiceTest {

    @Autowired
    ContainerService service;

    @MockBean
    ContainersRepository repository;


    @Test
    void createContainer() {
        Container containerToCreate = makeContainer();
        Container mockResult = makeContainer();
        mockResult.setContainerId(2);

        when(repository.createContainer(containerToCreate)).thenReturn(mockResult);
        Result<Container> actual = service.createContainer(containerToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateWhenInvalid() {
        Container invalidContainer = makeContainer();
        invalidContainer.setEventId(0);

        Result<Container> actual = service.createContainer(invalidContainer);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidContainer = makeContainer();
        invalidContainer.setContainerName("");
        actual = service.createContainer(invalidContainer);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void updateContainer() {
        Container containerToUpdate = makeContainer();
        containerToUpdate.setContainerId(1);

        when(repository.updateContainer(containerToUpdate)).thenReturn(true);

        Result<Container> actual = service.updateContainer(containerToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Container invalidContainer = makeContainer();
        invalidContainer.setContainerId(999);

        Result<Container> actual = service.createContainer(invalidContainer);
        assertEquals(ResultType.INVALID, actual.getType());

        invalidContainer = makeContainer();
        invalidContainer.setEventId(0);
        actual = service.createContainer(invalidContainer);
        assertEquals(ResultType.INVALID, actual.getType());

    }

    @Test
    void deleteById() {
        when(repository.deleteById(2)).thenReturn(true);
        Result<Container> actual = service.deleteById(2);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteById(10)).thenReturn(false);
        Result<Container> actual = service.deleteById(10);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    private Container makeContainer() {
        Container container = new Container();
        container.setParentContainerId(1);
        container.setContainerName("test");
        container.setEventId(2);
        return container;
    }
}