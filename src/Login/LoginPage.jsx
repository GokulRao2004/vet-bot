import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import { getImageUrl } from '../utils';
import { loginRequest, loginSuccess, loginFailure, logout, checkPhoneNumber, checkPhoneNumberFailure, checkPhoneNumberSuccess, checkPasswordExists } from '../redux/reducers/loginReducer';
import axios from 'axios';
import crypto from 'crypto'


export const LoginPage = () => {
  const secreatKey = "Buppi"
  const abtText = " Say hello to streamlined practice management, enhanced patient care, and simplified client interactions. With cutting-edge AI technology, Vet-Bot offers seamless appointment scheduling, medical record management, and instant diagnostic support. Elevate your practice with personalized treatment recommendations and revolutionize veterinary care with Vet-Bot.";

  //Redux Variables
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.login.isLoading) || useSelector(state => state.login.isWaitingForPhoneToLoad);
  const error = useSelector(state => state.login.error);
  const phoneExists = useSelector(state => state.login.isPhoneNumberExists);
  const passExists = useSelector(state => state.login.isPasswordExists);
  const phoneCheckError = useSelector(state => state.login.errorPhoneNumberCheck);
  const isNewUser = useSelector(state => state.login.newUser);

  //useState Variables
  const [credentials, setCredentials] = useState({ phone: '', password: '' , createPassword: '' , confirmPassword: ''});
  const [userData,setUserData] = useState({phone:'', password:''})
  const [showPassword, setShowPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isPasswordMatch,setIsPasswordMatch] = useState(true);
  const [noData,setNoData] = useState('');
  const [otp, setOtp] = useState('');
  const [otpLengthError,setOtpLengthError] = useState('');
  const [otpError,setOtpError] = useState('');
  const [otpExists, setOtpExists] = useState('');
  const initialRender = useRef(true);
  const otplength = useRef(otp.length);
  const [loginDisabled,setloginDisabled] = useState(false)

  //Functions

  const generateSignature = (data) => {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(data);
    return hmac.digest('hex');
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };  
  
  const toggleCreatePasswordVisibility = () => {
    setShowCreatePassword(!showCreatePassword);
  };  
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      dispatch(checkPhoneNumber(credentials.username));

      try {
        const response = await axios.post('http://localhost:3000/checkPhoneNumber', { phoneNumber: credentials.phone });
        if (response.data.exists) {
          dispatch(checkPhoneNumberSuccess(true));
          if (response.data.pass) {
            dispatch(checkPasswordExists(true));
          } else {
            dispatch(checkPasswordExists(false));
          }
        } else {
          dispatch(checkPhoneNumberSuccess(false));
        }
      } catch (error) {
        dispatch(checkPhoneNumberFailure(error.message));
      }
    }
  };

  const checkOTP =  () =>{
    if(otp.length !== 6){
      setOtpLengthError("Please enter full 6 digits");
    }
    else{
      setOtpLengthError('');
    }
    

   
  }

  const handleOTPChange = (event) => {
    const { value } = event.target;
    if (/^\d{0,6}$/.test(value)) {
        setOtp(value);
    }
};

useEffect(() => {
    if (otp.length === 6) {
        sendOtpToBackend(otp);
    }
}, [otp]);


  const sendOtpToBackend = async() => {
    if(otp.length === 6){
        try{
          const response = await axios.post('http://localhost:3000/checkOTP', {OTP: otp});
          console.log(response.data)
          if(response.data.OTPexists){
            console.log('in IF')
            setOtpExists(response.data.OTPexists)
            setOtpError('')
          }
          else{
            setOtpExists(false)
            setOtpError('OTP wrong')
          }
          console.log(otpExists)
          
        }
        catch(e){
          setOtpError(e)
        }
      
    }
    else{
      setOtpError('')
    }
  }
  //useEffect Functions
  useEffect(()=>{

  if(!passExists){ 
    if(credentials.createPassword === credentials.confirmPassword){
    setIsPasswordMatch(true)
    setUserData({...userData, password:credentials.createPassword})
    }
    else{
      setIsPasswordMatch(false)
    }

}
 
  },[credentials.createPassword,credentials.confirmPassword])



  useEffect(() => {

    if (!initialRender.current) {
      if (!phoneNumberError && !phoneExists && !isLoading && !phoneCheckError) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      initialRender.current = false;
    }
  }, [phoneExists,phoneNumberError,isLoading]);


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
        <button onClick={handleOTPChange}>click</button>
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
          {phoneCheckError && <div className={styles.error}>Network issue please try again after sometime.</div> }
          {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}
          {noData && <div className={styles.error}>Phone number does not exists please check the phone number you have entered or contact your veterinarian. </div> }
          {phoneExists && !passExists ? (
            <>
              <div className={styles.inputWrapper}>
              <input
                  type='text'
                  className={styles.password}
                  placeholder=''
                  name="OTP"
                  value={otp}
                  onChange={handleOTPChange}
                  onBlur={checkOTP}
                />
                <label htmlFor="OTP" className={styles.label}>
                  Enter the 6-digit OTP
                </label>
              </div>
              {otpError && !otpLengthError && <div className={styles.error}>{otpError}</div>  }
              {otpLengthError && <div className={styles.error}>{otpLengthError}</div>  }
              <div className={styles.inputWrapper}>
                <input
                  type={showCreatePassword ? 'text' : 'password'}
                  className={styles.password}
                  placeholder=''
                  name="createPassword"
                  value={credentials.createPassword}
                  onChange={handleChangePassword}
                />
                <label htmlFor="createPassword" className={styles.label}>
                  Create Password
                </label>
                <button className={styles.passwordToggle}
                type="button"
                onClick={toggleCreatePasswordVisibility}
              >
                <img src={showCreatePassword ? getImageUrl('Password/view.png') : getImageUrl('Password/hide.png')} alt={showCreatePassword ? 'Hide Password' : 'Show Password'} />
              </button>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={styles.password}
                  placeholder=''
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleChangePassword}
                />
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password 
                </label>
                <button className={styles.passwordToggle}
                type="button"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img src={showConfirmPassword ? getImageUrl('Password/view.png') : getImageUrl('Password/hide.png')} alt={showConfirmPassword ? 'Hide Password' : 'Show Password'} />
              </button>
              </div>
            </>
          ) : (
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
          )}

          {!passExists && !isPasswordMatch ?
          (<>

            <div className={styles.error}>Passwords do not match</div>

          </>)
          :
          (<>



          </>)}

          <div className={styles.buttons}>
            <div className={styles.remMe}>
              <input type='checkbox' checked={rememberMe} onChange={toggleRememberMe} />
              <p>Remember Me</p>
            </div>
            <div className={styles.loginBtn}>
              <button disabled={loginDisabled} className={loginDisabled ? styles.disabled : styles.enabled}>
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
