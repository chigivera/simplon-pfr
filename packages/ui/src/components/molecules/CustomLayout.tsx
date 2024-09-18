"use client";
import React from "react";
import { Layout } from "antd";
import CustomNavBar from "../organisms/NavBar"; // Ensure this path is correct
import CustomFooter from "../organisms/CustomFooter";
const { Header } = Layout;

interface CustomLayoutProps {
  children: React.ReactNode; // Define children prop
}

const subscriptions = {
  terms: [
    { id: 1, description: "Access to basic features" },
    { id: 2, description: "Limited support" },
    { id: 3, description: "Priority updates" },
  ],
};

const copyright = [
  { key: "1", href: "/terms", label: "Terms of Service" },
  { key: "2", href: "/privacy", label: "Privacy Policy" },
];

const socials = [
  { key: "1", href: "https://facebook.com", label: "Facebook" },
  { key: "2", href: "https://twitter.com", label: "Twitter" },
];

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: '#FEF7FF',
          padding: 0, // Remove default padding
        }}
      >
        <CustomNavBar />
      </Header>
      {children}
      <CustomFooter
        subscription={subscriptions}
        copyright={copyright}
        socials={socials}
      />
    </Layout>
  );
};

export default CustomLayout;
