import { required, maxLength, minLength } from 'vuelidate/lib/validators';

export const communityTitleMaxLength = 32;
export const communityTitleMinLength = 1;

export const communityTitleValidators = {
    required,
    maxLength: maxLength(communityTitleMaxLength),
    minLength: minLength(communityTitleMinLength)
};
