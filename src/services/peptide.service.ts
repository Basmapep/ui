import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { url } from "../environments/environment"
import { ApiUrls } from 'src/constants/api-urls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeptideService {
  private sequenceData: BehaviorSubject<any> = new BehaviorSubject('')

  constructor(private http: HttpClient) { }

  getPeptide(category: string, searchValue: string,comparison:any): Observable<any[]> {
    const params = new HttpParams().set('category', category).set('searchValue', searchValue).set('comparison',comparison);
    return this.http.get<any[]>(environment.serverUrl + ApiUrls.version + ApiUrls.peptide, { params });
  }

  setSequenceDate(data: any) {
    this.sequenceData.next(data)
  }

  getSequenceData() {
    return this.sequenceData;
  }

  getBlastData(sequence: string): Observable<any> {
    const params = new HttpParams().set('blastSequence', sequence);
    return this.http.get(environment.serverUrl + ApiUrls.version + ApiUrls.blast, { 
      params, 
      responseType: 'text'
    });
  }

  getChartData(data:any):Observable<any>{
    const params = new HttpParams().set('bieChart', data);
    return this.http.get(environment.serverUrl + ApiUrls.version + ApiUrls.charts, { 
      params, 
      responseType: 'text'
    })
  }
  

}
