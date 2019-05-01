import { Component } from "@angular/core";
import { LoginAuthService } from "./login-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "fleet";

  public currentStatus: any;

  constructor(private authService: LoginAuthService, private router: Router) {
    //this.authService.isLoggedIn();

    console.log(this.authService.isLoggedIn());
    this.currentStatus = this.authService
      .getStatus()
      .subscribe(currentStatus => {
        this.currentStatus = currentStatus;
      });
    //console.log("status", this.currentStatus);
  }

  logout() {
    console.log("logouot called !!");
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }
  ngOnInit() {}
}
