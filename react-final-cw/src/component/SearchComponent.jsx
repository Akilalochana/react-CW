import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './SearchComponent.css';
import { propTypes } from 'react-bootstrap/esm/Image';


function SearchComponent() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('Any');

  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

  const [selectedMinBedroom, setSelectedMinBedroom] = useState('');
  const [selectedMaxBedroom, setSelectedMaxBedroom] = useState('');



  useEffect(() => {
    fetch('/properties.json')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);




  const handleSearch = () => {
    // Check if the minimum price is greater than the maximum price
    if (
      selectedMinPrice &&
      selectedMaxPrice &&
      parseFloat(selectedMinPrice) > parseFloat(selectedMaxPrice)
    ) {
      alert("Minimum price cannot be greater than maximum price !");
      return; // Exit the function if the validation fails
    }
    

    if (
      selectedMinBedroom &&
      selectedMaxBedroom &&
      parseFloat(selectedMinBedroom) > parseFloat(selectedMaxBedroom)
    ){
      alert("Minimum bedrooms cannot be greter than maximum bedrooms !")
    }
  
    // Perform filtering if the validation passes
    const filtered = properties.filter((property) => {
      const matchesType = selectedType === "Any" || property.type === selectedType;
      const matchesPrice =
        (!selectedMinPrice || property.price >= parseFloat(selectedMinPrice)) &&
        (!selectedMaxPrice || property.price <= parseFloat(selectedMaxPrice));

      const matchesBEdroom = 
        (!selectedMinBedroom || property.bedrooms >= parseFloat(selectedMinBedroom))&&
        (!selectedMaxBedroom || property.bedrooms <= parseFloat(selectedMaxBedroom)); 

      return matchesType && matchesPrice && matchesBEdroom;
    });
  
    setFilteredProperties(filtered);
  };
  


  return (
    <div>
      <div className="allSearch">
        <Form.Select
          aria-label="Select property type"
          style={{ width: "200px", height:"40px" }}
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="Any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </Form.Select>

        <Form.Group className='maxMinPrice'>
          <Form.Label>Enter price range</Form.Label>
          <Form.Control
            type="number"
            placeholder="min price"
            onChange={(e) => setSelectedMinPrice(e.target.value)}
            value={selectedMinPrice}
            style={{ width: "200px" }}
          />
          <Form.Control
            type="number"
            placeholder="max price"
            onChange={(e) => setSelectedMaxPrice(e.target.value)}
            value={selectedMaxPrice}
            style={{ width: "200px" }}
          />
        </Form.Group>


        <Form.Group className='maxMinBedrooms'>
          <Form.Label>Enter price range</Form.Label>
          <Form.Control
            type="number"
            placeholder="min bedroom"
            onChange={(e) => setSelectedMinBedroom(e.target.value)}
            value={selectedMinBedroom}
            style={{ width: "200px" }}
          />
          <Form.Control
            type="number"
            placeholder="max bedroom"
            onChange={(e) => setSelectedMaxBedroom(e.target.value)}
            value={selectedMaxBedroom}
            style={{ width: "200px" }}
          />
        </Form.Group>


    
        <Button onClick={handleSearch} variant="outline-success">Search</Button>
          
      </div>

      <div className="imageCardDiv">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="imageCard">
            <Card.Img
              variant="top"
              src={property.picture}
              alt={property.location}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{property.type}</Card.Title>
              <Card.Text>{property.location}</Card.Text>
              <Card.Text>{property.bedrooms}</Card.Text>
              <Card.Text>£{property.price.toLocaleString()}</Card.Text>
              <Button variant="outline-success">View Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;

