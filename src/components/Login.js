import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../services/firebase-config';

export const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const auth = getAuth();
  let history = useHistory();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };
  const redirect = () => {
    clearForm();
    history.push('/');
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login form-wrapper">
      <div className="logged">{user?.email}</div>
      <div className="form-top">S'identifier</div>
      <form>
        <div className="form-body">
          <div className="form-item">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-item">
            <label>Mot de passe</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
      </form>
      <div className="form-footer">
        <button onClick={login}>Valider</button>
        <button className="cancel" onClick={redirect}>
          Annuler
        </button>
      </div>
    </div>
  );
};
