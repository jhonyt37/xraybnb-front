import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel } from '../../../app/models/companies';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) {
  }

  registerCompany(body: CompanyModel) {
    return this.http.post<any>(`${environment.url_api}/companies`, body);
  }

}
