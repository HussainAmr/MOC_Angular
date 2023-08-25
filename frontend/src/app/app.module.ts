import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';

import { HomepageComponent } from './homepage/homepage.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserComponent } from './master/user/user.component';
import { CompanyComponent } from './master/company/company.component';
import { SegmentComponent } from './master/segment/segment.component';
import { SiteComponent } from './master/site/site.component';
import { PlantComponent } from './master/plant/plant.component';
import { RolesComponent } from './master/roles/roles.component';
// import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
// import { MasterComponent } from './sidenav/master.component';

//services
import { CompanyApiService } from 'src/app/master/company/companyApi.service';
import { PlantApiService } from 'src/app/master/plant/plantApi.service';
import { RoleApiService } from 'src/app/master/roles/roleApi.service';
import { SegmentApiService } from 'src/app/master/segment/segmentApi.service';
import { SiteApiService } from 'src/app/master/site/siteApi.service';
import { UserApiService } from 'src/app/master/user/userApi.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SidenavComponent,
    UserComponent,
    CompanyComponent,
    SegmentComponent,
    SiteComponent,
    PlantComponent,
    RolesComponent,
    // SublevelMenuComponent,
    // MasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    CompanyApiService,
    PlantApiService,
    RoleApiService,
    SegmentApiService,
    SiteApiService,
    UserApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
