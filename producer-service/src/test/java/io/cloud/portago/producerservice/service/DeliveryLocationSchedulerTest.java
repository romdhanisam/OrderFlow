package io.cloud.portago.producerservice.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
class DeliveryLocationSchedulerTest {

    @Mock
    private DeliveryLocationService deliveryLocationService;

    @InjectMocks
    private DeliveryLocationScheduler scheduler;


    @Test
    void simulateLocations_givenActiveOrder_shouldSendLocationIsCalled() {
        // Given
        String orderId = "order-123";
        scheduler.startSimulating(orderId);
        // When
        scheduler.simulateLocations();
        // Then
        verify(deliveryLocationService, times(1)).sendLocation(
                argThat(location ->
                        location.deliveryId().equals(orderId) &&
                                location.courierId().equals("driver-456") &&
                                location.status().equals("in_progress")
                )
        );
    }
}
