
let nextId = 30;

export class User {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public password: string
    ) {
        this.id = id || nextId++;
    }
    clone() { return User.clone(this); }
    static clone = (u: any) => new User(u.id, u.username, u.email, u.password);
    static setNextId(next: number) { nextId = next; }
}
