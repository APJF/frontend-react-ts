import React, { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  TrophyOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  LoginOutlined,
  AppstoreOutlined,
  MoonOutlined,
  SunOutlined,
  DownOutlined,
  BankOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Breadcrumb,
  theme,
  Button,
  Space,
  Dropdown,
  Modal,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicBreadcrumb from "@/app/Common/DynamicBreadcrumb";
import { Constant } from "@/utils/constant";
import { MenuItemsCommon } from "./MenuItems";
import { useTheme } from "@/hooks";

const { Header, Content, Footer, Sider } = Layout;

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true"
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  // const { toggleTheme, isDarkMode } = useTheme();

  const [isAddOrgModalVisible, setIsAddOrgModalVisible] = useState(false);
  const [addOrgForm] = Form.useForm();
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const MenuItems = MenuItemsCommon
    

  const handleModalCancel = () => {
    setIsAddOrgModalVisible(false);
    addOrgForm.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          position: "sticky",
          height: "100vh",
          top: 0,
          left: 0,
          backgroundColor: Constant.THEME.DARK_BG,
        }}
      >
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Link to="/dashboard">
            <img
              src={Constant.ASSET.LOGO_URL}
              style={{ maxWidth: collapsed ? "70%" : "30%", height: "auto" }}
            />
          </Link>
        </div>
        <Menu
          theme="dark"
          // defaultSelectedKeys={[location.pathname.split("/").pop() || ""]}
          selectedKeys={[
            MenuItems.find(
              (item) => item.key === location.pathname.split("/").pop()
            )?.key ||
              MenuItems.find((item) => location.pathname.includes(item.key))
                ?.key ||
              "",
          ]}
          mode="inline"
          style={{ backgroundColor: Constant.THEME.DARK_BG }}
        >
          {MenuItems.map(
            (item) =>
              (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              )
          )}
        </Menu>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              localStorage.setItem("collapsed", !collapsed + "");
              setCollapsed(!collapsed);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              border: "none",
              background: "transparent",
              color: "#9fa7ae",
            }}
          />
        </div>
      </Sider>

      <Layout style={{ position: "relative" }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            style={{
              fontSize: "16px",
              width: 32,
              height: 32,
              marginLeft: 16,
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            {(
              <>
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  onClick={() => navigate("/profile")}
                  style={{
                    fontSize: "16px",
                    width: 32,
                    height: 32,
                    margin: 6,
                  }}
                  title="Profile"
                />
              </>
            )}
            <Button
              type="text"
              // icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              // onClick={toggleTheme}
              style={{ fontSize: "16px", margin: "0 8px" }}
              title="Toggle Dark Mode"
            />
            {/* <Dropdown
              menu={{
                items: [
                  {
                    key: "English",
                    label: "English",
                    disabled: true,
                    style: { fontWeight: "bold", color: "#1890ff" },
                  },
                ],
                onClick: ({ key }) => {},
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                title="Change Language"
                type="text"
                icon={<GlobalOutlined />}
                style={{ fontSize: 16, width: 32, height: 32, margin: 6 }}
              />
            </Dropdown> */}
            <Button
              type="text"
              style={{
                fontSize: "16px",
                width: 32,
                height: 32,
                margin: 6,
                marginRight: 24,
              }}
            />
          </div>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <DynamicBreadcrumb />

          <div
            style={{
              padding: 24,
              minHeight: "75vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: "relative",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
