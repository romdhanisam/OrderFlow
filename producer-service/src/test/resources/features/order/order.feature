Feature: Send orders to Kafka

  Scenario: Sending a new order
    Given a new order with id "order-123", product "Laptop" and quantity 2
    When I send the order
    Then the order should be sent to Kafka with key "order-123"
