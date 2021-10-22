import {Jest} from "../utils";
import {factoryTests} from "./factories";
import {controllerTests} from "./controllers";

export const allTests = () => Jest.utils.desc("ALL TESTS",() => {
  factoryTests();
  controllerTests();
});