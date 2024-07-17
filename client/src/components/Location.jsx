import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Location() {
    const location = useLocation();
    const { x } = location.state || {};
    const [coordinates, setCoordinate] = useState({lat:'', lng:'', address:''})

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
      };
    
      const center = {
        lat: -3.745,
        lng: -38.523
      };
    
      const mapRef = useRef(null);
    
      const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);
    
      const onMapClick = useCallback((event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const address = event.address
        console.log({ lat, lng });
        setCoordinate({lat,lng, address})
      }, []);
  return (
  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}
