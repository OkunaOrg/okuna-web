export class UserVisibility {
    static public = new UserVisibility('P');
    static okuna = new UserVisibility('O');
    static private = new UserVisibility('T');

    static _values: UserVisibility[] = [
        UserVisibility.private,
        UserVisibility.public,
        UserVisibility.okuna,
    ];

    static values() {
        return UserVisibility._values.slice(0);
    }

    static parse(val: string): UserVisibility | undefined {
        let badgeKeyword;

        for (let i = 0; i < UserVisibility._values.length; i++) {
            const value = UserVisibility._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error(`Unsupported userVisibility type ${val}`);
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}