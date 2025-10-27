package io.cloud.portago.consumerservice.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class OrderConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    public OrderConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "orders", groupId = "order-group")
    public void consume(ConsumerRecord<String, Object> record) {
        log.info("Receiving order from Kafka ");
        System.out.println("Key: " + record.key() + ", Value: " + record.value());
        messagingTemplate.convertAndSend("/topic/orders", record.value());
    }
}
