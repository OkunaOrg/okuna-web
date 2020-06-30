import { maxLength} from 'vuelidate/lib/validators';


export const moderationReportDescriptionValidators = {
  description: maxLength(1000),
};

