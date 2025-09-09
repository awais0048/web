export class AuthHelper {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static userExists(users: { email: string; password: string }[], email: string): boolean {
        return users.some((user) => user.email === email);
    }
}
