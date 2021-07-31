import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedAddToast = jest.fn();
jest.mock('../../contexts/toast', () => ({
  useToast: () => ({ addToast: mockedAddToast }),
}));

const mockedSignIn = jest.fn();
jest.mock('../../contexts/auth', () => ({
  useAuth: () => ({ signIn: mockedSignIn }),
}));

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockedHistoryPush }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByRole } = render(<SignIn />);
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const submitButton = getByRole('button');
    fireEvent.change(emailField, { target: { value: 'user@domain.com' } });
    fireEvent.change(passwordField, { target: { value: 'secretPassword' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByRole } = render(<SignIn />);
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const submitButton = getByRole('button');
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: 'secretPassword' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if sign in fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });
    const { getByPlaceholderText, getByRole } = render(<SignIn />);
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const submitButton = getByRole('button');
    fireEvent.change(emailField, { target: { value: 'user@domain.com' } });
    fireEvent.change(passwordField, { target: { value: 'secretPassword' } });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
