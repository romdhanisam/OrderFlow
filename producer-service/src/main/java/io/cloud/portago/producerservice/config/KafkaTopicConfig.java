package io.cloud.portago.producerservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.config.TopicConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic generateTopic() {
        Map<String, String> configurations = new HashMap<>();
        // delete (The messages after a specific time), compact (Hold the most current)
        configurations.put(TopicConfig.CLEANUP_POLICY_CONFIG, TopicConfig.CLEANUP_POLICY_DELETE);
        // After a day the message will be deleted, by default is -1
        configurations.put(TopicConfig.RETENTION_MS_CONFIG, "86400000");
        // Max Size of the segment 1GB - By default came in 1GB
        configurations.put(TopicConfig.SEGMENT_BYTES_CONFIG, "1073741824");
        // Max Size of each message 2MB - By default 1MB
        configurations.put(TopicConfig.MAX_MESSAGE_BYTES_CONFIG, "2000000");
        return TopicBuilder.name("orders")
                .partitions(1)
                .replicas(1)
                .configs(configurations)
                .build();
    }

}
