import { LOGIN, LOGOUT, login, logout } from '../../actions/authedUser';

describe('authedUser actions', () => {
  describe('login', () => {
    it('should create an action to login a user', () => {
      const user = { id: '1', name: 'John Doe' };
      const expectedAction = {
        type: LOGIN,
        user,
      };
      expect(login(user)).toEqual(expectedAction);
    });
  });

  describe('logout', () => {
    it('should create an action to logout a user', () => {
      const expectedAction = {
        type: LOGOUT,
      };
      expect(logout()).toEqual(expectedAction);
    });
  });
});
