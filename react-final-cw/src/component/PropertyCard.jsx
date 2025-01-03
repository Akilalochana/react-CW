import React from 'react';
import { useDrag } from 'react-dnd';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, onToggleFavorite, isFavorite }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const Navigate = useNavigate()
  

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="imageCard">
        <Card.Img
          variant="top"
          src={property.picture}
          alt={property.location}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{property.type}</Card.Title>
          <Card.Text>{property.description}</Card.Text>
          {/* <Card.Text>{property.location}</Card.Text>
          <Card.Text>{property.bedrooms} Bedrooms</Card.Text>
          <Card.Text>
            Added on: {property.added.day}/{property.added.month}/
            {property.added.year}
          </Card.Text> */}
          <Card.Text>£{property.price.toLocaleString()}</Card.Text>
          <div className="d-flex justify-content-between">
          <Button 
              variant="outline-success" 
              onClick={() => Navigate(`/propertydetails/${property.id}`)}
            >
              View Details
          </Button>
            <Button 
              variant={isFavorite ? "outline-warning" : "outline-warning"}
              onClick={() => onToggleFavorite(property)}
            >
              {isFavorite ? "❤️" : "🤍"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PropertyCard;