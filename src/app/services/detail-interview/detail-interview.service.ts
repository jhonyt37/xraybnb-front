import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectModel} from "../../models/projects";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetailInterviewService {

  constructor(private http: HttpClient) {
  }

  getDetailInterview(idInterview: number, userId: any) {
    return this.http.get<any>(`${environment.url_api}/selection-app/interview-notes/appointment/${idInterview}/${userId}`);
  }
}
