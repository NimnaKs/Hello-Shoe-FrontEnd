export class StockApi {

    async handleHttpRequest(url, method, data = null) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
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
                throw new Error(await response.text());
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    async generateStockId() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/supplier/nextStockId", "GET");
    }

    async getAllStocks() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/supplier/getAllStock", "GET");
    }

    async deleteStock(stockId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/deleteStock/${stockId}`, "DELETE");
    }

    async saveStock(stockModel) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/saveStock/${localStorage.getItem('userEmail')}`, "POST",stockModel);
    }

    async updateStock(stockModel, stockIdVal) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/updateStock/${stockIdVal}`, "PUT",stockModel);
    }
}