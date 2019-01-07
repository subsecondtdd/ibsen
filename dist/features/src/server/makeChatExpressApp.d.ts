import IChatApi from "../domain/IChatApi";
/**
 * Makes a request listener that acts as a thin HTTP adapter in front of the application
 * This could be implemented using a framework like Express.
 *
 * @param chatApi the domain logic
 */
export default function (chatApi: IChatApi): import("express-serve-static-core").Express;
