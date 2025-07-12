import { HttpStatusCode } from "axios";

export const Constant = {
  SUCCESS: {
    SUCCESS: "Success!",
    DATA_FETCHED: "Get data successfully!",
    DATA_SAVED: "Saved successfully!",
    DATA_UPDATED: "Updated successfully!",
    DATA_DELETED: "Deleted successfully!",
    AUTHENTICATED: "Authenticated successfully!",
  },
  ERROR: {
    FAIL: "Failed!",
    REQUEST: "An error occurred!",
    RESPONSE: "An error occurred!",
    UNAUTHENTICATED: "Authentication failed!",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    SERVER_ERROR: "A system error has occurred!",
    NOT_FOUND: "Not found.",
    TIMEOUT: "Disconnected from the server.",
  },
  ASSET: {
    APP_NAME: import.meta.env.VITE_APP_NAME || "Chat Bees",
    LOGO_URL: import.meta.env.VITE_LOGO_URL || "/logo.svg",
  },
  THEME: {
    THEME_COLOR: "#aee5dc",
    YELLOW: "#D4A400",
    BLUE: "#51A7BF",
    GRAY: "#575757",
    LIGHT_GRAY: "#bfbfbf",
    DARK_BG: "#212121",
    WHITE: "#fff",
    BLACK: "#000",
  }
};

export const STATUS_CODE_OK = [
  HttpStatusCode.Ok,
  HttpStatusCode.Accepted,
  HttpStatusCode.Created,
];
