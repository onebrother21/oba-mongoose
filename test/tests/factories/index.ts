import {J} from "../../utils";
import {App} from "../../app";
import {FactoryNetwork} from "./types";
import {ProfileFactoryTests} from "./profile";
import {MessageFactoryTests} from "./message";

export const initFactoryTests = (O:FactoryNetwork) => J.desc("INIT",() => {
  it("Init DB & Factory Network",async () => {
    await App.refresh();
    await O.init(await App.initCore());
  },1E9);
});
export const wrapupFactoryTests = ({instances}:FactoryNetwork) => J.desc("WRAPUP",() => {
  it("Log Models",async () => {
    const m:any = {};
    for(const k in instances){
      const K = k as keyof FactoryNetwork["instances"];
      m[k] = instances[K].map((n:any) => n.json());
    }
    console.log(m.profiles[0]);
    console.log(m.messages[0]);
  },1E9);
});
export const factoryTests = () => J.desc("MODEL FACTORY TESTS",() => {
  const O = new FactoryNetwork();
  initFactoryTests(O);
  ProfileFactoryTests(O);
  MessageFactoryTests(O);
  wrapupFactoryTests(O);
});