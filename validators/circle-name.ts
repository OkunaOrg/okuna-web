import { required, maxLength } from 'vuelidate/lib/validators';

export const circleNameMaxLength = 100;

export const circleNameValidators = {
    required,
    maxLength: maxLength(circleNameMaxLength)
};
