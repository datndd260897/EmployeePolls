import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import UserLogin from '../../components/UserLogin';

const mockStore = configureStore([]);
const initialState = {
  users: {
    foo: {
      id: 'foo',
      password: 'abc123',
    },
  },
};

const store = mockStore(initialState);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: { from: '/' },
  }),
}));

jest.mock('../../actions/authedUser', () => ({
  login: jest.fn().mockReturnValue({ type: 'LOGIN' }),
}));

describe('UserLogin Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <UserLogin />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('shows an error message with invalid password', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserLogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'foo' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'abc321' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'UserLogin' }));

    expect(
      screen.getByText(
        'The username or password is incorrect. Please try again.'
      )
    ).toBeInTheDocument();
  });
});
