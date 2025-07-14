import {
  RobotOutlined,
  SettingOutlined,
  DashboardOutlined,
  MessageOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  FundViewOutlined,
  BulbOutlined,
  FileAddOutlined,
  LockOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const MenuItemsStaff= [
  {
    label: "Danh Sách khóa học",
    key: "course-list",
    icon: <DashboardOutlined />,
    path: "/viewlistcourse",
  },
  {
    label: "Thêm khóa học",
    key: "addnew",
    icon: <RobotOutlined />,
    path: "/addnew",
  },
  {
    label: "Phản hồi từ Manager",
    key: "live-chat",
    icon: <MessageOutlined />,
    path: "/feedback",

  },
  {
    label: "Evaluation",
    key: "evaluation",
    icon: <FileAddOutlined />,
    path: "/evaluation",

  },
  {
    label: "Marketplace",
    key: "marketplace",
    icon: <ShopOutlined />,
    path: "/marketplace",

  },
  {
    label: "Invoices",
    key: "invoice",
    icon: <DollarOutlined />,
    path: "/invoice",

  },
  // Thêm mục mới cho manager
  {
    label: "Quản lý yêu cầu",
    key: "manager-request",
    icon: <SettingOutlined />, // Icon cho quản lý
    path: "/manager/request",  // Đường dẫn yêu cầu
  },
];
export const MenuItemsHeader = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",

  },

  {
    label: "Chat Tracking",
    key: "live-chat",
    icon: <MessageOutlined />,
    path: "/live-chat",

  },
  {
    label: "Evaluation",
    key: "evaluation",
    icon: <FileAddOutlined />,
    path: "/evaluation",

  },
  {
    label: "Marketplace",
    key: "marketplace",
    icon: <ShopOutlined />,
    path: "/marketplace",

  },
  {
    label: "Invoices",
    key: "invoice",
    icon: <DollarOutlined />,
    path: "/invoice",

  },
  // Thêm mục mới cho manager
  {
    label: "Quản lý yêu cầu",
    key: "manager-request",
    icon: <SettingOutlined />, // Icon cho quản lý
    path: "/manager/request",  // Đường dẫn yêu cầu
  },
];
