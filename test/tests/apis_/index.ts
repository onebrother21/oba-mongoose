import {J} from "../utils";
import {allModels} from "../models";

export const allTests = () => J.desc("ALL TESTS",() => {
  allModels();
});