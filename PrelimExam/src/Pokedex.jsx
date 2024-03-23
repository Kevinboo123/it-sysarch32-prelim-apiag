import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import './index.css';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    async function fetchPokemonList() {
      setLoading(true);
      const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
      const data = await response.json();
      setPokemonList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    }

    fetchPokemonList();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [language]);

  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="language-buttons">
        <button onClick={() => changeLanguage('english')}>English</button>
        <button onClick={() => changeLanguage('japanese')}>Japanese</button>
        <button onClick={() => changeLanguage('chinese')}>Chinese</button>
        <button onClick={() => changeLanguage('french')}>French</button>
      </div>
      <div className="pagination">
            <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
              Back
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => handlePagination(page)}>
                {page}
              </button>
            ))}
            <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
            ))}
          </div>
          
          <div>
            <p>Current Page: {currentPage}</p>
            <p>Total Pages: {totalPages}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Pokedex;