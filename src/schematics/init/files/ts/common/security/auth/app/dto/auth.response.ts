import { ApiProperty } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { IAuthResponse } from '@rafikidota/iroh';
import { UserView } from '../../../user';

export class AuthResponse implements IAuthResponse<UserView> {
  @ApiProperty({
    example: AuthResponse.generateToken(),
  })
  token: string;

  @ApiProperty({
    type: () => UserView,
  })
  user: UserView;

  private static generateToken(): string {
    const payload = { id: uuid() };
    const secret = uuid();
    return sign(payload, secret);
  }
}
