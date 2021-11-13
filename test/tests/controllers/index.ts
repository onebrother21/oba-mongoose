import {Jest} from "../../utils";
import {ControllerNetwork} from "./types";
import {profileController} from "./profile";
import {messageController} from "./message";

export const initControllerTests = (O:ControllerNetwork<null>) => Jest.utils.desc("INIT",() => {
  it("Init DB & Controller Network",async () => {
    await Jest.utils.refreshDb();
    await O.init((await Jest.utils.initCore()).core);
  },1E9);
});
export const wrapupControllerTests = ({jsons}:ControllerNetwork<null>) => Jest.utils.desc("WRAPUP",() => {
  it("Log Models",async () => {
    console.log(jsons.profiles[0]);
    console.log(jsons.messages[0]);
  },1E9);
});
export const controllerTests = () => Jest.utils.desc("MODEL CONTROLLER TESTS",() => {
  const O = new ControllerNetwork<null>();
  initControllerTests(O);
  profileController(O);
  messageController(O);
  wrapupControllerTests(O);
});
