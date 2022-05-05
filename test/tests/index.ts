import {J} from "../utils";
import {factoryTests} from "./factories";
import {controllerTests} from "./controllers";

export const allTests = () => J.desc("ALL TESTS",() => {
  factoryTests();
  controllerTests();
});