import {required, maxLength, minLength} from 'vuelidate/lib/validators';


export const userNameValidators = {
  required,
  minLength: minLength(10),
  maxLength: maxLength(128),
};

