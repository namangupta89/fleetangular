import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "../app/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserlistComponent } from "./userlist/userlist.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },
  { path: "userlist", component: UserlistComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
