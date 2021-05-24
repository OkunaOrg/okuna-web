import { maxLength } from 'vuelidate/lib/validators';


export const inputTypesConfiguration = [
    {
        key: 'about_us',
        inputType: 'textarea',
        validations: {
            maxLength : maxLength(500)
        },
        validationParameters: {
            maxLength: 500
        }
    },
    {
        key: 'website',
        inputType: 'input',
        validations: {
            maxLength : maxLength(200)
        },
        validationParameters: {
            maxLength: 200
        }
    },
    {
        key: 'population',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'area',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'energy_demand',
        inputType: 'textarea',
        validations: {
            maxLength : maxLength(500)
        },
        validationParameters: {
            maxLength: 500
        }
    },
    {
        key: 'industry',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'employee',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'location',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'institution',
        inputType: 'input',
        validations: {
            maxLength : maxLength(100)
        },
        validationParameters: {
            maxLength: 100
        }
    },
    {
        key: 'department',
        inputType: 'textarea',
        validations: {
            maxLength : maxLength(500)
        },
        validationParameters: {
            maxLength: 500
        }
    },
];