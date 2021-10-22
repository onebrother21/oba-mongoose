import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";
import {profileRouter} from "./profile";
import {uploadRouter} from "./upload";
import {messageRouter} from "./message";
import {tradeRouter} from "./trade";
import {planRouter} from "./plan";
import {chatRouter} from "./chat";
import {appUserRouter} from "./app-user";
import {notificationRouter} from "./notification";
import {authRouter} from "./auth";

export const mainRouterTests = (O:ApiRouterNetwork) => J.desc("RouterS",() => {
  profileRouter(O);
  appUserRouter(O);
  authRouter(O);
  uploadRouter(O);
  messageRouter(O);
  tradeRouter(O);
  planRouter(O);
  chatRouter(O);
  notificationRouter(O);
});