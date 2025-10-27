package io.cloud.portago.producerservice.service;

import io.cloud.portago.producerservice.model.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(SpringExtension.class)
class OrderServiceTest {

    @Mock
    private KafkaTemplate<String, Order> kafkaTemplate;

    @InjectMocks
    private OrderService orderService;

    @Test
    void sendOrder_givenOrder_shouldSendMessageToKafka() {
        // Given
        Order order = new Order("order-123", "Laptop", 2, "");
        // When
        orderService.sendOrder(order);
        // Then
        verify(kafkaTemplate, times(1))
                .send("orders", "order-123", order);
    }
}
