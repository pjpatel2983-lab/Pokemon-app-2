import React from "react";
import type { Pokemon } from "./types";

interface Props {
  pokemon: Pokemon[];
  loading: boolean;
  infoPokemon: (p: Pokemon) => void;
}

const Card: React.FC<Props> = ({ pokemon, loading, infoPokemon }) => {
  if (loading) return <h1>Loading...</h1>;

//  console.log(pokemon);

  return (
    <>
      {pokemon.map((item) => (
        <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
          <h2>{item.id}</h2>
          <img src={item.sprites.front_default ?? ""} alt={item.name} />
          <h2>{item.name}</h2>
        </div>
      ))}
    </>
  );
};

export default Card;