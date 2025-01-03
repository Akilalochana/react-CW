import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropertyCard from './PropertyCard';
import FavoritesSection from './FavoritesSection';
import "./SearchComponent.css";

function SearchComponent() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState("Any");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedMinBedroom, setSelectedMinBedroom] = useState("");
  const [selectedMaxBedroom, setSelectedMaxBedroom] = useState("");
  const [selectedAfterDate, setSelectedAfterDate] = useState("");
  const [selectedBeforeDate, setSelectedBeforeDate] = useState("");
  const [selectedPostcode, setSelectedPostcode] = useState("");


 
  const [favorites, setFavorites] = useState([]);




  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  

    // Load properties from JSON
    useEffect(() => {
      fetch("/properties.json")
        .then((response) => response.json())
        .then((data) => {
          setProperties(data.properties);
          setFilteredProperties(data.properties);
        })
        .catch((error) => console.error("Error fetching properties:", error));
    }, []);

      // Load favorites from localStorage
    useEffect(() => {
      const savedFavorites = localStorage.getItem('propertyFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }, []);

    // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (property) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === property.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== property.id);
      } else {
        return [...prevFavorites, property];
      }
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };



  const handleSearch = () => {
    // Validation for min price > max price
    if (
      selectedMinPrice &&
      selectedMaxPrice &&
      parseFloat(selectedMinPrice) > parseFloat(selectedMaxPrice)
    ) {
      alert("Minimum price cannot be greater than maximum price!");
      return;
    }

    // Validation for min bedroom > max bedroom
    if (
      selectedMinBedroom &&
      selectedMaxBedroom &&
      parseFloat(selectedMinBedroom) > parseFloat(selectedMaxBedroom)
    ) {
      alert("Minimum bedrooms cannot be greater than maximum bedrooms!");
      return;
    }

    // Perform filtering
    const filtered = properties.filter((property) => {
      const matchesType =
        selectedType === "Any" || property.type === selectedType;

      const matchesPrice =
        (!selectedMinPrice || property.price >= parseFloat(selectedMinPrice)) &&
        (!selectedMaxPrice || property.price <= parseFloat(selectedMaxPrice));

      const matchesBedroom =
        (!selectedMinBedroom ||
          property.bedrooms >= parseFloat(selectedMinBedroom)) &&
        (!selectedMaxBedroom ||
          property.bedrooms <= parseFloat(selectedMaxBedroom));

      const propertyDate = new Date(
        property.added.year,
        monthMap[property.added.month] - 1, // Convert month name to numeric
        property.added.day
      );

      const matchesDate =
        (!selectedAfterDate || propertyDate >= new Date(selectedAfterDate)) &&
        (!selectedBeforeDate || propertyDate <= new Date(selectedBeforeDate));

      const extractedPostcode = property.location.match(/\b[A-Z]{1,2}[0-9]{1,2}\b/); // Extract postcode area (e.g., "BR5", "NW1")
      const matchesPostcode =
        !selectedPostcode ||
        (extractedPostcode && extractedPostcode[0] === selectedPostcode);

      return matchesType && matchesPrice && matchesBedroom && matchesDate && matchesPostcode;
    });

    setFilteredProperties(filtered);
  };

  return (

    <DndProvider backend={HTML5Backend}>
    <div>
      <div className="allSearch">
        <div className='TypeandPrice'>
          <Form.Label>Select type</Form.Label>
          <Form.Select
            aria-label="Select property type"
            style={{ width: "420px", height: "40px", marginBottom:"20px" }}
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </Form.Select>


          <Form.Label>Enter price range</Form.Label>
          <Form.Group className="maxMinPrice">
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
        </div>

        <div className='bedroomandDate'>
        <Form.Label>Enter bedroom range</Form.Label>
        <Form.Group className="maxMinBedrooms" >
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

        <Form.Group className="date">
          <Form.Label>Date added</Form.Label>
          <div className='afterandBefore'>
            <div className="dateLabel">
              <Form.Label>after</Form.Label>
              <Form.Control
                type="date"
                placeholder="after"
                onChange={(e) => setSelectedAfterDate(e.target.value)}
                value={selectedAfterDate}
                style={{ width: "200px" }}
              />
            </div>
            <div className="dateLabel">
             <Form.Label>before</Form.Label>
              <Form.Control
                type="date"
                placeholder="before"
                onChange={(e) => setSelectedBeforeDate(e.target.value)}
                value={selectedBeforeDate}
                style={{ width: "200px" }}
              />
            </div>
            </div>
            
            

        </Form.Group>
        </div>

        <Form.Group className="postcode">
          <Form.Label>Postcode Area</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. BR1, NW1"
            onChange={(e) => setSelectedPostcode(e.target.value.toUpperCase())}
            value={selectedPostcode}
            style={{ width: "420px", marginBottom:"20px" }}
          />
        </Form.Group>

        <Button onClick={handleSearch} variant="success" style={{width:"150px", marginLeft:"600px", marginTop:"-100px"}}>
          Search
        </Button>
      </div>


      <FavoritesSection 
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onClearFavorites={handleClearFavorites}
        />

<div className="imageCardDiv">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.some(fav => fav.id === property.id)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default SearchComponent;

