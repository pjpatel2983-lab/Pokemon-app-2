import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import Card from "./card";
import Infopoke from "./infopoke";
import type { ApiListResponse, ApiListResult, Pokemon } from "./types";

const List: React.FC = () => {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // API pagination URL
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  // selected pokemon for the right pane
  const [pokeDex, setPokeDex] = useState<Pokemon | null>(null);

  // fetch the list (and then details)
  const fetchPokemons = async (fetchUrl: string) => {
    setLoading(true);
    try {
      const res = await axios.get<ApiListResponse>(fetchUrl);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);

      const details = await Promise.all(
        res.data.results.map((r: ApiListResult) => axios.get<Pokemon>(r.url))
      );

      const data = details.map((d) => d.data).sort((a, b) => a.id - b.id);
      setPokeData(data);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
      setPokeData([]);
    } finally {
      setLoading(false);
    }
  };

  // initial + url change
  useEffect(() => {
    fetchPokemons(url);
  }, [url]);

  return (
    <div className="container">
      <div className="left-content">
        <div className="grid">
          <Card pokemon={pokeData} loading={loading} infoPokemon={(p) => setPokeDex(p)} />
        </div>

        <div className="btn-group">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className="right-content">
        <Infopoke data={pokeDex} />
      </div>
    </div>
  );
};

export default List;
