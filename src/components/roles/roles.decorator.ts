import { SetMetadata } from '@nestjs/common';
import { Rol } from './roles.enum';

export const Roles = (...roles: Rol[]) => SetMetadata('roles', roles);