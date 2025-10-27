package io.cloud.portago.consumerservice.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class DeliveryConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    public DeliveryConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "delivery-location", groupId = "delivery-location")
    public void consume(ConsumerRecord<String, Object> record) {
        log.info("Receiving delivery-location from Kafka ");
        System.out.println("Key: " + record.key() + ", Value: " + record.value());
        messagingTemplate.convertAndSend("/topic/delivery", record.value());
    }
}
