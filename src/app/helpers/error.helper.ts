export class ErrorHelper {
  static getErrorMessage(err: any) {
    let errorMessage = err.statusText;
    try {
      errorMessage = JSON.parse(err._body).message;
    } catch (ex) {
      if(!errorMessage) errorMessage = "Unexpected error";
    }
    return errorMessage;
  }
}