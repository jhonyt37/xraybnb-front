import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private http: HttpClient) {
  }

  getAbilities() {
    return this.http.get<any>(`${environment.url_api}/commons-app/skills`);
  }

  getLanguages() {
    return this.http.get<any>(`${environment.url_api}/commons-app/languages`);
  }

  getEducationType() {
    return this.http.get<any>(`${environment.url_api}/commons-app/education-types`);
  }

  getIdType() {
    return this.http.get<any>(`${environment.url_api}/commons/identification`);
  }

}
