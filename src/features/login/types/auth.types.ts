
export interface BaseUser {
    id: string;
    name: string;
    lastName: string;
    type: 'resident' | 'employee';
    permissions: string[];
}

export interface ResidentUser extends BaseUser {
    type: 'resident';
    email: string;
    document: string;
    residentType: string;
    residentTypeLabel: string;
}

export interface EmployeeUser extends BaseUser {
    type: 'employee';
    username: string;
    role: string;
    roleLabel: string;
}

export type User = ResidentUser | EmployeeUser;

export interface LoginRequest {
    // Para residente suele ser identifier o email, para empleado username
    identifierOrUsername: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}