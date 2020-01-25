import {required, maxLength} from 'vuelidate/lib/validators';


export const usernameValidators = {
  required,
  maxLength: maxLength(128),
};

