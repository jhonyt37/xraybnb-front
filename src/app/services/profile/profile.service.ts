import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  getCandidate(id: number) {
    return this.http.get<any>(`${environment.url_api}/users-app/candidate/${id}`);
  }

  addExperience(candidateID: number, experience: any) {
    return this.http.post<any>(`${environment.url_api}/users-app/candidate/${candidateID}/experience`, experience);
  }

  addEducation(candidateID: number, education: any) {
    return this.http.post<any>(`${environment.url_api}/users-app/candidate/${candidateID}/education`, education);
  }

  UpdateLanguageSkills(candidateID: number, body: any) {
    return this.http.post<any>(`${environment.url_api}/candidate/${candidateID}/add-ability-language`, body);
  }

}
