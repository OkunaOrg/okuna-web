import { maxLength } from 'vuelidate/lib/validators';

export const communityUserAdjectiveMaxLength = 16;

export const communityUserAdjectiveValidators = {
    maxLength: maxLength(communityUserAdjectiveMaxLength)
};
