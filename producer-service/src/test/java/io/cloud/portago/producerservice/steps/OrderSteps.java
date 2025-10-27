package io.cloud.portago.producerservice.steps;

import io.cloud.portago.producerservice.model.Order;
import io.cloud.portago.producerservice.service.DeliveryLocationScheduler;
import io.cloud.portago.producerservice.service.OrderService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.kafka.core.KafkaTemplate;

import static org.mockito.Mockito.*;

@SpringBootTest(classes = DeliveryLocationScheduler.class)
@Import(DeliveryLocationSteps.TestConfig.class)
public class OrderSteps {

    @Configuration
    static class TestConfig {
        @Bean
        public KafkaTemplate<String, Order> kafkaTemplate() {
            return mock(KafkaTemplate.class);
        }

        @Bean
        public OrderService orderService(KafkaTemplate<String, Order> kafkaTemplate) {
            return new OrderService(kafkaTemplate);
        }
    }

    @Autowired
    private KafkaTemplate<String, Order> kafkaTemplate;

    @Autowired
    private OrderService orderService;

    private Order order;

    @Given("a new order with id {string}, product {string} and quantity {int}")
    public void a_new_order_with_details(String orderId, String product, int quantity) {
        order = new Order(orderId, product, quantity, "CREATED");
    }

    @When("I send the order")
    public void i_send_the_order() {
        orderService.sendOrder(order);
    }

    @Then("the order should be sent to Kafka with key {string}")
    public void the_order_should_be_sent_to_kafka_with_key(String key) {
        verify(kafkaTemplate, times(1))
                .send("orders", key, order);
    }
}
