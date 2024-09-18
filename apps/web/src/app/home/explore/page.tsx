"use client";
import CustomFilter from "@ntla9aw/ui/src/components/molecules/CustomFilter";
import EventListItem from "@ntla9aw/ui/src/components/molecules/EventListItem";

import { useState } from "react";
import { Dayjs } from "dayjs";
import { Col, Row } from "antd";
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('@ntla9aw/ui/src/components/organisms/CustomMap'), {
  ssr: false,
});

// const mapData = [
//   { name: "Agadir", latitude: 30.46667, longitude: -9.91667 },
//   { name: "Al Hoceima", latitude: 35.13333, longitude: -3.96667 },
//   { name: "Alhucema s/Al Hoceima", latitude: 35.13333, longitude: -3.08333 },
//   { name: "Anti Atlas", latitude: 30, longitude: -8.5 },
//   { name: "Ar Rachid iya/Er Rachidia", latitude: 31, longitude: -4.3 },
//   { name: "Atlas Mts ./Haut Atlas", latitude: 32, longitude: -5 },
//   { name: "Baddouza , Ras", latitude: 32, longitude: -9 },
//   { name: "Beni Mall al", latitude: 32, longitude: -6 },
//   { name: "Bouarfa", latitude: 32, longitude: -1 },
//   { name: "Casablanca", latitude: 33, longitude: -7 },
//   { name: "Dar el Bei da/Casablanca", latitude: 33, longitude: -7 },
//   { name: "El Jadida", latitude: 33, longitude: -8 },
//   { name: "Er Rachid ia", latitude: 31, longitude: -4 },
//   { name: "Er Rif", latitude: 35, longitude: -4 },
//   { name: "Essaouira", latitude: 31, longitude: -9 },
//   { name: "Fedala/M ohammedia", latitude: 33, longitude: -7 },
//   { name: "Fes", latitude: 34, longitude: -5 },
//   { name: "Fez/Fes", latitude: 34, longitude: -5 },
//   { name: "Figuig", latitude: 32, longitude: 47 },
//   { name: "Goulimine", latitude: 28, longitude: -10 },
//   { name: "Guelmine /Goulimine", latitude: 28, longitude: -10 },
//   { name: "Haut Atla s", latitude: 32, longitude: -5 },
//   { name: "High Atla s/Haut Atlas", latitude: 32, longitude: -5 },
//   { name: "Juby, C.", latitude: 28, longitude: -12 },
//   { name: "Kenitra ", latitude: 34, longitude: 6 },
//   { name: "Khemisse t ", latitude: 33, longitude: 6 },
//   { name: "Khouribga ", latitude: 32, longitude: 6 },
//   { name: "Ksar el Kebir ", latitude: 35, longitude: 6 },
//   { name: "Ksar es Souk/Er Rachidia ", latitude: 31, longitude: 4 },
//   { name: "Marrakech ", latitude: 31, longitude: 8 },
//   { name: "Mazagan /El Jadida ", latitude: 33, longitude: 8 },
//   { name: "Meknes ", latitude: 33, longitude: 5 },
//   { name: "Mogador/ Essauira ", latitude: 31, longitude: 9 },
//   { name: "Mohammedia ", latitude: 33, longitude: 7 },
//   { name: "Moulouya O.", latitude: 35, longitude: 2 },
//   { name: "Moyen Atlas ", latitude: 33, longitude: 5 },
//   { name: "Nador ", latitude: 35, longitude: 0 },
//   { name: "Ouarzazate ", latitude: 30, longitude: 6 },
//   { name: "Ouezzane", latitude: 34, longitude: 5 },
//   { name: "Oujda ", latitude: 34, longitude: 1 },
//   { name: "Rabat ", latitude: 34, longitude: 6 },
//   { name: "Rhir cap ", latitude: 30, longitude: 9 },
//   { name: "Safi ", latitude: 32, longitude: 9 },
//   { name: "Settat ", latitude: 33, longitude: 7 },
//   { name: "Tanger ", latitude: 35, longitude: 5 },
//   { name: "Tangier/ Tanger ", latitude: 35, longitude: 5 },
//   { name: "Toubkal, Djebel ", latitude: 31, longitude: 8 },
//   { name: "Villa Bens/Tarfaya ", latitude: 27, longitude: -12 },
// ];
const sampleEvent = {
  name: "Sample Event",
  date: new Date(), // Current date for example
  location: "Sample Location",
  categories: ["Category1", "Category2"],
  onClick: () => alert("Booked!"), // Example click handler
};
interface Filters {
  date_start: Dayjs | null;
  date_end: Dayjs | null;
  order: string;
  tags: string[];
}

const initialFilters: Filters = {
  date_start: null,
  date_end: null,
  order: "newest",
  tags: [],
};

export default function Explore() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Perform additional actions, such as fetching data based on the new filters
  };
  
  return (
    <>
      <CustomFilter
        filters={filters}
        setFilters={handleFilterChange}
        filterInputs={
          [
            // Add your custom filter inputs here
          ]
        }
      />
      <Row style={{ marginTop: 10 }} justify={"space-between"}>
        {" "}
        {/* Added gutter for spacing */}
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          {/* Content for the first column */}
          <EventListItem 
          id={1}
          description="lorem ipsum dolor"
            {...sampleEvent} 
            badge="featured" // Example badge type
          />        </Col>
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <CustomMap position={[33,-7]} zoom={13}/>
        </Col>
      </Row>
    </>
  );
}
