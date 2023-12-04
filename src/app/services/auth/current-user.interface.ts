export class CurrentUser {
    public access_token?: string;
    public expires_in?: number;
    public token_type?: string;
    public id?: number;
    public names?: string;
    public surnames?: string;
    public email?: string;
    public authId?: string;
    public picture?: string;
    public rol?: string;
    public company_id?: string;
}

export class TokenInfo {
    public iss?: string;
    public sub?: string;
    public aud?: string;
    public iat?: number;
    public exp?: number;
    public azp?: string;
    public gty?: string;
    public permissions?: string[];
}

