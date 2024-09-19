import { Col, Image, Row, Space } from "antd";
import { Brand } from "@ntla9aw/ui/src/components/atoms/Brand";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <Brand
        style={{
          position: "absolute",
          left: 10,
          top: 6,
        }}
      />
      <Row style={{ height: "100vh", padding: 0 }}>
        {/* Column for the form (children) */}
        <Col
          xs={24} // Full width on extra small screens
          sm={24} // Full width on small screens
          md={12} // Half width on medium screens
          lg={12} // Half width on large screens
          xl={12} // Half width on extra large screens
        >
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "auto", // Adjust as needed
            }}
          >
            {children}
          </Space>
        </Col>

        {/* Column for the image */}
        <Col
          xs={0} // Hidden on extra small screens
          sm={0} // Hidden on small screens
          md={12} // Half width on medium screens
          lg={12} // More width on large screens
          xl={12} // Full width on extra large screens
        >
          <Image
            src="https://media.istockphoto.com/id/1324561072/photo/party-people-enjoy-concert-at-festival-summer-music-festival.jpg?s=1024x1024&w=is&k=20&c=zZHD2rhsyz5naEJ4fRFiEJvFMoN-H-8fjV5hoQfArp0=" // You can replace this with your image source
            alt="Auth Image"
            height={"100vh"}
            style={{ objectFit: "cover" }}
          />
        </Col>
      </Row>
    </div>
  );
}
