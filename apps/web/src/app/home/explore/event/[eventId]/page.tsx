"use client";

import React, { useEffect, useState } from "react";
import { Col, Image, Row, Space, message } from "antd";
import EventInfo from "@ntla9aw/ui/src/components/organisms/EventInfo";
import PreviewList from "@ntla9aw/ui/src/components/organisms/PreviewList";
import EventCard from "@ntla9aw/ui/src/components/molecules/EventCard";
import CommunityCard from "@ntla9aw/ui/src/components/molecules/CommunityCard";
import Button from "@ntla9aw/ui/src/components/atoms/Button";
import TicketCard from "@ntla9aw/ui/src/components/molecules/TicketCard";
import { trpcStatic } from "@ntla9aw/trpc-client/src/static";
import { Community, EventExtra } from "@ntla9aw/ui/src/utils/types";
import { useParams, useRouter } from "next/navigation";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";

export default function EventPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<EventExtra | null>(null);
  const [eventsData, setEventsData] = useState<EventExtra[]>([]);
  const [communitiesData, setCommunitiesData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const eventIdString = Array.isArray(eventId) ? eventId[0] : eventId;

  const bookingMutation = trpcClient.event.booking.useMutation({
    onSuccess: () => {
      message.success("Ticket booked successfully");
    },
    onError: (error:Error) => {
      message.error(`Failed to book ticket: ${error.message}`);
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (eventIdString) {
        try {
          const [eventData, eventsData, communitiesData] = await Promise.all([
            trpcStatic.event.event.query({ event_id: eventIdString }),
            trpcStatic.event.events.query({}),
            trpcStatic.community.commnunities.query(),
          ]);

          setEventData(eventData || null);
          setEventsData(eventsData?.events || []);
          setCommunitiesData(communitiesData || []);
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [eventIdString]);

  const handleBuyTicket = async () => {
    if (!session?.user?.uid) {
      router.push("/auth/signin");
      return;
    }

    bookingMutation.mutate({
      status: "pending",
      uid: session.user.uid,
      event_id: eventIdString,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>Event not found</div>;

  return (
    <div>
      <div style={{ height: 400, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Image
          src={eventData.image || "/placeholder.svg?height=400&width=800"}
          alt="Event"
          style={{ objectFit: "cover", width: "100%", height: "400px" }}
        />
      </div>
      <Row style={{ marginTop: 10 }} justify="space-between">
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
                onClick={() => router.push("/events")}
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
                onClick={() => router.push("/communities")}
              />
            }
          />
        </Col>
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <Space direction="vertical">
            <TicketCard
              ticketAmount={eventData.ticketAmount}
              onClick={handleBuyTicket}
            />
            {eventData.community && <CommunityCard {...eventData.community} />}
          </Space>
        </Col>
      </Row>
    </div>
  );
}