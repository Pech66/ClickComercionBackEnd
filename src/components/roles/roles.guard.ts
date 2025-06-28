import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //Esta funcion determina si el usuario tiene acceso a la ruta
  canActivate(context: ExecutionContext): boolean {
    //Obtiene los roles permitidos para esta ruta usando metadata
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // Esto hace si la ruta no tiene roles pues entoces deja la ruta libre 
    if (!requiredRoles) return true;
    
    //Obtiene el usuario autenticado del request
    const { user } = context.switchToHttp().getRequest();
    //Verifica si el usuario tiene algun de los roles requeridos
    return requiredRoles.includes(user.rol);
  }
}