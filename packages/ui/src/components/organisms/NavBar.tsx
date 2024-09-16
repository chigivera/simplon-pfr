"use client"
import React from "react";

import Link from "next/link";
import SearchInput from "../atoms/SearchInput";
import { Brand } from "../atoms/Brand";
import { Menu } from "antd";


// Define the navigation items
const navItems = [
  {
    label: "Book Events",
    key: "book-events",
    href: "/book", // Link to the home page
  },
  {
    label: "Create Events",
    key: "create-events",
    href: "/create", // Link to the about page
  },
  {
    label: "Login",
    key: "login",
    href: "/signin", // Link to the contact page
  },
  {
    label: "Signup",
    key: "signup",
    href: "/register", // Link to the contact page
  },
];

const CustomNavBar: React.FC = () => {

  const handleSearch = (value: string) => {
    console.log("Searched value:", value);
    // Implement your search logic here
  };
  return (
   
        <Menu mode="horizontal"  style={{ flex: 1, background: "none",backgroundColor:'white',justifyContent:'space-between' }}>
            <Menu.Item>
                <Brand/>
            </Menu.Item>
          <Menu.Item>
            <SearchInput onSearch={handleSearch} />
          </Menu.Item>
          {navItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>

  );
};

export default CustomNavBar;
