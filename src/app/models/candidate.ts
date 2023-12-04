import { AbilityModel, EducationTypeModel, ExperienceModel, LanguageModel } from "./commons";

export interface Candidate {
    id: number;
    names: String;
    surnames: String;
    email: String;
    authId: String;
    picture: String;
    rol: String;
    company_id: number;
    identification: String;
    nameIdentification: String;
    typeIdentificationId: number;
    phone: String;
    experienceYears: number;
    skills: AbilityModel[];
    languages: LanguageModel[];
    education: EducationTypeModel[];
    experiences: ExperienceModel[];
    fullName?: String;
}