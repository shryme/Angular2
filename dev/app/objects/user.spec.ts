import {User} from './user';

describe('User', () => {
	it('has id given in the constructor', () => {
		let user = new User(1, 'Super Cat', 'email', 'pass');
		expect(user.id).toEqual(1);
	});
	it('has name given in the constructor', () => {
		let user = new User(1, 'Super Cat', 'email', 'pass');
		expect(user.username).toEqual('Super Cat');
	});
	it('has email given in the constructor', () => {
		let user = new User(1, 'Super Cat', 'email', 'pass');
		expect(user.email).toEqual('email');
	});
	it('has password given in the constructor', () => {
		let user = new User(1, 'Super Cat', 'email', 'pass');
		expect(user.password).toEqual('pass');
	});

});
