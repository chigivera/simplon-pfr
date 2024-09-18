"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import CustomBreadCrumb from "@ntla9aw/ui/src/components/molecules/CustomBreadCrumb";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#FEF7FF" }}>
      {" "}
      {/* Set background color for the entire layout */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#FEF7FF", width: 30 }}
      >
        {" "}
        {/* Set background color for the Sider */}
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "User Management",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Video Library",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Upload Media",
            },
          ]}
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
          {" "}
          {/* Set background color for the Header */}
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
            backgroundColor: "#FFF9D0", // Set background color for the Content
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
