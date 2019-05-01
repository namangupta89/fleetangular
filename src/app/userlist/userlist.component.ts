import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { LoginAuthService } from "../login-auth.service";
import { FleetserviceService } from "../fleetservice.service";
import "hammerjs";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { UserComponent } from "../user/user.component";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.sass"]
})
export class UserlistComponent implements OnInit {
  loginUser: any = {};
  users: any = [];
  emailData: any = [];

  searchText = "";
  aa: boolean = false;

  formEditMode: boolean = false;

  displayedColumns: string[] = [
    "select",
    "position",
    "firstname",
    "lastname",
    "role",
    "phoneNumber",
    "email"
  ];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private authService: LoginAuthService,
    private _service: FleetserviceService,
    private dialog: MatDialog
  ) {
    this.authService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("this.loginUser", this.loginUser.token);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this._service.getAllUsers(this.loginUser.token).subscribe(response => {
      //this.users = response;

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      //console.log("this.dataSource.paginator", this.dataSource.paginator);
    });
  }

  setIndex(ii) {
    this.aa = ii;
    console.log;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: "400px"
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      //      this.ngOnInit();
      this.selection = new SelectionModel(true, []);

      //this.animal = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    //const numRows = this.paginator.pageSize;
    return numSelected === numRows;
  }

  editUser(email) {
    console.log("edit user ", email);
    this.formEditMode = true;
    const dialogRef = this.dialog.open(UserComponent, {
      width: "400px",
      data: { formEditMode: this.formEditMode, email: email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.selection = new SelectionModel(true, []);
      this.ngOnInit();
      //this.animal = result;
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    //console.log("row", row);
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }
  deleteUser(record) {
    this._service
      .deleteUser(this.selection.selected, this.loginUser.token)
      .subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.selection = new SelectionModel(true, []);
      });
  }
}
