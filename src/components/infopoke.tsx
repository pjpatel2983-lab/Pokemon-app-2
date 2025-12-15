import React from "react";
import type  { Pokemon } from "./types";

interface Props {
  data: Pokemon | null | undefined;
}

const infopoke: React.FC<Props> = ({ data }) => {
  if (!data) return <h2>Select a Pokémon</h2>;

  return (
    <>
      <h1>{data.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        alt={data.name}
      />

      <div className="abilities">
        {data.abilities.map((a, i) => (
          <div className="group" key={i}>
            <h3>{a.ability.name}</h3>
          </div>
        ))}
      </div>

      <div className="base-stat">
        {data.stats.map((s, i) => (
          <h3 key={i}>
            {s.stat.name}: {s.base_stat}
          </h3>
        ))}
      </div>
    </>
  );
};

export default infopoke;
