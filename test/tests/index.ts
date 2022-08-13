import {J} from "../utils";
import {factoryTests} from "./factories";
import {controllerTests} from "./controllers";
import OB from "@onebro/oba-common";

export const allTests = () => J.desc("ALL TESTS",() => {
  const intro = "AppName: "+OB.appEnvName()+", Environment: "+OB.env()?.toLocaleUpperCase();
  OB.ok("**tests started**",intro);
  factoryTests();
  controllerTests();
});