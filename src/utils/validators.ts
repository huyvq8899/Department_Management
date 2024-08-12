export function validateEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validatePassword(password: string): boolean {
    const hasMinimumLength = password.length > 8;
    const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password); // Ký tự không phải chữ hoặc số
    const hasUppercase = /[A-Z]/.test(password); // Chữ cái viết hoa

    return hasMinimumLength && hasLettersAndNumbers && hasNonAlphanumeric && hasUppercase;
}