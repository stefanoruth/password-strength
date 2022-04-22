function ruleMin(value: string, minLength: number): boolean {
    return value.length >= minLength
}

function ruleMax(value: string, maxLength: number): boolean {
    return value.length <= maxLength
}

function ruleLowercase(value: string): boolean {
    return new RegExp('[a-z]').test(value)
}

function ruleUppercase(value: string): boolean {
    return new RegExp('[A-Z]').test(value)
}

function ruleNumbers(value: string): boolean {
    return new RegExp('[0-9]').test(value)
}

function ruleSymbols(value: string): boolean {
    return new RegExp('[!"#$%&\'()*+,-./:;<=>?@[\\\\\\]^_`{|}~]').test(value)
}

export enum PasswordStrengthErrorCodes {
    MIN = 'MIN',
    MAX = 'MAX',
    LOWERCASE = 'LOWERCASE',
    UPPERCASE = 'UPPERCASE',
    NUMBERS = 'NUMBERS',
    SYMBOLS = 'SYMBOLS',
}

export interface Rules {
    min: number
    max: number
    lowercase: boolean
    uppercase: boolean
    numbers: boolean
    symbols: boolean
}

export function passwordStrength(
    password: string,
    rules: Rules
): { valid: boolean; errors: PasswordStrengthErrorCodes[] } {
    const errors: PasswordStrengthErrorCodes[] = []

    if (!ruleMin(password, rules.min)) {
        errors.push(PasswordStrengthErrorCodes.MIN)
    }

    if (!ruleMax(password, rules.max)) {
        errors.push(PasswordStrengthErrorCodes.MAX)
    }

    if (rules.lowercase && !ruleLowercase(password)) {
        errors.push(PasswordStrengthErrorCodes.LOWERCASE)
    }

    if (rules.uppercase && !ruleUppercase(password)) {
        errors.push(PasswordStrengthErrorCodes.UPPERCASE)
    }

    if (rules.numbers && !ruleNumbers(password)) {
        errors.push(PasswordStrengthErrorCodes.NUMBERS)
    }

    if (rules.symbols && !ruleSymbols(password)) {
        errors.push(PasswordStrengthErrorCodes.SYMBOLS)
    }

    return { valid: errors.length === 0, errors }
}
