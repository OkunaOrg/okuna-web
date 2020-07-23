import { required, maxLength, minLength } from 'vuelidate/lib/validators';


export const userNameMaxLength = 192;
export const userNameMinLength = 1;

export const userNameValidators = {
    required,
    minLength: minLength(userNameMinLength),
    maxLength: maxLength(userNameMaxLength),
};

