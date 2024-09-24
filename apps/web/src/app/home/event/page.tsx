"use client";
import React, { useEffect, useState } from "react";
import { Col, Image, Row, Space } from "antd";
import EventInfo from "@ntla9aw/ui/src/components/organisms/EventInfo"; // Adjust the import path as necessary
import PreviewList from "@ntla9aw/ui/src/components/organisms/PreviewList";
import EventCard from "@ntla9aw/ui/src/components/molecules/EventCard";
import CommunityCard from "@ntla9aw/ui/src/components/molecules/CommunityCard";
import Button from "@ntla9aw/ui/src/components/atoms/Button";
import TicketCard from "@ntla9aw/ui/src/components/molecules/TicketCard";
import { trpcStatic } from "@ntla9aw/trpc-client/src/static";
import { Community, Event } from "@ntla9aw/ui/src/utils/types";
import { useParams } from "next/navigation";
export default function EventPage() {
  const { eventId } = useParams(); // eventId can be string or string[]
  const [eventData, setEventData] = useState<Event>();
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [communitiesData, setCommunitiesData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure eventId is a string
  const eventIdString = Array.isArray(eventId) ? eventId[0] : eventId;

  useEffect(() => {
    async function fetchEventData() {
      if (eventIdString) {
        try {
          const data = await trpcStatic.event.event.query({
            event_id: eventIdString,
          });
          if (data) {
            setEventData(data);
          }
        } catch (err) {
          setError("Error Fetching Event");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchEventData();
  }, [eventIdString]);

  useEffect(() => {
    async function fetchEventsData() {
      try {
        const data = await trpcStatic.event.events.query();
        if (data) {
          setEventsData(data);
        }
      } catch (err) {
        setError("Error Fetching Events");
        console.error(err);
      }
    }

    async function fetchCommunitiesData() {
      try {
        const data = await trpcStatic.community.commnunities.query(); // Fixed typo: commnunities to communities
        if (data) {
          setCommunitiesData(data);
        }
      } catch (err) {
        setError("Error Fetching Communities");
        console.error(err);
      }
    }

    fetchCommunitiesData();
    fetchEventsData();
  }, []);
  console.log(loading, error);
  return (
    <div>
      {/* TODO EVENT IMAGE */}
      <div
        style={{
          height: 400,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={`${eventData?.image}`}
          // Replace with your event image URL
          alt="Event"
          style={{ objectFit: "fill", width: "100%", height: "" }}
        />
      </div>
      {/* TODO EVENT INFO */}
      <Row style={{ marginTop: 10 }} justify={"space-between"}>
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <EventInfo title="Event Details" data={eventData} />
          <PreviewList
            style={{ overflowY: "auto", marginBottom: 20 }}
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
            style={{ overflowY: "auto", marginBottom: 20 }}
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
        </Col>
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <Space direction="vertical">
            <TicketCard
              ticketAmount={5}
              onClick={() => console.log("Buy Ticket")}
            />
            {eventData?.community && (
              <CommunityCard community={eventData?.community} />
            )}
          </Space>
        </Col>
      </Row>
      {/* TODO RESERVATION */}
      {/* TODO GROUP CARD */}
    </div>
  );
}
