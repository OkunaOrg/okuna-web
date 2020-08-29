import { maxLength } from 'vuelidate/lib/validators';

export const postMaxLength = 5000;

export const postValidators = {
    maxLength: maxLength(postMaxLength),
};

