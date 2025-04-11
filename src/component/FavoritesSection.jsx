import React from 'react';
import { useDrop } from 'react-dnd';
import Button from "react-bootstrap/Button";
import PropertyCard from './PropertyCard';

const FavoritesSection = ({ favorites, onRemoveFavorite, onClearFavorites }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => onRemoveFavorite(item.property),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div 
      ref={drop} 
      className="favorites-section p-3"
      style={{ 
        backgroundColor: isOver ? '#f8f9fa' : 'white',
        minHeight: '200px',
        border: '2px dashed #dee2e6',
        borderRadius: '8px',
        marginTop: '20px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Favorites</h3>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={onClearFavorites}
        >
          Clear All
        </Button>
      </div>
      <div className="d-flex flex-wrap gap-3">
        {favorites.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onToggleFavorite={onRemoveFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;