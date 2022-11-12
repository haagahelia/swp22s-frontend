/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// React core.
import React from 'react';
import ReactDOM from 'react-dom';

// Firebase.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
//import styles from './app.css'; // This uses CSS modules.
//import './firebaseui-styling.global.css'; // Import globally.

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result.sdkConfig;

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);

/**
 * The Splash Page containing the login UI.
 */
class SignInScreen extends React.Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    isSignedIn: undefined,
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({isSignedIn: !!user});
    });
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className='SignInScreen'>
       
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
                <div>
                     <h1>Please SignIn !</h1>
            <StyledFirebaseAuth  uiConfig={this.uiConfig}
                        firebaseAuth={firebaseApp.auth()} />
                   
          </div>
        }
        {this.state.isSignedIn &&
                <div >
                    <div>
                        Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
                    </div>
           
                   <div><button onClick={() => firebaseApp.auth().signOut()}>Sign-out</button></div>
                    
          </div>
        }
      </div>
    );
  }
}

export default SignInScreen;

