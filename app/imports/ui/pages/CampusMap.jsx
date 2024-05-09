import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const CampusMap = () => {
  const departmentLocation = [21.297442, -157.816426];

  const mapStyle = {
    height: '60vh',
    width: '100%',
  };

  const departmentMarkerIcon = L.icon({
    iconUrl: './images/pin.png',
    iconSize: [40, 60],
    iconAnchor: [20, 60],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const FlyMapTo = () => {
    const map = useMap();
    useEffect(() => {
      map.panTo(departmentLocation);
    }, [departmentLocation]);
    return null;
  };

  return (
    <MapContainer center={departmentLocation} zoom={25} style={mapStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={departmentLocation} icon={departmentMarkerIcon} />
      <FlyMapTo />
    </MapContainer>
  );
};

export default CampusMap;
