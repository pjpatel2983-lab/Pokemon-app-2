export type Pokemon = {
  id: number;                  // Pokémon ID (e.g., 1 for Bulbasaur)
  name: string;                // Pokémon name (e.g., "bulbasaur")
  sprites: {
    front_default: string | null;           // Image URL (or null if not available)
  };
  abilities: Array<{                           
    ability: {
      name: string;                  // Ability name (e.g., "overgrow")
    };
  }>;
  stats: Array<{
    stat: {
      name: string;                 // Stat name (e.g., "hp", "attack")
    };
    base_stat: number;              // Base stat value (e.g., 45 for HP)
  }>;
}

export type ApiListResult = {
  name: string;                          // Pokémon name (e.g., "bulbasaur")
  url: string;                             // URL to fetch detailed Pokémon data
};

export type ApiListResponse = {
  count: number;                      // Total number of Pokémon available
  next: string | null;            // URL for the next page of results (or null if none)
  previous: string | null;          // URL for the previous page of results (or null if none)
  results: ApiListResult[];           // Array of Pokémon list results
};

