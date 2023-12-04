import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResultTechnicalTestModel } from 'src/app/models/technical-test.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicalTestService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.access_token}`
      }
    );
  }

  getTechnicalTest() {
    const options = { headers: this.headers }    
    return this.http.get<any>(`${environment.url_api}/evaluations-app/tests`, options);
  }

  registerResultTechnicalTest(body: ResultTechnicalTestModel) {
    const options = { headers: this.headers };
    return this.http.post<any>(`${environment.url_api}/evaluations-app/technical-test`, body, options);
  }

}
