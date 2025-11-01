```md
+---------------------+                    +-------------------------+
|  Frontend UI        | --------------->   |      API Gateway        |
| (Angular + Leaflet) | (REST / WebSocket) |   (Spring Cloud Gateway)|
+---------------------+                    +-------------------------+
                                                  |
                                                  ▼
                                    ┌───────────────────────────────┐
                                    │        Apache Kafka           │
                                    │  (order-topic, delivery-topic)│
                                    │    Simulates orders           │
                                    │       &  driver location      │
                                    └─────────┬──┬──────────────────┘
                                              │  │
                         ┌────────────────────┘  └──────────────────┐
                         ▼                                          ▼
      ┌────────────────────────────┐                 ┌────────────────────────────┐
      │  Consumer Order Service    │                 │ Consumer Delivery Service  │
      │ (Group: order-group)       │                 │ (Group: delivery-group)    │
      │ - Consumes new orders      │                 │ - Consumes driver location │
      └────────────────────────────┘                 └────────────────────────────┘
                                    
            ┌──────────────────────────────┐
            │        Consul Registry       │
            │ (Service Discovery & Health) │
            └──────────────────────────────┘

             ┌──────────────────────────────┐
             │          Kafka UI            │
             │      (Topic inspection)      │
             └──────────────────────────────┘
```
