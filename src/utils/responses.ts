
export default class GenericResponse {

    constructor() {}

    static success(body: any, message: string = 'ok') {

        return {
            response: true,
            message,
            body
        };
    }

    static error(error: any, message: string = 'error') {

        let errorMsg = message;

        if(error.errors) {
            
            for(const key in error.errors) {

                errorMsg = error.errors[key].message;

                break;
            }
        }

        return {
            response: false,
            message: errorMsg,
            error,
            body: null
        };
    }
}