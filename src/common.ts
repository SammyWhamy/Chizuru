export class JsonResponse extends Response {
    constructor(body: object, init?: object) {
        const jsonBody = JSON.stringify(body);
        super(jsonBody, init || {headers: {'content-type': 'application/json;charset=UTF-8'}});
    }
}
