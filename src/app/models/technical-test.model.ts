export interface TechnicalTestModel {
    name: string,
    id: number,
}

export interface StateTechnicalTestModel {
    state: string,
    value: string,
}

export interface ResultTechnicalTestModel {
    state: string;
    user_id: number;
    observations: string;
    qualify: number;
    qualifying_user_id: number;
    test_id: number;
}