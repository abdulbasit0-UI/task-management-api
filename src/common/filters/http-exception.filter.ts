import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Logger,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : (exceptionResponse as any).message || "Internal Error",
    };

    this.logger.error(
      `${request.method} ${request.url} [${status}] ${JSON.stringify(errorResponse)}`
    );
  }
}
