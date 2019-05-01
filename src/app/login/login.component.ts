import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FleetserviceService } from "../fleetservice.service";
import { AppComponent } from "../app.component";
import { LoginAuthService } from "../login-auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  user: any = {};
  returnUrl: string;

  constructor(
    private router: Router,
    private _service: FleetserviceService,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private authService: LoginAuthService
  ) {
    this.authService.isLoggedIn();
  }
  ngOnInit() {}
  loginuser(user: any) {
    console.log(user);
    this._service.loginuser(user).subscribe(response => {
      if (response) {
        console.log(response.token);
        if (response.token) {
          localStorage.setItem("currentUser", JSON.stringify(response));
        }
        if (response.user.role === "ADMIN") {
          //this.appComponent.title = "Fleet Management";
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/getuser"]);
        }
      }
    });
  }
}
