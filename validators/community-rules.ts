import { maxLength } from 'vuelidate/lib/validators';

export const communityRulesMaxLength = 1500;

export const communityRulesValidators = {
    maxLength: maxLength(communityRulesMaxLength)
};
