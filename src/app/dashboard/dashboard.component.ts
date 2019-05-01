import { Component, OnInit } from "@angular/core";
import { LoginAuthService } from "../login-auth.service";
import { FleetserviceService } from "../fleetservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"]
})
export class DashboardComponent implements OnInit {
  loginUser: any = {};

  zoom: number = 8;
  // initial center position for the map
  lat: number = 41.808389;
  lng: number = -71.402476;
  constructor(
    private authService: LoginAuthService,
    private _service: FleetserviceService,
    private router: Router
  ) {
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("this.loginUser", this.loginUser.token);
  }

  ngOnInit() {
    //console.log("this.loginUser.token", this.loginUser.token);
  }
}
