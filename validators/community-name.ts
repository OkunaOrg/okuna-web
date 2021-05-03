import { required, maxLength, minLength } from 'vuelidate/lib/validators';

export const communityNameMaxLength = 32;
export const communityNameMinLength = 1;

export const communityNameValidators = {
    required,
    maxLength: maxLength(communityNameMaxLength),
    minLength: minLength(communityNameMinLength)
};
