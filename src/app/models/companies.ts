export interface CompanyModel {
    companyName: String;
    uniqueIdentification: String;
    businessActivity: String;
    companyEmail: String;
    representativeName: String;
    representativeEmail: String;
    representativePassword: String;
    phoneNumber: String;
    country: String;
    region: String;
    city: String;
    address: String;
}

export interface CountriesModel {
    name: string, 
    id: number,
    code: string
  }

export interface RegionModel {
  name: string, 
  id: number,
  code: string
}

export interface CityModel {
  name: string, 
  id: number,
  code: string
}