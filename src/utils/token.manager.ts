// Token management utility to avoid circular dependencies
class TokenManager {
    private static token: string | null = null;

    static setToken(token: string | null): void {
        this.token = token;
    }

    static getToken(): string | null {
        return this.token;
    }

    static clearToken(): void {
        this.token = null;
    }
}

export default TokenManager;
