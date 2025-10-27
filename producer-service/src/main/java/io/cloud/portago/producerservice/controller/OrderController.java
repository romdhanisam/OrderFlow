package io.cloud.portago.producerservice.controller;

import io.cloud.portago.producerservice.model.Order;
import io.cloud.portago.producerservice.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    private final OrderService orderService;
    private final DeliveryLocationScheduler deliveryLocationScheduler;

    public OrderController(OrderService orderService, DeliveryLocationScheduler deliveryLocationScheduler) {
        this.orderService = orderService;
        this.deliveryLocationScheduler = deliveryLocationScheduler;
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        orderService.sendOrder(order);
        deliveryLocationScheduler.startSimulating(order.orderId());
        return ResponseEntity.ok("Order sent");
    }

}
