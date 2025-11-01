The **gateway-service** is a Spring Cloud Gateway application that acts as the entry point for all client requests.
It routes incoming HTTP requests to the appropriate microservices.

Example (application.yml)
```yaml
spring:
   cloud:
      gateway:
         server:
            webflux:
               discovery:
                  locator:
                     enabled: true
               routes:
                  - id: producer-service
                    uri: lb://producer-service
                    predicates:
                       - Path=/api/**
                  - id: consumer-order-service
                    uri: lb://consumer-order-service
                    predicates:
                       - Path=/ws-orders/**
                  - id: consumer-delivery-service
                    uri: lb://consumer-delivery-service
                    predicates:
                       - Path=/ws-delivery/**
```
