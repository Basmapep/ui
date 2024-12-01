import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/constants/api-urls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  signUp(id: any): Observable<any> {
    return this.http.post<any>(environment.serverUrl + ApiUrls.version + ApiUrls.signin, id)

  }

  signIn(id: any): Observable<any> {
    const params = new HttpParams().set('userName', id.userName).set('password', id.password);
    return this.http.get<any>(environment.serverUrl + ApiUrls.version + ApiUrls.login, {params})
  }
}
