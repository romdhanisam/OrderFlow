package io.cloud.portago.producerservice.steps;

import io.cloud.portago.producerservice.controller.OrderController;
import io.cloud.portago.producerservice.model.Order;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@WebMvcTest(controllers = OrderController.class)
public class ApplicationOrder {

    @Autowired
    private TestRestTemplate restTemplate;
    private ResponseEntity<String> response;
    private static final String URL = "http://localhost:8888";


    @Given("the API server is running")
    public void the_api_server_is_running() {
        // Nothing needed
    }

    @When("I request the endpoint {string}")
    public void iRequestTheEndpoint(String path) {
        response = this.restTemplate.getForEntity(URL + path, String.class);
    }
    @When("I request the endpoint {string} with new order with id {string}, product {string} and quantity {int}")
    public void iRequestTheEndpoint(String path, String orderId, String product, int quantity) {
        Order order = new Order(orderId, product, quantity, "CREATED");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(order, headers);
        response = restTemplate.postForEntity(URL + path, request, String.class);
    }

    @Then("I should receive a response containing {string}")
    public void iShouldReceiveAResponseContaining(String arg0) {
        assertThat(response.getBody()).isEqualTo(arg0);
    }

    @And("the status code is {int}")
    public void theStatusCodeIs(int statusCode) {
        assertThat(response.getStatusCode()).isEqualTo(HttpStatusCode.valueOf(statusCode));
    }

}
