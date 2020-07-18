import { required, maxLength, minLength } from 'vuelidate/lib/validators';

export const userUsernameMaxLength = 30;

export const userUsernameMinLength = 1;


export const usernameValidators = {
    required,
    maxLength: maxLength(userUsernameMaxLength),
    minLength: minLength(userUsernameMinLength),
};

