import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/header/navbar/navbar.component';
import { FooterComponent } from 'src/dashboard/footer/footer/footer.component';
import { TeamComponent } from 'src/dashboard/components/team/team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from 'src/dashboard/home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { DownloadComponent } from 'src/dashboard/components/download/download.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
// import { FileDragNDropDirective } from 'src/dashboard/file-submission/file-drag-n-drop.directive';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NgApexchartsModule } from "ng-apexcharts";
import { TeamsPageComponent } from 'src/dashboard/teams-page/teams-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TeamComponent,
    HomeComponent,
    DownloadComponent,
    TeamsPageComponent,
    // FileDragNDropDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
