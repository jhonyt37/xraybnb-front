import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = {
      email: username,
      password
    };
    return this.http.post<any>(`${environment.url_api}/login`, body);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  registerCandidate(candidate: any) {
    return this.http.post<any>(`${environment.url_api}/candidate`, candidate);
  }

}
