import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { entity } = ctx.switchToHttp().getRequest();
    console.log({ entity });
    return entity;
  },
);
