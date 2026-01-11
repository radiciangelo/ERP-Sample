import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionEnum } from 'src/app/shared/enums/permission.enum';
import { PermissionService } from 'src/app/core/services/permission.service';

@Injectable()
export class PermissionGuard  {
    constructor(
        private router: Router,
        private permissionService: PermissionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let permission = route.data['permission'] as PermissionEnum;
        if (permission && this.permissionService.hasPermission(permission)) {
            return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
    }
}