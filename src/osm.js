import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OSMMap = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace "your_osm_file.osm" with the path to your OSM file
        const osmFilePath = "your_osm_file.osm";
        const response = await fetch(osmFilePath);
        const data = await response.text();

        // Load and display the OSM data
        const osmLayer = new L.OSM.DataLayer(data, {
          tags: { highway: 'residential' }, // Customize the tags as needed
          onClick: (feature, layer) => {
            console.log(feature.properties); // Log feature properties on click
          },
        });

        // Access the Leaflet map object from the ref
        const map = this.mapRef.current;
        osmLayer.addTo(map);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
    </MapContainer>
  );
};

export default OSMMap;
