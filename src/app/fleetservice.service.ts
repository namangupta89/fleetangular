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
    console.log("delete");
    console.log("user", user);
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });

    // const options = {
    //   headers: new HttpHeaders({
    //     // "Content-Type": "application/json",
    //     Authorization: "Bearer " + token
    //   }),
    //   body: [user]
    // };

    //console.log("options", options);
    const id = string;
    // user.forEach(function(data) {
    //   console.log(data.id);
    // });

    const ids = user.map(id => id.id);

    console.log("getID", ids);
    return this.http.delete("http://localhost:8080/delete/" + ids, {
      headers: headers
    });
  }

  getAllUsers(token: any): Observable<any> {
    console.log("token", token);
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token
    });

    return this.http.get("http://localhost:8080/users", {
      headers: headers
    });
  }

  getUser(email: any, token): Observable<any> {
    console.log("token", token);
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token
    });

    console.log("http://localhost:8080/getuser/" + email);

    return this.http.get("http://localhost:8080/getuser/" + email, {
      headers: headers
    });
  }

  loginuser(user: any): Observable<any> {
    console.log(user);
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

  // getuserlist(): Observable<any> {
  //   // return this.http
  //   //   .get("http://localhost:8080/users")
  //   //   .subscribe(data => console.log(data));
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem("currentUser");
  //   this.currentUserSubject.next(null);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     //this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
