1. **Producer Service** → Publishes new orders to Kafka (order-topic).
2. **Consumer Order Service** → Processes order events
    1. Listens to order-topic (order list updates).
    2. Broadcasts order list in real time to connected WebSocket clients.
3. **Consumer Delivery Service** →
    1. Listens to delivery-topic (driver position updates).
    2. Broadcasts updates in real time to connected WebSocket clients.
4. **Angular Frontend** → Displays orders and live locations on a map (Leaflet).
