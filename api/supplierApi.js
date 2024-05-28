export class SupplierApi {
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
                throw new Error(await response.text());
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    async getAllSuppliers() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/supplier", "GET");
    }

    async deleteSupplier(supplierId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/${supplierId}`, "DELETE");
    }

    async generateSupplierId() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/supplier/nextSupId", "GET");
    }

    async updateSupplier(supplier, supplierId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/${supplierId}`, "PUT", supplier);
    }

    async saveSupplier(supplier) {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/supplier", "POST", supplier);
    }

    async getSupplier(supplierId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/supplier/${supplierId}`, "GET");
    }
}
