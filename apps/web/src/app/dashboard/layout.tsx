"use client";
import React, { useState, useEffect } from "react";
import {
  CalendarOutlined,
  FlagOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import CustomBreadCrumb from "@ntla9aw/ui/src/components/molecules/CustomBreadCrumb";
import CustomNavBar from "@ntla9aw/ui/src/components/organisms/NavBar"; // Ensure this path is correct
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const navItems = [
  {
    key: "1",
    icon: <CalendarOutlined />,
    label: "Your Calendar",
    link: "/dashboard",
  },
  {
    key: "2",
    icon: <FlagOutlined />,
    label: "Event Manager",
    link: "/dashboard/events",
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Settings",
    link: "/dashboard/settings",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path using Next.js hook
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Effect to set selected key based on current path
  useEffect(() => {
    const selectedItem = navItems.find((item) => item.link === pathname); // Exact match with pathname
    if (selectedItem) {
      setSelectedKey(selectedItem.key);
    } else {
      setSelectedKey(null); // Clear selection if no match
    }
  }, [pathname]); // Run effect whenever pathname changes

  const handleMenuClick = (e) => {
    const selectedItem = navItems.find((item) => item.key === e.key);
    if (selectedItem) {
      router.push(selectedItem.link);
      setSelectedKey(e.key); // Update selected key on menu click
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#FEF7FF" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FEF7FF",
          padding: 0,
        }}
      >
        <CustomNavBar />
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "#FEF7FF", width: 30 }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey || "1"]} // Fallback to first key if null
            items={navItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FEF7FF",
            }}
          >
            <Space size={16}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <CustomBreadCrumb />
            </Space>
          </Header>
          <Content
            style={{
              padding: "1em",
              backgroundColor: "#FFF9D0", // Set background color for the Content
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
