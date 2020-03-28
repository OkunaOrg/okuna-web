import { required, maxLength } from 'vuelidate/lib/validators';

export const postCommentMaxLength = 5000;

export const postCommentValidators = {
    required,
    maxLength: maxLength(postCommentMaxLength),
};

