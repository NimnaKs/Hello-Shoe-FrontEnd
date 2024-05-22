export class CustomerApi {

    // Function to handle common logic for HTTP requests
    async handleHttpRequest(url, method, data = null) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return await response.json();
                } else {
                    return await response.text();
                }
            } else {
                throw new Error(`HTTP request failed with status ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    // Updated getAllCustomer using Fetch API
    async getAllCustomer() {
        return this.handleHttpRequest("http://localhost:8080/poss/customer?action=getAllCustomers", "GET");
    }

    // Updated delete Customer using Fetch API
    async deleteCustomer(custId) {
        return this.handleHttpRequest(`http://localhost:8080/poss/customer?customerId=${custId}`, "DELETE");
    }

    // Updated generateCustomerId using Fetch API
    async generateCustomerId() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/customer/nextCustId", "GET");
    }

    // Updated updateCustomer using Fetch API
    async updateCustomer(customer) {
        return this.handleHttpRequest("http://localhost:8080/poss/customer", "PUT", customer);
    }

    // Updated saveCustomer using Fetch API
    async saveCustomer(customer) {
        return this.handleHttpRequest("http://localhost:8080/poss/customer", "POST", customer);
    }

    // Updated getCustomer using Fetch API
    async getCustomer(custId) {
        return this.handleHttpRequest(`http://localhost:8080/poss/customer?action=getCustomer&customerId=${custId}`, "GET");
    }

    async getAllCustomerIds(){
        return this.handleHttpRequest(`http://localhost:8080/poss/customer?action=getAllCustomerIds`, "GET");
    }

}
