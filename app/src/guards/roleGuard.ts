import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RoleGuard implements CanActivate {
  // Según lo que busque canActivate es la interfaz
  // recomendada para el manejo de guards

  constructor(
    private jwt: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try{
      const payload = this.jwt.verify(token);
      return payload.role === 'ADMIN';
    }
    catch(err){
      throw new UnauthorizedException();
    }

  }

  public extractTokenFromHeader(request: {
    headers: { authorization: { split: (arg0: string) => never[] } };//Me obligó el Ide a poner esta linea
    //Me obliga a inferir el tipo de request
  }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}