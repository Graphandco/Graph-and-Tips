import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Gravatar from 'react-gravatar';
import { getAuth, signOut } from 'firebase/auth';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Header = ({ user, setUser, isLogged }) => {
  const [authChange, setAuthChange] = useState(false);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser('');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Logo />
          <div className="title">Graph & Tips</div>
        </div>

        <div className="user" onClick={() => setAuthChange(!authChange)}>
          <Gravatar email={isLogged ? user.email : 'blahblah@blah.com'} size={30} default="mp" />
          <div className="chevron">{authChange ? <FaChevronUp /> : <FaChevronDown />}</div>
          <div className={`${authChange ? 'change-auth open ' : 'change-auth'}`}>
            {user ? (
              <span onClick={logout}>Déconnexion</span>
            ) : (
              <Link to="/login">
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
