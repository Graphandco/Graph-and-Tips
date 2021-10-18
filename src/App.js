import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import { auth } from './services/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from './services/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { CreateTip } from './components/CreateTip';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Login } from './components/Login';

const App = () => {
  const tipsCollection = collection(db, 'tips');

  const [tips, setTips] = useState([]);
  //const [email, setEmail] = useState('contact@graphandco.com');
  //const [password, setPassword] = useState("1GvmQ2tl'@");
  const [user, setUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('');

  const [showFav, setShowFav] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const getTips = async () => {
      const data = await getDocs(tipsCollection);

      setTips(
        data.docs.map((doc) => ({
          id: doc.id,
          time: doc.data().timestamp,
          name: doc.data().name,
          content: doc.data().content,
          language: doc.data().language,
          favorite: doc.data().favorite,
          tags: doc.data().tags,
        })),
      );
    };
    getTips();
  }, [tipsCollection]);

  // useEffect(() => {
  //   db.collection('tips')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setTips(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           time: doc.data().timestamp,
  //           name: doc.data().name,
  //           content: doc.data().content,
  //           language: doc.data().language,
  //           favorite: doc.data().favorite,
  //           tags: doc.data().tags,
  //         })),
  //       );
  //     });
  // }, []);

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
      <Header user={user} setUser={setUser} />
      <main className="container">
        <Switch>
          <Route path="/" exact>
            <Content
              user={user}
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
            <Login user={user} setUser={setUser} />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
