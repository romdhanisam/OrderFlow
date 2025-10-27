package io.cloud.portago.producerservice.service;

import io.cloud.portago.producerservice.model.DeliveryLocation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
class DeliveryLocationServiceTest {

    @Mock
    private KafkaTemplate<String, DeliveryLocation> kafkaTemplate;

    @InjectMocks
    private DeliveryLocationService deliveryLocationService;

    @Test
    void sendLocation_givenDeliveryLocation_shouldSendMessageToKafka() {
        // Given
        DeliveryLocation location = new DeliveryLocation(
                "delivery-123",
                "courier-11",
                48.8566,
                2.3522,
                "IN_TRANSIT",
                Instant.now()
        );
        // When
        deliveryLocationService.sendLocation(location);
        // Then
        verify(kafkaTemplate, times(1))
                .send("delivery-location", "delivery-123", location);
    }
}
