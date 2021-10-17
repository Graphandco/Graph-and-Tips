import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const Login = ({ isLogged, setIsLogged, user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  let history = useHistory();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };
  const redirect = () => {
    clearForm();
    history.push('/');
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userData = userCredential.user;
        setUser(userData);
        //console.log(user);
        // ...
        setIsLogged(true);
        redirect();
      })
      .catch((error) => {
        console.log('Erreur lors de la connexion');
      });
  };

  return (
    <div className="login form-wrapper">
      <div className="logged">{isLogged ? 'OUI' : 'NON'}</div>
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
