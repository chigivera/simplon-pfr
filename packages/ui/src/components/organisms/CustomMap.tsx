import {  Marker, Popup, TileLayer } from "react-leaflet";
import {MapContainer} from 'react-leaflet/MapContainer'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Define the props interface
interface CustomMapProps {
  position: [number, number]; // Tuple for latitude and longitude
  zoom: number;
}

const CustomMap: React.FC<CustomMapProps> = ({ position, zoom }) => {
  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CustomMap;