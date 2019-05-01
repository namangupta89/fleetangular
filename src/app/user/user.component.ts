import {
  Component,
  OnInit,
  Injectable,
  ViewChild,
  Inject
} from "@angular/core";
import { Router } from "@angular/router";
import { FleetserviceService } from "../fleetservice.service";
import { first } from "rxjs/operators";
import { FormControl, Validators } from "@angular/forms";

import { LoginAuthService } from "../login-auth.service";
import { MatDialog } from "@angular/material";
import { UserlistComponent } from "../userlist/userlist.component";
import { MAT_DIALOG_DATA } from "@angular/material";

export interface Role {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.sass"]
})
export class UserComponent implements OnInit {
  appTitle: string = "Fleet Management ";

  user: any = {};

  checked = false;

  successMessage: string;

  show: boolean = false;

  formControl = new FormControl("", [Validators.required, Validators.email]);

  roles: Role[] = [
    { value: "ADMIN", viewValue: "ADMIN" },
    { value: "USER", viewValue: "USER" }
  ];
  loginUser: any = {};

  constructor(
    private router: Router,
    private _service: FleetserviceService,
    private authService: LoginAuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  formEditMode: any;

  ngOnInit() {
    this.formEditMode = this.data;

    if (this.data != null) {
      console.log("this.data.email", this.data.email);

      this._service
        .getUser(this.data.email, this.loginUser.token)
        .subscribe(response => (this.user = response));
    }
  }

  save(user: any) {
    console.log("user", user);

    this._service.saveuser(user).subscribe(response => {
      if (response) {
        console.log(response);
        //this.router.navigate(["/dashboard"]);
        this.show = true;
        this.successMessage = response.message;
      }
    });
  }
}
