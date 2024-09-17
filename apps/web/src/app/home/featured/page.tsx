"use client";
import React from "react";
import PreviewList from "@ntla9aw/ui/src/components/organisms/PreviewList";
import EventCard from "@ntla9aw/ui/src/components/molecules/EventCard";
import CommunityCard from "@ntla9aw/ui/src/components/molecules/CommunityCard";
import Button from "@ntla9aw/ui/src/components/atoms/Button";
const eventsData = [
  {
    id: 1,
    name: "Event 1",
    description: "Description for Event 1",
    date: new Date(2024, 4, 20), // Example date
    location: "Location A",
    categories: ["Category 1", "Category 2"],
  },
  {
    id: 2,
    name: "Event 2",
    description: "Description for Event 2",
    date: new Date(2024, 4, 25),
    location: "Location B",
    categories: ["Category 3"],
  },
  {
    id: 3,
    name: "Event 3",
    description: "Description for Event 3",
    date: new Date(2024, 4, 20), // Example date
    location: "Location A",
    categories: ["Category 1", "Category 2"],
  },
  {
    id: 4,
    name: "Event 4",
    description: "Description for Event 4",
    date: new Date(2024, 4, 25),
    location: "Location B",
    categories: ["Category 3"],
  },
  // Add more events as needed
];

const communitiesData = [
  {
    id: 1,
    name: "Community 1",
    description: "Description for Community 1",
    eventList: [],
    coverImage: "https://via.placeholder.com/150", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: false,
  },
  {
    id: 2,
    name: "Community 2",
    description: "Description for Community 2",
    eventList: [
      {
        id: 1,
        name: "Event 1",
        description: "Description for Event 1",
      },
      {
        id: 2,
        name: "Event 2",
        description: "Description for Event 2",
      },
    ],
    coverImage: "https://via.placeholder.com/150/0000FF", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Community 3",
    description: "Description for Community 3",
    eventList: [
      {
        id: 3,
        name: "Event 3",
        description: "Description for Event 3",
      },
    ],
    coverImage: "https://via.placeholder.com/150/FF0000", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Community 4",
    description: "Description for Community 4",
    eventList: [],
    coverImage: "https://via.placeholder.com/150/00FF00", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: false,
  },
];

const PreviewPage = () => {
  return (
    <>
      <PreviewList
        Card={EventCard}
        data={eventsData}
        title="Upcoming Events"
        Button={
          <Button
            label="View All Events"
            type="primary"
            onClick={() => {
              console.log("Show More Events :)");
            }}
          />
        }
      />
      <PreviewList
        Card={EventCard}
        data={eventsData}
        title="Popular Events"
        Button={
          <Button
            label="View All Events"
            type="primary"
            onClick={() => {
              console.log("Show More Events :)");
            }}
          />
        }
      />
      <PreviewList
        Card={EventCard}
        data={eventsData}
        title="Events For You"
        Button={
          <Button
            label="View All Events"
            type="primary"
            onClick={() => {
              console.log("Show More Events :)");
            }}
          />
        }
      />
      <PreviewList
        Card={CommunityCard}
        data={communitiesData}
        title="Communities For You"
        Button={
          <Button
            label="Join a Community"
            type="primary"
            onClick={() => {
              console.log("Show More Communities :)");
            }}
          />
        }
      />
    </>
  );
};

export default PreviewPage;
