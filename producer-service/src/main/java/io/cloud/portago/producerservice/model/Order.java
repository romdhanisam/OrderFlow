package io.cloud.portago.producerservice.model;

public record Order(String orderId, String product, int quantity, String status) {
}
