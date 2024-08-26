import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { whatsappLogin } from '../../../redux/reducers/loginReducer'
import styles from "./EmbeddedSignup.module.css"
import endpoints from '../../../APIendpoints';
export const EmbeddedSignUp = () => {
  const dispatch = useDispatch()
  const [code,setCode] = useState()
  const handleSignup = () => {
    dispatch(whatsappLogin())
  }

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axios.post(endpoints.embeddedSignup, {
        code: code
      });

      if (response.status === 200 && response.data.success) {
        dispatch(whatsappLogin());
      } else {
        console.error('Error: Backend did not return success');
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };


  const sessionInfoListener = (event) => {
    console.log("IN session info");
    console.log(event)
    if (event.origin !== "https://www.facebook.com") return;
    try {
        console.log(event)
        console.log("before parsing")
        const data = JSON.parse(event.data);
        console.log("after parsing")
        console.log(data)
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
            // if user finishes the Embedded Signup flow
            if (data.event === 'FINISH') {
                const { phone_number_id, waba_id } = data.data;
                console.log("phone_number_id");
                console.log(phone_number_id);
                console.log("phone_number_id");
            }
            // if user cancels the Embedded Signup flow
            else {
                const { current_step } = data.data;
                console.log("current_step")
                console.log(current_step)
                console.log("current_step")
            }
        }
    } catch (error) {
        // Don’t parse info that’s not a JSON
        console.log('Non JSON Response', event);
        console.log('error', error);
    }
};

useEffect(() => {
    window.addEventListener("message", sessionInfoListener);
    window.fbAsyncInit = function () {
        console.log("in the usereffect")
        console.log(FB)
        console.log("in the usereffect")
        FB.init({
            appId: 383782301101923,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v18.0'
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // Perform initialization here

}, []);

const handleClick = () => {
    console.log('Button clicked!');
    console.log(FB);
    FB.login(function (response) {
        console.log("authResponse hello");
        console.log(response);
        console.log("authResponse");
        if (response.authResponse) {
            setCode(response.authResponse.code);
            sendCodeToBackend(code);
            console.log("accessToken");
            console.log(accessToken);
            console.log("accessToken");
            // Use this token to call the debug_token API and get the shared WABA's ID
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        config_id: 825508499388287, // configuration ID obtained in the previous step goes here
        response_type: "code",     // must be set to 'code' for System User access token
        override_default_response_type: true,
        scope: "whatsapp_business_management, whatsapp_business_messaging",
        extras: {
            sessionInfoVersion: 3,
            feature: "whatsapp_embedded_signup"
        }
    });

   
};



  return (
    <div className={styles.container}>
      <p>Looks like you haven't subcribed to us yet. Please click on the Embedded SignUp button below to subscribe to our services.</p>
      <button style={
                    {backgroundColor: '#1877f2',
                border: '0',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: 'bold',
                height: '40px',
                padding: '0 24px',
                margin: '10px'}} onClick={handleClick}>
                Embedded Signup
            </button>
            <button onClick={handleSignup}>CLICK</button>
    </div>
  )
}
