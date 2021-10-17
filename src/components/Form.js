import React from 'react';

const Form = ({ tipName, setTipName, tipContent, setTipContent, tipLanguage, setTipLanguage, tipTags, setTipTags }) => {
  return (
    <form>
      <div className="form-body">
        <div className="form-item">
          <label>Nom du Tip</label>
          <input type="text" value={tipName} onChange={(e) => setTipName(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Contenu du Tip</label>
          <textarea rows="10" value={tipContent} onChange={(e) => setTipContent(e.target.value)} />
        </div>
        <div className="form-item custom-select">
          <label>Langage du Tip</label>
          <select name="language" value={tipLanguage} onChange={(e) => setTipLanguage(e.target.value)}>
            <option value="">Choisir un langage</option>
            <option value="php">PHP</option>
            <option value="css">CSS</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="prestashop">Prestashop</option>
          </select>
        </div>
        <div className="form-item">
          <label>Tags du Tip</label>
          <input type="text" value={tipTags} onChange={(e) => setTipTags(e.target.value)} />
        </div>
      </div>
    </form>
  );
};

export default Form;
