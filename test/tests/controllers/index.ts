import {J} from "../../utils";
import {App} from "../../app";
import {ControllerNetwork} from "./types";
import {profileController} from "./profile";
import {messageController} from "./message";

export const initControllerTests = (O:ControllerNetwork) => J.desc("INIT",() => {
  it("Init DB & Controller Network",async () => {
    await App.refresh();
    await O.init(await App.initCore());
  },1E9);
});
export const wrapupControllerTests = ({jsons}:ControllerNetwork) => J.desc("WRAPUP",() => {
  it("Log Models",async () => {
    console.log(jsons.profiles[0]);
    //console.log(jsons.messages[0]);
  },1E9);
});
export const controllerTests = () => J.desc("MODEL CONTROLLER TESTS",() => {
  const O = new ControllerNetwork();
  initControllerTests(O);
  profileController(O);
  messageController(O);
  wrapupControllerTests(O);
});
