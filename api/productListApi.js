export class ProductListApi {
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

    async saveGender(genderModel) {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/inventory/genderSave", "POST", genderModel);
    }

    async updateGender(genderModel,genId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/inventory/genderUpdate?id=${genId}`, "PUT", genderModel);
    }

    async getAllGenders() {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/inventory/genderGetAll", "GET");
    }

    async deleteGender(genId) {
        return this.handleHttpRequest(`http://localhost:9090/helloShoeShop/api/v1/inventory/genderDelete?id=${genId}`, "DELETE");
    }
}