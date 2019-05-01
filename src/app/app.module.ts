import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./auth.guard";
import { FleetserviceService } from "./fleetservice.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { UserlistComponent } from "./userlist/userlist.component";
import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";
import { MapComponent } from "./map/map.component";
import { SearchPipe } from "./search.pipe.filter";
import { MatPaginatorModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    UserlistComponent,
    MapComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCA53-03niYZQOy-RnNJr1rOcxLkDGSXyA"
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
