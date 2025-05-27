import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

const salons: Location[] = [
  { lat: 11.0820753, lng: 77.3007705, name: "Experessions Salon" },
  { lat: 11.0860154, lng: 77.3081306, name: "BIHO BOSS" },
  { lat: 11.0810207, lng: 77.3145205, name: "Friends" },
  { lat: 11.0812765, lng: 77.3141345, name: "Hair Cut Salon" },
  { lat: 11.113011, lng: 77.3291761, name: "Studio11 Family Salon College Road Tirupur" },
  { lat: 11.0659072, lng: 77.3399791, name: "Naturals Salon" },
//   { lat: 11.079425, lng: 77.299526, name: "Salon 4" },
//   { lat: 11.079425, lng: 77.299526, name: "Salon 5" },
//   { lat: 11.079425, lng: 77.299526, name: "Salon 6" },

];

interface MapProps {
  onSelect: (location: string) => void;
}

const Map: React.FC<MapProps> = ({ onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      onSelect(selectedLocation.name);
    }
  };

  return (
    <div>
      <MapContainer center={[11.079425, 77.299526]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {salons.map((salon, index) => (
          <Marker
            key={index}
            position={[salon.lat, salon.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(salon),
            }}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/256/10714/10714000.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>{salon.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedLocation && (
        <div className="mt-4 text-center">
          <p className="mb-2">Selected Salon: {selectedLocation.name}</p>
          <Button onClick={handleConfirmSelection}>Confirm Selection</Button>
        </div>
      )}
    </div>
  );
};

export default Map;