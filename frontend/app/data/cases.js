export const cases = [
  {
    id: 'common-case',
    name: 'Common Case',
    price: 2.50,
    category: 'Common',
    rarity: 'common',
    pokemonIds: [16, 19, 21, 23, 27, 29, 32, 35, 39, 41],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Basic Pokémon collection with common species',
    color: 'blue',
    glowColor: 'from-blue-400 to-cyan-400',
    representativePokemon: {
      id: 16,
      name: 'Pidgey',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
      animation: 'floating'
    }
  },
  {
    id: 'uncommon-case',
    name: 'Uncommon Case',
    price: 5.00,
    category: 'Uncommon',
    rarity: 'uncommon',
    pokemonIds: [25, 26, 28, 31, 34, 36, 38, 40, 42, 44],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Enhanced collection with evolved forms',
    color: 'green',
    glowColor: 'from-green-400 to-emerald-400',
    representativePokemon: {
      id: 25,
      name: 'Pikachu',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      animation: 'electric'
    }
  },
  {
    id: 'rare-case',
    name: 'Rare Case',
    price: 12.50,
    category: 'Rare',
    rarity: 'rare',
    pokemonIds: [6, 9, 59, 62, 65, 68, 71, 73, 76, 78],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Rare evolved Pokémon with powerful abilities',
    color: 'purple',
    glowColor: 'from-purple-400 to-violet-400',
    representativePokemon: {
      id: 6,
      name: 'Charizard',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
      animation: 'fire'
    }
  },
  {
    id: 'epic-case',
    name: 'Epic Case',
    price: 25.00,
    category: 'Epic',
    rarity: 'epic',
    pokemonIds: [149, 150, 151, 248, 249, 250, 384, 385, 386, 487],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Epic legendary and mythical Pokémon',
    color: 'orange',
    glowColor: 'from-orange-400 to-red-400',
    representativePokemon: {
      id: 150,
      name: 'Mewtwo',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
      animation: 'psychic'
    }
  },
  {
    id: 'legendary-case',
    name: 'Legendary Case',
    price: 50.00,
    category: 'Legendary',
    rarity: 'legendary',
    pokemonIds: [150, 249, 384, 487, 643, 644, 716, 717, 800, 888],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Ultra-rare legendary Pokémon from all regions',
    color: 'red',
    glowColor: 'from-red-400 to-pink-400',
    representativePokemon: {
      id: 384,
      name: 'Rayquaza',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png',
      animation: 'dragon'
    }
  },
  {
    id: 'mythical-case',
    name: 'Mythical Case',
    price: 100.00,
    category: 'Mythical',
    rarity: 'mythical',
    pokemonIds: [151, 251, 385, 489, 490, 491, 492, 493, 494, 495],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Mythical Pokémon with unique abilities',
    color: 'pink',
    glowColor: 'from-pink-400 to-rose-400',
    representativePokemon: {
      id: 151,
      name: 'Mew',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
      animation: 'mystical'
    }
  },
  {
    id: 'shiny-case',
    name: 'Shiny Case',
    price: 75.00,
    category: 'Shiny',
    rarity: 'shiny',
    pokemonIds: [25, 6, 149, 248, 384, 487, 643, 716, 800, 888],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'Shiny variants of powerful Pokémon',
    color: 'yellow',
    glowColor: 'from-yellow-400 to-amber-400',
    representativePokemon: {
      id: 149,
      name: 'Dragonite',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
      animation: 'shiny'
    }
  },
  {
    id: 'master-case',
    name: 'Master Case',
    price: 200.00,
    category: 'Master',
    rarity: 'master',
    pokemonIds: [150, 249, 384, 487, 643, 644, 716, 717, 800, 888],
    dropRates: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
    description: 'The ultimate case with guaranteed legendary drops',
    color: 'rainbow',
    glowColor: 'from-purple-400 via-pink-400 to-red-400',
    representativePokemon: {
      id: 888,
      name: 'Zacian',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/888.png',
      animation: 'master'
    }
  }
];
  