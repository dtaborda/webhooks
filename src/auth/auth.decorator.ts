import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to extract the Authorization token from the headers
export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    return authorization ? authorization.replace('Bearer ', '') : null;
  },
);
