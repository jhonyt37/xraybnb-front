import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) {
  }

  getCandidates(params?: any) {
    let queryParams = new HttpParams({ fromObject: params });
    const options = { params: queryParams }
    return this.http.get<any>(`${environment.url_api}/users-app/candidate`, options);
  }

  getTestCandidates(idTest: number) {
    return this.http.get<any>(`${environment.url_api}/users-app/user-test/${idTest}`);
  }

}
