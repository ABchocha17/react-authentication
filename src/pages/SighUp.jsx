import React, { useState } from 'react';
import { useFirebase } from "../context/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const firebase = useFirebase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.register(formData.email, formData.password);
      await firebase.puttData("user/" + formData.username,{name: formData.username,email: formData.email,password:formData.password});
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error signing up:", error.message);
    }

  }
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebase.auth, provider);
      const user = result.user;
      console.log(result);
      console.log("Google Sign-in successful. User:", user);
      await firebase.puttData("user/" + (user.displayName).trim(),{name: user.displayName,email: user.email});
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  }

  return (
    <div className='sighup form_otr'>
      <div className="wrapper">
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div className="form_inr flex m-10">
            <div className="column col1 pd10">
              <label htmlFor="username">User Name</label>
              <input type="text" placeholder='Enter Name' id='username' name='username' value={formData.username} onChange={handleChange} />
            </div>
            <div className="column col1 pd10">
              <label htmlFor="email">User Email</label>
              <input type="email" placeholder='Enter email' id='email' name='email' value={formData.email} onChange={handleChange} />
            </div>
            <div className="column col1 pd10">
              <label htmlFor="password">User Password</label>
              <input type="password" placeholder='Enter password' id='password' name='password' value={formData.password} onChange={handleChange} />
            </div>
            <div className="column col1 pd10">
              <input type="submit" value="Submit" />
              <input type="button" value="signing with google" onClick={handleGoogleSignIn} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
