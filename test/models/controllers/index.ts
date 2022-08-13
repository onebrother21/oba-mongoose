import OBACore from "@onebro/oba-core";
import { ProfileController } from "./profile";
import { MessageController } from "./message";
import { ApiModelFactories } from "../factories";

export interface ApiModelControllers {
  profiles:ProfileController;
  messages:MessageController;
  init:(core:OBACore) => Promise<ApiModelControllers>;
};

export class ApiModelControllers {constructor(){}
  init$ = async (core:OBACore) => {
    const factories = await new ApiModelFactories().init(core);
    this.profiles = new ProfileController(core,factories);
    this.messages = new MessageController(core,factories);
    return this as ApiModelControllers;
  }
}

export * from "./profile";
export * from "./message";