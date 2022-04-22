# Password Strength

Easy to use password strength validator.

[![Build](https://github.com/stefanoruth/password-strength/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/stefanoruth/password-strength/actions/workflows/build.yml)

## Installation

```
yarn add @stefanoruth/password-strength
```

## Usage

```ts
import { passwordStrength } from '@stefanoruth/password-strength'

const validation = passwordStrength('input-password', {
    min: 8,
    max: 40,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
})

if (validation.valid) {
    // Password meets all criteria.
} else {
    // Password failed to meet all criteria.
    // See validation.errors for missing criterias.
}
```
