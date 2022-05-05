import { ProfileController } from "./profile";
import { MessageController } from "./message";
import OBACoreApi from "@onebro/oba-core-api";
import { ApiModelFactories } from "../factories";

export interface ApiModelControllers {
  profiles:ProfileController;
  messages:MessageController;
  init:(core:OBACoreApi) => Promise<ApiModelControllers>;
};

export class ApiModelControllers {constructor(){}
  init$ = async (core:OBACoreApi) => {
    const factories = await new ApiModelFactories().init(core);
    this.profiles = new ProfileController(core,factories);
    this.messages = new MessageController(core,factories);
    return this as ApiModelControllers;
  }
}

export * from "./profile";
export * from "./message";