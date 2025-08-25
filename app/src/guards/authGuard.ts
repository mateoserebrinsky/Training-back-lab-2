import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {RoleGuard} from './roleGuard';


@Injectable()
export class AuthGuard implements CanActivate {
  // Según lo que busque canActivate es la interfaz
  // recomendada para el manejo de guards

  constructor(
    private jwt: JwtService,
    private roleGuard: RoleGuard,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.roleGuard.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try{
      const payload = this.jwt.verify(token);
      return payload.role === 'USER';
    }
    catch(err){
      throw new UnauthorizedException();
    }

  }
}