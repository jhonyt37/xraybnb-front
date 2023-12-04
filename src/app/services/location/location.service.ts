import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {
    }

    getCountries() {
        return this.http.get<any>(`${environment.url_api}/commons/countries`);
    }

    getRegions(countryId: number) {
        return this.http.get<any>(`${environment.url_api}/commons/regions/country/${countryId}`);
    }

    getCity(regionId: number) {
        return this.http.get<any>(`${environment.url_api}/commons/cities/region/${regionId}`);
    }

}
