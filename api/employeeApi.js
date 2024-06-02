export class EmployeeApi {

    async sendAjaxRequest(url, method, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {

                    try {
                        const jsonResponse = JSON.parse(xhr.responseText);
                        resolve(jsonResponse);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`HTTP error: ${xhr.status} ${xhr.statusText}`));
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send(data);
        });
    }
    getAllEmployees() {
        return this.sendAjaxRequest("http://localhost:9090/helloShoeShop/api/v1/employee", "GET");
    }
}