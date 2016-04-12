
let nextId = 0;

export class User {
	constructor(
		public username: string,
		public email: string,
		public id?: number
	) {
		this.id = id || nextId++;
	}
	clone() { return User.clone(this); }
	static clone = (u: any) => new User(u.username, u.email, u.id);
	static setNextId(next: number) { nextId = next; }
}
