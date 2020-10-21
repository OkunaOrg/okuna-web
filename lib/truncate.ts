export default function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }

    return `${str.substr(0, maxLength - 3)}...`;
}
