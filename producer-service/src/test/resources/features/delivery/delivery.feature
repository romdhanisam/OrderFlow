Feature: Simulate delivery locations

  Scenario: Sending a location for an active order
    Given an active order with id "order-123"
    When I simulate locations
    Then a location should be sent with deliveryId "order-123" and courierId "driver-456"
