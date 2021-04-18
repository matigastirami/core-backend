import * as bcrypt from 'bcrypt';

export default class Hash {
    static async hashString(string, saltOurRounds) {
        return bcrypt.hash(string, saltOurRounds);
    }

    static async compare(string, hash) {
        return bcrypt.compare(string, hash);
    }
}