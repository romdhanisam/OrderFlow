package io.cloud.portago.producerservice.steps;

import io.cloud.portago.producerservice.service.DeliveryLocationScheduler;
import io.cloud.portago.producerservice.service.DeliveryLocationService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = DeliveryLocationScheduler.class)
@Import(DeliveryLocationSteps.TestConfig.class)
public class DeliveryLocationSteps {

    @Autowired
    private  DeliveryLocationService deliveryLocationService ;

    @Configuration
    public static class TestConfig {
        @Bean
        public DeliveryLocationService deliveryLocationService() {
            return mock(DeliveryLocationService.class);
        }
    }

    @Autowired
    private DeliveryLocationScheduler scheduler;
    @Given("an active order with id {string}")
    public void an_active_order_with_id(String orderId) {
        scheduler.startSimulating(orderId);
    }


    @When("I simulate locations")
    public void i_simulate_locations() {
        scheduler.simulateLocations();
    }

    @Then("a location should be sent with deliveryId {string} and courierId {string}")
    public void aLocationShouldBeSentWithDeliveryIdAndCourierId(String deliveryId, String courierId) {
        verify(deliveryLocationService, times(1)).sendLocation(
                argThat(loc ->
                        loc.deliveryId().equals(deliveryId) &&
                                loc.courierId().equals(courierId) &&
                                loc.status().equals("in_progress")
                )
        );
    }
}
