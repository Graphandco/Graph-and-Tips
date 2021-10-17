import React from 'react';
import { FaStar, FaCode, FaCss3, FaPhp, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { SiPrestashop } from 'react-icons/si';

export const Sidebar = ({ tips, setTips, allTips, showFav, setShowFav, totalFav, filterLanguage, setFilterLanguage }) => {
  function filter(arr, criteria) {
    return arr.filter(function (obj) {
      return Object.keys(criteria).every(function (c) {
        return obj[c] === criteria[c];
      });
    });
  }

  const nbCSS = filter(allTips, { language: 'css' }).length;
  const nbPHP = filter(allTips, { language: 'php' }).length;
  const nbJS = filter(allTips, { language: 'javascript' }).length;
  const nbReact = filter(allTips, { language: 'react' }).length;
  const nbPresta = filter(allTips, { language: 'prestashop' }).length;

  return (
    <div className="sidebar">
      <div className="subtitle">Filtrer</div>
      <div className="filter-list">
        <div className="filter-item favoris" onClick={() => setShowFav(!showFav)}>
          <div className={showFav ? 'filter-title selected' : 'filter-title'}>
            <FaStar /> <span>Favoris</span>
          </div>
          <div className="filter-tips-count">{totalFav.length}</div>
        </div>
        <div className="filter-item all">
          <div className="filter-title" onClick={() => setFilterLanguage('')}>
            <FaCode /> <span>Tous</span>
          </div>
          <div className="filter-tips-count">{allTips.length}</div>
        </div>
        <div className="filter-item">
          <div className={filterLanguage === 'css' ? 'filter-title selected' : 'filter-title'} onClick={() => setFilterLanguage('css')}>
            <FaCss3 /> <span>CSS</span>
          </div>
          <div className="filter-tips-count">{nbCSS}</div>
        </div>
        <div className="filter-item">
          <div className={filterLanguage === 'php' ? 'filter-title selected' : 'filter-title'} onClick={() => setFilterLanguage('php')}>
            <FaPhp /> <span>PHP</span>
          </div>
          <div className="filter-tips-count">{nbPHP}</div>
        </div>
        <div className="filter-item">
          <div className={filterLanguage === 'javascript' ? 'filter-title selected' : 'filter-title'} onClick={() => setFilterLanguage('javascript')}>
            <IoLogoJavascript /> <span>Javascript</span>
          </div>
          <div className="filter-tips-count">{nbJS}</div>
        </div>
        <div className="filter-item">
          <div className={filterLanguage === 'react' ? 'filter-title selected' : 'filter-title'} onClick={() => setFilterLanguage('react')}>
            <FaReact /> <span>React</span>
          </div>
          <div className="filter-tips-count">{nbReact}</div>
        </div>
        <div className="filter-item">
          <div className={filterLanguage === 'react' ? 'filter-title selected' : 'filter-title'} onClick={() => setFilterLanguage('prestashop')}>
            <SiPrestashop /> <span>Prestashop</span>
          </div>
          <div className="filter-tips-count">{nbPresta}</div>
        </div>
      </div>
    </div>
  );
};
