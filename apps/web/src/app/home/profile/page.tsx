"use client";
import { Col, Image, Row } from "antd";
import CommunityListItem from "@ntla9aw/ui/src/components/molecules/CommunityListItem";
import ProfileTags from "@ntla9aw/ui/src/components/molecules/ProfileTags";
import CommunityList from "@ntla9aw/ui/src/components/organisms/CommunityList";
import ProfileInfo from "@ntla9aw/ui/src/components/atoms/ProfileInfo";
const communityData = [
  {
    id: 1,
    coverImage: "https://example.com/community1.jpg",
    name: "Community 1",
  },
  {
    id: 2,
    coverImage: "https://example.com/community2.jpg",
    name: "Community 2",
  },
];
const tagsData = [
  "Event Organizer",
  "Community Leader",
  "Tech Enthusiast",
  "Public Speaker",
  "Developer",
  "Designer",
  "Volunteer",
  "Photographer",
];
export default function Profile() {
  return (
    <>
      {/* Background image */}
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518791841217-8f162f1e1131")', // Direct background image URL from Unsplash
          height: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Avatar */}
      <Row justify="center" style={{ marginTop: "-150px", padding: "0 16px" }}>
        <Col
          xs={24} // Full width on extra small screens
          sm={12} // Half width on small screens
          md={8} // One-third width on medium screens
          lg={6} // One-fourth width on large screens
        >
          <Image
            width={200}
            height={200}
            src="https://plus.unsplash.com/premium_photo-1725617260937-252aad2e865b?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Direct avatar image URL from Unsplash
            style={{ borderRadius: "50%", border: "2px solid white" }}
            alt="Profile"
            preview={false} // Disable image preview
          />
          {/* TODO TAGS */}
          <ProfileTags data={tagsData} title={"Interests"} />
          {/* TODO COMMUNITIES */}
          <CommunityList
            Card={CommunityListItem}
            data={communityData}
            title={"Communities"}
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={16}
          lg={18}
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "5em",
          }}
        >
          <ProfileInfo name={"user"} email="user@example.com" />
        </Col>
      </Row>
    </>
  );
}
