export class CommunityType {
    static private = new CommunityType('T');
    static public = new CommunityType('P');

    static _values: CommunityType[] = [
        CommunityType.private,
        CommunityType.public,
    ];

    static values() {
        return CommunityType._values.slice(0);
    }

    static parse(val: string): CommunityType | undefined {
        let badgeKeyword;

        for (let i = 0; i < CommunityType._values.length; i++) {
            const value = CommunityType._values[i];
            if (val == value.code) {
                badgeKeyword = value;
                break;
            }
        }

        if (!badgeKeyword) {
            console.error('Unsupported communityName type');
        }

        return badgeKeyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}
