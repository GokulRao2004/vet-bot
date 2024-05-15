import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('LoginPage Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  });

  it('updates phone number input correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    expect(phoneNumberInput.value).toBe('1234567890');
  });

  it('displays error message for invalid phone number', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    fireEvent.change(phoneNumberInput, { target: { value: '123' } });
    fireEvent.blur(phoneNumberInput);
    await waitFor(() => expect(getByText('Please enter a valid 10-digit phone number.')).toBeInTheDocument());
  });

  it('handles password matching correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const createPasswordInput = getByPlaceholderText('Create Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.change(createPasswordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    expect(getByText('Passwords do not match')).not.toBeInTheDocument();
  });

  it('disables login button when loading', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const loginButton = getByText('Login');
    expect(loginButton).toBeDisabled();
  });

  it('displays error message for network issue', async () => {
    // Mock Redux state to simulate network issue
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      isLoading: true,
    }));
    const { getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    await waitFor(() => expect(getByText('Network issue please try again after sometime.')).toBeInTheDocument());
  });

  it('toggles password visibility correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const passwordInput = getByTestId('password-input');
    const toggleButton = getByTestId('password-toggle');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('handles remember me checkbox correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const rememberMeCheckbox = getByText('Remember Me');
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });

  it('displays create password input fields when phone number exists but password does not', async () => {
    // Mock Redux state to simulate phone number existence but no password
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      phoneExists: true,
      passExists: false,
    }));
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const createPasswordInput = getByPlaceholderText('Create Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    expect(createPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('does not display create password input fields when phone number does not exist', async () => {
    // Mock Redux state to simulate phone number non-existence
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      phoneExists: false,
      passExists: false,
    }));
    const { queryByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const createPasswordInput = queryByPlaceholderText('Create Password');
    const confirmPasswordInput = queryByPlaceholderText('Confirm Password');
    expect(createPasswordInput).toBeNull();
    expect(confirmPasswordInput).toBeNull();
  });

  it('disables login button when passwords do not match', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const createPasswordInput = getByPlaceholderText('Create Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.change(createPasswordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
    const loginButton = getByText('Login');
    expect(loginButton).toBeDisabled();
  });

  it('displays error message when OTP length is less than 6', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const otpInput = getByPlaceholderText('Enter the 6-digit OTP');
    fireEvent.change(otpInput, { target: { value: '12345' } });
    fireEvent.blur(otpInput);
    await waitFor(() => expect(getByText('Please enter full 6 digits')).toBeInTheDocument());
  });

  it('displays error message when OTP is incorrect', async () => {
    // Mock Redux state to simulate OTP being incorrect
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      otpExists: false,
    }));
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const otpInput = getByPlaceholderText('Enter the 6-digit OTP');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.blur(otpInput);
    await waitFor(() => expect(getByText('OTP wrong')).toBeInTheDocument());
  });

  it('enables login button when OTP is correct', async () => {
    // Mock Redux state to simulate OTP being correct
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      otpExists: true,
    }));
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const otpInput = getByPlaceholderText('Enter the 6-digit OTP');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.blur(otpInput);
    const loginButton = getByText('Login');
    expect(loginButton).toBeEnabled();
  });

  it('submits form with correct credentials', async () => {
    // Mock Redux state to simulate correct credentials
    jest.mock('../redux/selectors', () => ({
      ...jest.requireActual('../redux/selectors'),
      phoneExists: true,
      passExists: true,
    }));
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);
    // Add assertions for login success
  });


});
