"use client";

import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Tooltip } from "antd";
import type { Dayjs } from "dayjs";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";

type EventType = {
  id: string;
  title: string;
  date: string;
  type: 'FREE' | 'PAID';
  community: string;
  status: string;
};

const getEventType = (event: EventType): BadgeProps["status"] => {
  switch (event.type) {
    case 'FREE':
      return 'success';
    case 'PAID':
      return 'processing';
    default:
      return 'default';
  }
};

export default function DashboardHome() {
  const { data: events, isLoading } = trpcClient.personal.getUserEvents.useQuery();

  const getListData = (value: Dayjs) => {
    if (!events) return [];
    return events.filter(event => 
      value.isSame(new Date(event.date), 'day')
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Tooltip title={`${item.title} - ${item.community}`}>
              <Badge
                status={getEventType(item)}
                text={item.title}
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
      <Calendar cellRender={cellRender} />
      <div className="mt-4">
        <div className="flex space-x-4">
          <Badge status="success" text="Free Event" />
          <Badge status="processing" text="Paid Event" />
        </div>
      </div>
    </div>
  );
}