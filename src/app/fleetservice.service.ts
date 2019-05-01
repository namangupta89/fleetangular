import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { User } from "./user";
import { Observable } from "rxjs";
import { string } from "@amcharts/amcharts4/core";

@Injectable({
  providedIn: "root"
})
export class FleetserviceService {
  endpoint = "http://localhost:8080/login";

  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    //console.log(JSON.parse(localStorage.getItem("currentUser")));
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  deleteUser(user: any, token): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });
    const ids = user.map(id => id.id);
    return this.http.delete("http://localhost:8080/delete/" + ids, {
      headers: headers
    });
  }

  getAllUsers(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });

    return this.http.get("http://localhost:8080/users", {
      headers: headers
    });
  }

  getUser(email: any, token): Observable<any> {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token
    });

    //console.log("http://localhost:8080/getuser/" + email);

    return this.http.get("http://localhost:8080/getuser/" + email, {
      headers: headers
    });
  }

  loginuser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    });
    return this.http.post("http://localhost:8080/login", user, {
      headers: headers
    });
  }

  saveuser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    });
    return this.http.post("http://localhost:8080/registration", user, {
      headers: headers
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
