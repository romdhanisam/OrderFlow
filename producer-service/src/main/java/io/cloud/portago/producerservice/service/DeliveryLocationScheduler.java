package io.cloud.portago.producerservice.service;

import io.cloud.portago.producerservice.model.DeliveryLocation;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class DeliveryLocationScheduler {

    private final DeliveryLocationService deliveryLocationService;

    private final Map<String, String> activeOrders = new ConcurrentHashMap<>();

    public DeliveryLocationScheduler(DeliveryLocationService deliveryLocationService) {
        this.deliveryLocationService = deliveryLocationService;
    }

    public void startSimulating(String orderId) {
        activeOrders.put(orderId, "driver-456");
    }

    @Scheduled(fixedRate = 3000)
    public void simulateLocations() {
        activeOrders.forEach((orderId, driverId) -> {
            DeliveryLocation loc = new DeliveryLocation(
                    orderId,
                    driverId,
                    randomLat(),
                    randomLng(),
                    "in_progress",
                    Instant.now()
            );
            deliveryLocationService.sendLocation(loc);
        });
    }

    private double randomLat() { return 48.8566 + Math.random() * 0.01; }
    private double randomLng() { return 2.3522 + Math.random() * 0.01; }
}
