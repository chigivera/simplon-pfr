"use client";
import { Col, Image, Row } from "antd";
// import CommunityListItem from "@ntla9aw/ui/src/components/molecules/CommunityListItem";
import ProfileTags from "@ntla9aw/ui/src/components/molecules/ProfileTags";
// import CommunityList from "@ntla9aw/ui/src/components/organisms/CommunityList";
import ProfileInfo from "@ntla9aw/ui/src/components/atoms/ProfileInfo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpcStatic } from "@ntla9aw/trpc-client/src/static";
import { User } from "@ntla9aw/ui/src/utils/types";

export default function Profile() {
  const { data: userData } = useSession();
  const [profileData, setprofileData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure eventId is a string

  useEffect(() => {
    async function fetchProfileData() {
      try {
        if (!userData?.user?.uid) return;
        const data = await trpcStatic.auth.user.query({
          uid: userData?.user?.uid,
        });
        if (data) {
          setprofileData(data);
        }
      } catch (err) {
        setError("Error Fetching Events");
        console.error(err);
      }
    }

    fetchProfileData();
    setLoading(false);
  }, [userData?.user?.uid]);
  console.log(loading, error);
  console.log("member id", profileData?.Member);
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
            src={`${userData?.user?.image}`} // Direct avatar image URL from Unsplash
            style={{ borderRadius: "50%", border: "2px solid white" }}
            alt="Profile"
            preview={false} // Disable image preview
          />
          {/* TODO TAGS */}
          {profileData?.tags && (
            <ProfileTags data={profileData?.tags} title={"Interests"} />
          )}
          {/* TODO COMMUNITIES */}
          {/* <CommunityList
            Card={CommunityListItem}
            data={profileData?.Member}
            title={"Communities"}
          /> */}
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
