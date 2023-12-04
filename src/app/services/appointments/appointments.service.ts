import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAppointmentsUser(userID: number) {
    return this.http.get<any>(`${environment.url_api}/selection-app/appointments/user/${userID}`);
  }

}
