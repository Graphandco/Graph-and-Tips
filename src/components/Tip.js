import React, { useState, useEffect } from 'react';
import db from '../services/config';

import { FaTrashAlt } from 'react-icons/fa';
import { FaStar, FaPencilAlt } from 'react-icons/fa';
import Form from './Form';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Tip = ({ tip }) => {
  const [tipName, setTipName] = useState(tip.name);
  const [tipContent, setTipContent] = useState(tip.content);
  const [tipLanguage, setTipLanguage] = useState(tip.language);
  const [tipTags, setTipTags] = useState(tip.tags);
  const [tipFavorite, setTipFavorite] = useState(tip.favorite);

  const [edit, setEdit] = useState(false);

  const deleteTip = () => {
    if (window.confirm(`Voulez-vous vraiment supprimer le tip ${tip.name} ?`)) {
      db.collection('tips').doc(tip.id).delete();
    }
  };

  const updateTip = () => {
    db.collection('tips').doc(tip.id).update({
      name: tipName,
      content: tipContent,
      language: tipLanguage,
      //tags: tipTags.split(','),
      favorite: tipFavorite,
    });
    setEdit(false);
  };

  useEffect(() => {
    db.collection('tips').doc(tip.id).update({
      favorite: tipFavorite,
    });
  }, [tip.id, tipFavorite]);

  const setCodeLanguage = () => {
    if (tipLanguage === 'react') {
      return 'javascript';
    } else if (tipLanguage === 'prestashop') {
      return 'php';
    } else {
      return tipLanguage;
    }
  };

  return (
    <>
      {/* {tip.id} */}
      <div className="tip-header">
        <h2>{tip.name}</h2>
        <div className="tip-buttons">
          <FaPencilAlt onClick={() => setEdit(!edit)} />
          <FaTrashAlt onClick={deleteTip} />
          <FaStar className={`${tipFavorite ? 'tip-favorite ' : ''}`} onClick={() => setTipFavorite(!tipFavorite)} />
        </div>
        {tip.tags && (
          <div className="tip-tags">
            {tip.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="tip-content">
        <SyntaxHighlighter language={setCodeLanguage()} style={atomDark}>
          {tip.content}
        </SyntaxHighlighter>
      </div>

      {edit && (
        <div className="tip-edit">
          <div className="tip-edit-title">Éditer le Tip</div>
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
          />
          <div className="form-footer">
            <button onClick={updateTip}>Mettre à jour</button>
            <button className="cancel" onClick={() => setEdit(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
};
