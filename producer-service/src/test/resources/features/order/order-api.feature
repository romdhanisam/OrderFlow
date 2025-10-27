Feature: Order REST API

  Scenario: Sending an order through the API
    Given the API server is running
    When I request the endpoint "/api/orders" with new order with id "order-456", product "Phone" and quantity 3
    Then I should receive a response containing "Order sent"
    And the status code is 200

