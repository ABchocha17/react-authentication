import React, { useState } from 'react'
import { useFirebase } from '../context/firebase';

export default function SighIn() {

    const [formData, setFormData] = useState({email: "", password: "" });
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
            await firebase.login(formData.email,formData.password);
            setFormData({email: "", password: "" });
            alert("you successfully login");
        } catch (error) {
            console.log(error.messge);
        }
      }
  return (
    <div className='sighin form_otr'>
      <div className="wrapper">
        <h1>SignIn</h1>
        <form onSubmit={handleSubmit}>
          <div className="form_inr flex m-10">
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
              {/* <input type="button" value="signing with google" onClick={handleGoogleSignIn} /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
