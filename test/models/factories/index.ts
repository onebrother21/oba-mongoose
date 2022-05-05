import { ProfileFactory } from "./profile";
import { MessageFactory } from "./message";
import OBACoreApi from "@onebro/oba-core-api";
import { Enum } from "@onebro/oba-common";

export type ApiModelFactoriesType = Enum<any,"profiles"|"messages">;
export interface ApiModelFactories extends ApiModelFactoriesType {
  profiles:ProfileFactory;
  messages:MessageFactory;
  init:(core:OBACoreApi) => Promise<ApiModelFactories>;
};
export class ApiModelFactories {
  init = async (core:OBACoreApi) => {
    this.profiles = new ProfileFactory(core);
    this.messages = new MessageFactory(core);
    await this.profiles.init();
    await this.messages.init();
    return this as ApiModelFactories;
  }
}
export * from "./profile";
export * from "./message";