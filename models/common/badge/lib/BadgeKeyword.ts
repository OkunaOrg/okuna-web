export class BadgeKeyword {
    static angel = new BadgeKeyword('ANGEL');
    static verified = new BadgeKeyword('VERIFIED');
    static founder = new BadgeKeyword('FOUNDER');
    static golden_founder = new BadgeKeyword('GOLDEN_FOUNDER');
    static diamond_founder = new BadgeKeyword('DIAMOND_FOUNDER');
    static super_founder = new BadgeKeyword('SUPER_FOUNDER');

    static _values: BadgeKeyword[] = [
        BadgeKeyword.angel,
        BadgeKeyword.verified,
        BadgeKeyword.founder,
        BadgeKeyword.golden_founder,
        BadgeKeyword.diamond_founder,
        BadgeKeyword.super_founder,
    ];

    static values() {
        return BadgeKeyword._values.slice(0);
    }

    static parse(val: string): BadgeKeyword | undefined {
        let badgeKeyword;

        for (let i = 0; i < BadgeKeyword._values.length; i++) {
            const value = BadgeKeyword._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported badge keyword');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}