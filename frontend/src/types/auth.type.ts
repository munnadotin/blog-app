export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

export interface LoginResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    accessToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}
