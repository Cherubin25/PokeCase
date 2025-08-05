// app/components/CardGallery.jsx
import React from 'react';
import PokemonCard from './PokemonCard';

export default function CardGallery({ cards }) {
  return (
    <div className="grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-6 
                    gap-6 
                    px-4 
                    py-8">
      {cards.map(card => (
        <PokemonCard key={card.id} card={card} />
      ))}
    </div>
  );
}
