import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProjectModel} from "../../models/projects";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
    }

    registerProject(body: ProjectModel) {
        return this.http.post<any>(`${environment.url_api}/projects-app/projects`, body);
    }

    getProjectsByCompany(companyId: number) {
        return this.http.get<any>(`${environment.url_api}/projects-app/projects/${companyId}`);
    }

}
