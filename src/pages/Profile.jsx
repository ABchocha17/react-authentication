import React from 'react';
import {useFirebase} from '../context/firebase';

export default function Profile() {
  const Firebase = useFirebase();
  console.log(Firebase?.logUser);
  return (
    <div className='profile'>
        <div className="wrapper">
            <h1>profile</h1>
            <ul>
                <li>Email: {Firebase?.logUser?.email}</li>
            </ul>
        </div>
    </div>
  )
}
