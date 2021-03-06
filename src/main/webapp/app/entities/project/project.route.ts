import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectPopupComponent, ProjectDialogComponent } from './project-dialog.component';
import { ProjectDeletePopupComponent } from './project-delete-dialog.component';
import { ProjectDialogModal } from './project-dialog';

@Injectable()
export class ProjectResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const projectRoute: Routes = [
    {
        path: 'project',
        component: ProjectComponent,
        resolve: {
            'pagingParams': ProjectResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    },
     {
        path: 'project/:id',
        component: ProjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-new',
        component: ProjectDialogComponent,
        data: {
           // authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
   
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-addPhase',
        component: ProjectDialogModal,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project/:id/edit',
        component: ProjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project/:id/delete',
        component: ProjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
