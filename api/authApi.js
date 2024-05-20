export class AuthApi {
    async handleHttpRequest(url, method, data = null) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    async signIn(signIn) {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/auth/signIn", "POST", signIn);
    }

    async signUp(signUp) {
        return this.handleHttpRequest("http://localhost:9090/helloShoeShop/api/v1/auth/signUp", "POST", signUp);
    }
}
