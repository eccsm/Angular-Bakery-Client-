import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }
  serviceUri = 'http://localhost:8082/'
  url: string;

  getProducts(): Observable<any> {
    return this.http.get(this.serviceUri + 'products');
  }

  getCategories(): Observable<any> {
    return this.http.get(this.serviceUri + 'categories');
  }


  getImages(): Observable<any> {
    return this.http.get(this.serviceUri + 'images');
  }

  createProduct(data): Observable<any> {
    this.url = this.serviceUri + "product/create";
    return this.http.post(this.url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getProduct(id): Observable<any> {
    let url = this.serviceUri + "product/" + id;
    return this.http.get(url).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateProduct(id, data): Observable<any> {
    this.url = this.serviceUri + "product/" + id;
    return this.http.put(this.url, data).pipe(
      catchError(this.errorMgmt)
    )
  }


  uploadImage(data, id): Observable<any> {
    this.url = this.serviceUri + "image/" + id;
    return this.http.post(this.url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  getImage(name): Observable<any> {
    let url = this.serviceUri + "image/" + name;
    return this.http.get(url).pipe(
      map((res: Response) => {
        return res
      }),
      catchError(this.errorMgmt)
    )
  }

  updateImage(data, id): Observable<any> {
    this.url = this.serviceUri + "image/" + id;
    return this.http.put(this.url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteImage(id): Observable<any> {
    this.url = this.serviceUri + "image/" + id;
    return this.http.delete(this.url).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteProduct(id): Observable<any> {
    this.url = this.serviceUri + "product/" + id;
    return this.http.delete(this.url).pipe(
      catchError(this.errorMgmt)
    )
  }

  createCategory(data): Observable<any> {
    this.url = this.serviceUri + "category/create";
    return this.http.post(this.url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getCategory(id): Observable<any> {
    this.url = this.serviceUri + "category/" + id;
    return this.http.get(this.url).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateCategory(id, data): Observable<any> {
    this.url = this.serviceUri + "category/" + id;
    return this.http.put(this.url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteCategory(id): Observable<any> {
    this.url = this.serviceUri + "category/" + id;
    return this.http.delete(this.url).pipe(
      catchError(this.errorMgmt)
    )
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.serviceUri + "users");
  }

  getUser(id): Observable<any> {
    this.url = this.serviceUri + "user/" + id;
    return this.http.get(this.url).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateUser(id, data): Observable<any> {
    this.url = this.serviceUri + "user/" + id;
    return this.http.put(this.url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  login(data) {
    return this.http.post(this.serviceUri + "login", data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  register(data) {
    return this.http.post(this.serviceUri + "user", data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  deleteUser(id: number) {
    return this.http.delete(this.serviceUri + "user/" + id);
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(this.serviceUri + "roles");
  }

  getRole(id): Observable<any> {
    this.url = this.serviceUri + "role/" + id;
    return this.http.get(this.url).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateRole(id, data): Observable<any> {
    this.url = this.serviceUri + "role/" + id;
    return this.http.put(this.url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteRole(id: number) {
    return this.http.delete(this.serviceUri + "role/" + id);
  }


  contact(name, email, message) {
    return this.http.post(this.serviceUri + "contact", { name: name, email: email, message: message })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  forgotPassword(username) {
    return this.http.post(this.serviceUri + "forgotpassword", { form: username })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  resetPassword(token,password) {
    return this.http.post(this.serviceUri + "resetpassword",{token:token, password:password})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.message;

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
