package io.cloud.portago.producerservice.model;

import java.time.Instant;

public record DeliveryLocation(String deliveryId, String courierId,
                               double latitude, double longitude,
                               String status, Instant timestamp) {
}
