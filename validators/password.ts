import { required, maxLength, minLength } from 'vuelidate/lib/validators';

export const passwordMinLength = 10;
export const passwordMaxLength = 128;

export const passwordValidators = {
    required,
    minLength: minLength(passwordMinLength),
    maxLength: maxLength(passwordMaxLength),
};

