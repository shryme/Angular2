import {User} from './user';

describe('User', () => {
	it('has id given in the constructor', () => {
		let user = new User('Super Cat', 'email', 1);
		expect(user.id).toEqual(1);
	});
	it('has name given in the constructor', () => {
		let user = new User('Super Cat', 'email', 1);
		expect(user.username).toEqual('Super Cat');
	});
	it('has email given in the constructor', () => {
		let user = new User('Super Cat', 'email', 1);
		expect(user.email).toEqual('email');
	});

	it('has id initiated at 0 in the constructor', () => {
		let user = new User('Super Cat', 'email');
		expect(user.id).toEqual(0);
	});

	it('has id changed to 3 when setNextId is called with 3', () => {
		User.setNextId(3);
		let user = new User('Super Cat', 'email');
		expect(user.id).toEqual(3);
	});

	it('has a copy of itself when clone is called', () => {
		let user1 = new User('Super Cat', 'email');
		let user2 = User.clone(user1);
		delete user1.id;
		delete user2.id;
		expect(user1).toEqual(user2);
	});

});
