import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import { getImageUrl } from '../utils';
import { loginRequest, loginSuccess, loginFailure, logout,addUserId,addUserName } from '../redux/reducers/loginReducer';
import axios from 'axios';
import endpoints from '../APIendpoints';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export const LoginPage = () => {
  const abtText = " Say hello to streamlined practice management, enhanced patient care, and simplified client interactions. With cutting-edge AI technology, Vet-Bot offers seamless appointment scheduling, medical record management, and instant diagnostic support. Elevate your practice with personalized treatment recommendations and revolutionize veterinary care with Vet-Bot.";

  //Redux Variables
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.login.isLoading);
  const error = useSelector(state => state.login.error);
  const navigate = useNavigate()
  //useState Variables
  const [credentials, setCredentials] = useState({ phone: '', password: '' });
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [loginDisabled, setloginDisabled] = useState(false)

  //Functions

  function getUserIdFromJWT(token) {
    try {
      // Decode the JWT token to get the payload
      const decodedToken = jwtDecode(token);


      // Extract the user ID from the payload
      const userId = decodedToken.user_id; // Adjust this based on your JWT structure

      return userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  function getUserNameFromJWT(token) {
    try {
      // Decode the JWT token to get the payload
      const decodedToken = jwtDecode(token);
      console.log('decodedToken: ', decodedToken);


      // Extract the user name from the payload
      const userName = decodedToken.user_name; // Adjust this based on your JWT structure

      return userName;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    setCredentials({ ...credentials, [name]: sanitizedValue });
  };

  const handleBlur = async () => {

    if (isNaN(credentials.phone) || credentials.phone.length !== 10) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify(credentials);
    dispatch(loginRequest());
    try {
      const response = await axios.post(endpoints.login, data,{
        headers : {
          "Content-Type" : "application/json"
        }
      }
      );
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(getUserIdFromJWT(response.data.token)));
        dispatch(addUserName(getUserNameFromJWT(response.data.token)))
        navigate("/");
      } else {
        console.log(response.status)
        dispatch(loginFailure('Invalid credentials'));
      }
    } catch (err) {
      console.log('err: ', err);
      if (err.response == 401) { dispatch(loginFailure('Invalid credentials')); }
      else { dispatch(loginFailure('An error occurred! Please try again after sometime')); }
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <img className={styles.logo} src={getImageUrl('LOGO/logo1.png')} alt="Logo" />
        <div className={styles.articleBody}>
          <h1>Welcome to Vet-Bot – Your Veterinary Practice's Ultimate Ally!</h1>
          {abtText}
        </div>
      </div>

      <div className={styles.fields}>
        <div className={styles.logIn}>
          <h1 className={styles.signIn}>Log In</h1>
        </div>

        <form>
          <div className={styles.inputWrapper}>
            <input
              type='number'
              className={styles.userID}
              placeholder=''
              name='phone'
              value={credentials.phone}
              onChange={handleChangePhone}
              onBlur={handleBlur}
              max={9999999999}
            />
            <label htmlFor="userID" className={styles.label} >
              Phone Number
            </label>
          </div>
          {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}



          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.password}
              placeholder=''
              name="password"
              value={credentials.password}
              onChange={handleChangePassword}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <button className={styles.passwordToggle}
              type="button"
              onClick={togglePasswordVisibility}
            >
              <img src={showPassword ? getImageUrl('Password/view.png') : getImageUrl('Password/hide.png')} alt={showPassword ? 'Hide Password' : 'Show Password'} />
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}



          <div className={styles.buttons}>
            <div className={styles.remMe}>
              <input type='checkbox' checked={rememberMe} onChange={toggleRememberMe} />
              <p>Remember Me</p>
            </div>
            <div className={styles.loginBtn}>
              <button disabled={loginDisabled} className={loginDisabled ? styles.disabled : styles.enabled} onClick={handleSubmit}>
                {isLoading ? (
                  <div className={styles.loadingCircle}>

                  </div>
                ) : (
                  'Login'
                )}
              </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
