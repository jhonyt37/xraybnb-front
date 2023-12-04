import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceEvaluationService {

  constructor(private http: HttpClient) {
  }

  getDimensions() {
    return this.http.get<any>(`${environment.url_api}/evaluations-app/dimension`);
  }

  registerPerformanceEval(performanceEval: any) {
    return this.http.post<any>(`${environment.url_api}/evaluations-app/performance-evaluation`, performanceEval);
  }

}
