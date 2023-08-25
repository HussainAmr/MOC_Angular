import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './master/company/company.component';
import { PlantComponent } from './master/plant/plant.component';
import { RolesComponent } from './master/roles/roles.component';
import { SegmentComponent } from './master/segment/segment.component';
import { SiteComponent } from './master/site/site.component';
import { UserComponent } from './master/user/user.component';
// import { MasterComponent } from './sidenav/master.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  // { path: 'master', component: MasterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'segment', component: SegmentComponent },
  { path: 'site', component: SiteComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'roles', component: RolesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
