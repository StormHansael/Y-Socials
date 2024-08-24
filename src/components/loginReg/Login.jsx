import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginRegister.scss"
import {ReactComponent as ArrowDown} from "../../Assests/svgs/arrowDown.svg"
import PocketBase from 'pocketbase';


export const pb = new PocketBase('https://y-socials.pockethost.io/');

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log('Logged in successfully', authData);
      navigate("/")
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid email or password');
    }
  };

  return(
    <>
    <div className="loginContainer">
      <div>
        <div className="purpleBar"></div>
        <div className="whiteBox">
          <div>
            <p><span>Login</span> to join your <span>Friends</span> on a <span>New</span> thrilling platform</p>
          </div>
          <div className="blackLine"></div>
          <div className="registrerFormContainer">
       
          <form onSubmit={handleLogin}>
            <label>
              Email:
            </label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              Password:
            </label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
            {error && <p className="error">{error}</p>}
            
            <div className="buttonSeperator">
              <button type="submit">Login</button>
              <button id="blackButton" type="button">Forgot Password</button>
            </div>
            <div className="blackLine"></div>
          </form>
         
          </div>
          <div className="goToRegistrerContainer">
            <p><span>Don't</span> have an Account?</p>
            <p className="highlitghtText">Sign Up</p>
            <ArrowDown />
            <button onClick={() => navigate('/registrer')}>Create an account</button>
            

          </div>
        </div>
      </div>
    </div>
    </>
  )

}