import React from "react";
import Link from "next/link";
import SearchInput from "../atoms/SearchInput";
import { Brand } from "../atoms/Brand";
import { Menu } from "antd";
import { useSession } from "next-auth/react";
// Define the navigation items
const navItems = [
  {
    label: "Book Events",
    key: "book-events",
    href: "/home/featured", // Link to the home page
  },
  {
    label: "Create Events",
    key: "create-events",
    href: "/dashboard/events", // Link to the about page
  },
];

const authNavItems = [
  {
    label: "Profile",
    key: "profile",
    href: "/home/profile", // Link to the profile page
  },
  {
    label: "Dashboard",
    key: "dashboard",
    href: "/dashboard", // Link to the dashboard page
  },
  {
    label: "Logout",
    key: "logout",
    href: "/logout", // Link to the logout page
  },
];

const unauthNavItems = [
  {
    label: "Login",
    key: "login",
    href: "/auth/signin", // Link to the login page
  },
  {
    label: "Signup",
    key: "signup",
    href: "/auth/register", // Link to the signup page
  },
];

const CustomNavBar: React.FC = () => {
  const {status:isAuthenticated} = useSession()
  const handleSearch = (tag: string, location: string) => {
    // Construct the URL with query parameters
    const tagQueryString = tag ? `tag=${tag}` : '';
    const cityQueryString = location ? `city=${location}` : '';
    
    const queryString = [tagQueryString, cityQueryString].filter(Boolean).join('&');
    
    if (queryString) {
      window.location.href = `/home/explore?${queryString}`;
    }
    
    console.log("Searched values:", tag, location);
    // Implement additional search logic if needed
  };
  return (
    <Menu
      mode="horizontal"
      style={{
        flex: 1,
        background: "none",
        backgroundColor: "#FEF7FF",
        justifyContent: "space-between",
      }}
    >
      <Menu.Item>
        <Brand />
      </Menu.Item>
      <Menu.Item>
        <SearchInput onSearch={handleSearch} />
      </Menu.Item>
      {navItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link href={item.href}>{item.label}</Link>
        </Menu.Item>
      ))}
      {isAuthenticated === "authenticated" ? (
        authNavItems.map((item) => (
          <Menu.Item key={item.key}>
            <Link href={item.href}>{item.label}</Link>
          </Menu.Item>
        ))
      ) : (
        unauthNavItems.map((item) => (
          <Menu.Item key={item.key}>
            <Link href={item.href}>{item.label}</Link>
          </Menu.Item>
        ))
      )}
    </Menu>
  );
};

export default CustomNavBar;