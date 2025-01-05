import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styles for react-tabs
import MyNavbar from '../component/MyNavbar';
import PropertyImageGallery from '../component/PropertyImageGallery'; // Import the corrected image gallery component
import './PropertyDetails.css';

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';


const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find(p => p.id.toString() === id);
        setProperty(foundProperty);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  const images = property.imageGallery.map((imageSrc, index) => ({
    src: `/${imageSrc}`, // Full-size image path
    // alt: property.location, // Image description (can use any property)
  }));

  return (
    <>

      <div>
        <MyNavbar />
        <IoArrowBackCircleOutline onClick={()=>navigate(-1)} className='back' />
        
        <div className="property-details">
          <h2>{property.type}</h2>
          <PropertyImageGallery images={images} />
          <p className="property-price">Price: £{property.price.toLocaleString()}</p>
          <p>Location: {property.location}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p> {property.tenure}</p>
          <p>Added date: {property.added.day}/{property.added.month}/{property.added.year}</p>

          {/* Tabs Section */}
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Google Map</Tab>
            </TabList>

            {/* Long Description Tab */}
            <TabPanel>
              <div className="tab-content">
                <h3>Property Description</h3>
                <p>{property.description}</p>
              </div>
            </TabPanel>

            {/* Floor Plan Tab */}
            <TabPanel>
              <div className="tab-content">
                <h3>Floor Plan</h3>
                <img src={`/${property.floorPlan}`} alt="Floor Plan" className="floor-plan-image" />
              </div>
            </TabPanel>

            {/* Google Map Tab */}
            <TabPanel>
              <div className="tab-content">
                <h3>Location on Map</h3>
                <iframe
                  title="Google Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location
                  )}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default PropertyDetails;
