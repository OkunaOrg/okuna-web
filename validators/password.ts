import {required, maxLength, minLength} from 'vuelidate/lib/validators';


export const passwordValidators = {
  required,
  minLength: minLength(10),
  maxLength: maxLength(128),
};

