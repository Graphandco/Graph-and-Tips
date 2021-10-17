import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

//import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import db from './services/config';
import { CreateTip } from './components/CreateTip';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Login } from './components/Login';

const App = () => {
  //const auth = getAuth();
  const [tips, setTips] = useState([]);
  //const [email, setEmail] = useState('contact@graphandco.com');
  //const [password, setPassword] = useState("1GvmQ2tl'@");
  const [user, setUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const [showFav, setShowFav] = useState(false);

  // useEffect(() => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const userData = userCredential.user;
  //       setUser(userData);
  //       //console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       console.log('Erreur lors de la connexion');
  //     });
  // }, [auth, email, password]);

  useEffect(() => {
    db.collection('tips')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTips(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            time: doc.data().timestamp,
            name: doc.data().name,
            content: doc.data().content,
            language: doc.data().language,
            favorite: doc.data().favorite,
            tags: doc.data().tags,
          })),
        );
      });
  }, []);

  //SETTING FILTERED TIPS
  const filteredTips = tips.filter((tip) => {
    if (showFav === true) {
      return tip.name.toLowerCase().includes(searchText.toLowerCase()) && tip.language.toLowerCase().includes(filterLanguage.toLowerCase()) && tip.favorite;
    } else {
      return tip.name.toLowerCase().includes(searchText.toLowerCase()) && tip.language.toLowerCase().includes(filterLanguage.toLowerCase());
    }
  });

  return (
    <>
      <Header user={user} setUser={setUser} isLogged={isLogged} />
      <main className="container">
        <div className="logged">{isLogged ? 'OUI' : 'NON'}</div>
        <Switch>
          <Route path="/" exact>
            <Content
              isLogged={isLogged}
              allTips={tips}
              tips={filteredTips}
              setTips={setTips}
              searchText={searchText}
              setSearchText={setSearchText}
              showFav={showFav}
              setShowFav={setShowFav}
              filterLanguage={filterLanguage}
              setFilterLanguage={setFilterLanguage}
            />
          </Route>
          <Route path="/add-tip">
            <CreateTip />
          </Route>
          <Route path="/login">
            <Login isLogged={isLogged} setIsLogged={setIsLogged} user={user} setUser={setUser} />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
