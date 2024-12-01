import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/constants/api-urls';
import { environment } from 'src/environments/environment';

interface MailRequest {
  userId: string;
  files: string[];
  filenames: string[];
}


@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  // uploadSubmission(userId: any, base64: any, fileName: any): Observable<any> {
  //   const params = new HttpParams().set('userId', userId).set('file', base64).set('filename', fileName);
  //   // const payload = { userId, file: base64, filename: fileName };
  //   return this.http.post<any[]>(environment.serverUrl + ApiUrls.version + ApiUrls.submission, { params });
  // }

  uploadSubmission(mailRequest: any): Observable<any> {
    // const payload = { userId: userId, file: base64, filename: fileName };
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.post<any>(environment.serverUrl + ApiUrls.version + ApiUrls.submission, mailRequest);
  }
}
