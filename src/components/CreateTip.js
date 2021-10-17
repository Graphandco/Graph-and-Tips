import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import db from '../services/config';
import Form from './Form';

export const CreateTip = () => {
  const [tipName, setTipName] = useState('');
  const [tipContent, setTipContent] = useState('');
  const [tipLanguage, setTipLanguage] = useState('');
  const [tipTags, setTipTags] = useState('');
  const [tipFavorite, setTipFavorite] = useState(false);

  let history = useHistory();

  const addTip = (e) => {
    e.preventDefault();
    db.collection('tips').add({
      name: tipName,
      content: tipContent,
      language: tipLanguage,
      tags: tipTags.split(','),
      favorite: tipFavorite,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    redirect();
  };
  const clearForm = () => {
    setTipName('');
    setTipContent('');
    setTipTags('');
    setTipFavorite(false);
  };
  const redirect = () => {
    clearForm();
    history.push('/');
  };

  return (
    <div className="create-tip form-wrapper">
      <div className="form-top">Ajouter un Tip</div>
      <Form
        tipName={tipName}
        setTipName={setTipName}
        tipContent={tipContent}
        setTipContent={setTipContent}
        tipLanguage={tipLanguage}
        setTipLanguage={setTipLanguage}
        tipTags={tipTags}
        setTipTags={setTipTags}
        tipFavorite={tipFavorite}
        setTipFavorite={setTipFavorite}
      />
      <div className="form-footer">
        <button onClick={addTip}>Ajouter</button>
        <button className="cancel" onClick={redirect}>
          Annuler
        </button>
      </div>
    </div>
  );
};
