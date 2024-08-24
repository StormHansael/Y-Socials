import React, { useState } from "react";
import "./LoginRegister.scss"
import googleSingup from "../../Assests/Imgs/google_Singup.png"
import PocketBase from 'pocketbase';


export const pb = new PocketBase('https://y-socials.pockethost.io/');

export default function Registrer() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const data = {
        email,
        username,
        password,
        passwordConfirm: retypePassword,
      };
      const createdUser = await pb.collection('users').create(data);
      console.log('User created successfully', createdUser);
      // Here you can redirect the user or update your app's state
    } catch (error) {
      console.error('Registration failed', error);
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div>
          <div className="purpleBar"></div>
          <div className="whiteBox">
            <div>
              <p><span>Sign Up</span> to join your <span>Friends</span> on a <span>New</span> thrilling platform</p>
            </div>
            <div className="blackLine"></div>
            <div className="registrerFormContainer">
              <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Username:</label>
                <input 
                  type="text" 
                  name="username" 
                  required 
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Retype Password:</label>
                <input 
                  type="password" 
                  name="retype-password" 
                  required 
                  placeholder="Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Create an account</button>
                <div className="blackLine"></div>
                <img src={googleSingup} alt="Sign up with Google" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
