package io.cloud.portago.producerservice.service;

import io.cloud.portago.producerservice.model.DeliveryLocation;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class DeliveryLocationService {

    private final KafkaTemplate<String, DeliveryLocation> kafkaTemplate;

    public DeliveryLocationService(KafkaTemplate<String, DeliveryLocation> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendLocation(DeliveryLocation location) {
        kafkaTemplate.send("delivery-location", location.deliveryId(), location);
    }

}
