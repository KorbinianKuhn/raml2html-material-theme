import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';
import { GeneralComponent } from './components/general/general.component';
import { RouteDetailComponent } from './components/routes/route-detail/route-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'routes'
  },
  {
    path: 'routes',
    component: RoutesComponent,
    children: [
      {
        path: ':id/:method',
        component: RouteDetailComponent
      }
    ]
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: '**',
    redirectTo: 'routes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
