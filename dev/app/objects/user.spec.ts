import {User} from './user';

describe('User', () => {
	it('has id given in the constructor', () => {
		let user = new User('Super Cat', 'email', 'pass', 1);
		expect(user.id).toEqual(1);
	});
	it('has name given in the constructor', () => {
		let user = new User('Super Cat', 'email', 'pass', 1);
		expect(user.username).toEqual('Super Cat');
	});
	it('has email given in the constructor', () => {
		let user = new User('Super Cat', 'email', 'pass', 1);
		expect(user.email).toEqual('email');
	});
	it('has password given in the constructor', () => {
		let user = new User('Super Cat', 'email', 'pass', 1);
		expect(user.password).toEqual('pass');
	});

	it('has id initiated at 0 in the constructor', () => {
		let user = new User('Super Cat', 'email', 'pass');
		expect(user.id).toEqual(0);
	});

	it('has id changed to 3 when setNextId is called with 3', () => {
		User.setNextId(3);
		let user = new User('Super Cat', 'email', 'pass');
		expect(user.id).toEqual(3);
	});

});
