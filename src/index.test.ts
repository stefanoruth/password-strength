import { expect } from 'chai'
import { passwordStrength, PasswordStrengthErrorCodes, Rules } from './index'

describe('Password Strength', () => {
    describe('Min', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: false,
            uppercase: false,
            numbers: false,
            symbols: false,
        }

        it('Invalid', () => {
            expect(passwordStrength('value', { ...base, min: 8 })).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.MIN],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('long-password', { ...base, min: 8 })).to.eql({ valid: true, errors: [] })
        })
    })

    describe('Max', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: false,
            uppercase: false,
            numbers: false,
            symbols: false,
        }

        it('Invalid', () => {
            expect(passwordStrength('value', { ...base, max: 4 })).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.MAX],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('value', { ...base, max: 5 })).to.eql({ valid: true, errors: [] })
        })
    })

    describe('Lowercase', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: true,
            uppercase: false,
            numbers: false,
            symbols: false,
        }

        it('Invalid', () => {
            expect(passwordStrength('ALL_UPPERCASE_LETTERS', base)).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.LOWERCASE],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('lowercase letter', base)).to.eql({ valid: true, errors: [] })
        })
    })

    describe('Uppercase', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: false,
            uppercase: true,
            numbers: false,
            symbols: false,
        }

        it('Invalid', () => {
            expect(passwordStrength('no_uppercase_letters', base)).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.UPPERCASE],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('a_single_uppercase_Letter', base)).to.eql({ valid: true, errors: [] })
        })
    })

    describe('Numbers', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: false,
            uppercase: false,
            numbers: true,
            symbols: false,
        }

        it('Invalid', () => {
            expect(passwordStrength('does not contain numbeers', base)).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.NUMBERS],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('contains 5 numbers', base)).to.eql({ valid: true, errors: [] })
        })
    })

    describe('Symbols', () => {
        const base: Rules = {
            min: 0,
            max: 25,
            lowercase: false,
            uppercase: false,
            numbers: false,
            symbols: true,
        }

        it('Invalid', () => {
            expect(passwordStrength('does not contain symbols', base)).to.eql({
                valid: false,
                errors: [PasswordStrengthErrorCodes.SYMBOLS],
            })
        })

        it('Valid', () => {
            expect(passwordStrength('contains symbols %!"#', base)).to.eql({ valid: true, errors: [] })
        })
    })
})
