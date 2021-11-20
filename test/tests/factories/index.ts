import {Jest} from "../../utils";
import {FactoryNetwork} from "./types";
import {profileFactory} from "./profile";
import {messageFactory} from "./message";

export const initFactoryTests = (O:FactoryNetwork<null>) => Jest.utils.desc("INIT",() => {
  it("Init DB & Factory Network",async () => {
    await Jest.utils.refreshDb();
    await O.init((await Jest.utils.init()).core);
  },1E9);
});
export const wrapupFactoryTests = ({instances}:FactoryNetwork<null>) => Jest.utils.desc("WRAPUP",() => {
  it("Log Models",async () => {
    const m:any = {};
    for(const k in instances){
      const K = k as keyof FactoryNetwork<null>["instances"];
      m[k] = instances[K].map((n:any) => n.json());
    }
    console.log(m.profiles[0]);
    console.log(m.messages[0]);
  },1E9);
});
export const factoryTests = () => Jest.utils.desc("MODEL FACTORY TESTS",() => {
  const O = new FactoryNetwork<null>();
  initFactoryTests(O);
  profileFactory(O);
  messageFactory(O);
  wrapupFactoryTests(O);
});