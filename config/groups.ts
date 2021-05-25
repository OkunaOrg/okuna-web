import { maxLength, url } from 'vuelidate/lib/validators';


export interface IGroupTypeConfig {
    key: string,
    fields: Array<string>
}

export interface IGroupTypeField {
    key: string,
    type: 'input-text' | 'input-url' | 'textarea',
    validations?: any,
    validationParameters?: any 
}

export const GROUP_TYPES: IGroupTypeConfig[] = [
    { key: 'city', fields: ['about_us', 'website', 'population', 'area', 'energy_demand'] },
    { key: 'company', fields: ['about_us', 'website', 'industry', 'employee', 'location'] },
    { key: 'university', fields: ['about_us', 'website', 'institution', 'department'] },
    { key: 'institution', fields: ['about_us', 'website'] }
]

export const GROUP_TYPES_FIELDS: IGroupTypeField[] = [
    {
        key: 'about_us',
        type: 'textarea',
        validations: {
            maxLength: maxLength(500)
        }
    },
    {
        key: 'website',
        type: 'input-text',
        validations: {
            url,
            maxLength: maxLength(200)
        }
    },
    {
        key: 'population',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'area',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'energy_demand',
        type: 'input-text',
        validations: {
            maxLength: maxLength(500)
        }
    },
    {
        key: 'industry',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'employee',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'location',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'institution',
        type: 'input-text',
        validations: {
            maxLength: maxLength(100)
        }
    },
    {
        key: 'department',
        type: 'textarea',
        validations: {
            maxLength: maxLength(500)
        }
    },
];
