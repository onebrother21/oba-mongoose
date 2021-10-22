import {J,refreshDb} from "../utils";
import {ApiRouterNetwork} from "./main";
import {mainRouterTests} from "./tests";

export const initRouterTests = (O:ApiRouterNetwork) => J.desc("INIT",() => {
  it("Init DB & Router Network",async () => {
    await refreshDb();
    await O.init();
  },1E9);
});
export const wrapupRouterTests = ({J}:ApiRouterNetwork) => J.desc("WRAPUP",() => {
  it("Log Models",async () => {
    console.log(J.auths[0]);
    console.log(J.auths[0].profiles[0]);
    console.log(J.plans[0]);
    console.log(JSON.parse(JSON.stringify(J.plans[0].trades)));
    console.log(J.chats[0]);
  },1E9);
});
export const allRouters = () => J.desc("MODEL Router TESTS",() => {
  initRouterTests(O);
  mainRouterTests(O);
  wrapupRouterTests(O);
});
