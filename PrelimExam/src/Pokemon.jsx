import React from 'react';
import './index.css';

function Pokemon({ pokemon, language }) {
  return (
    <div className="pokemon">
      <img className="pokemon-img" src={pokemon.image} alt={pokemon.name[language]} />
      <p>ID: {pokemon.id}</p>
      <p>Name: {pokemon.name[language]}</p> {/* Display name based on selected language */}
    </div>
  );
}

export default Pokemon;