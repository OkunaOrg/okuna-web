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
    { key: 'C', fields: ['about_us', 'website', 'population', 'area', 'energy_demand'] },
    { key: 'Q', fields: ['about_us', 'website', 'industry', 'employee', 'location'] },
    { key: 'U', fields: ['about_us', 'website', 'institution', 'departments'] },
    { key: 'I', fields: ['about_us', 'website'] }
]

export const GROUP_TYPES_FIELDS: IGroupTypeField[] = [
    {
        key: 'about_us',
        type: 'textarea',
        validations: {
            maxLength: maxLength(2000)
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
            maxLength: maxLength(64)
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
            maxLength: maxLength(40)
        }
    },
    {
        key: 'industry',
        type: 'input-text',
        validations: {
            maxLength: maxLength(64)
        }
    },
    {
        key: 'employee',
        type: 'input-text',
        validations: {
            maxLength: maxLength(32)
        }
    },
    {
        key: 'location',
        type: 'input-text',
        validations: {
            maxLength: maxLength(64)
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
        key: 'departments',
        type: 'textarea',
        validations: {
            maxLength: maxLength(2000)
        }
    },
];
