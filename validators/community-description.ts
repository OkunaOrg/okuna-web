import { maxLength } from 'vuelidate/lib/validators';

export const communityDescriptionMaxLength = 500;

export const communityDescriptionValidators = {
    maxLength: maxLength(communityDescriptionMaxLength)
};
