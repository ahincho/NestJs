import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const rpcError = exception.getError();
    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      return response.status(rpcError['status']).json(rpcError);
    }
    console.log('rpcError', rpcError);
    return response.status(HttpStatus.UNAUTHORIZED).json({
      status: 401,
      message: 'Hello World from NestJS',
    });
  }
}
