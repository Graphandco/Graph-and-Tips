import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { FaEdit } from 'react-icons/fa';
import { Tip } from './Tip';

export const Content = ({ tips, setTips, searchText, setSearchText, showFav, setShowFav, filterLanguage, setFilterLanguage, allTips, isLogged }) => {
  const totalFav = tips.filter((tip) => {
    return tip.favorite;
  });

  return (
    <div className="content">
      <Sidebar
        tips={tips}
        allTips={allTips}
        setTips={setTips}
        showFav={showFav}
        setShowFav={setShowFav}
        totalFav={totalFav}
        filterLanguage={filterLanguage}
        setFilterLanguage={setFilterLanguage}
      />
      <div className="tips">
        <div className="content-top">
          <div className="tips-count">
            <span className="subtitle">Liste des tips</span>
            {tips.length} tip{tips.length > 1 && 's'} disponible{tips.length > 1 && 's'}
          </div>
          <div className="tip-search">
            <input type="text" placeholder="&#128270; Rechercher un tip..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>
          <NavLink to="/add-tip">
            <button>
              <FaEdit />
            </button>
          </NavLink>
        </div>
        {filterLanguage && (
          <div className="tip-list-title">
            Liste des tips <span>{filterLanguage.toUpperCase()}</span>
          </div>
        )}
        {tips.map((tip) => (
          <div className="tip-item" key={tip.id}>
            <Tip key={tip.id} tip={tip} />
          </div>
        ))}
      </div>
    </div>
  );
};
