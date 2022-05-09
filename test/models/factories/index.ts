import { ProfileFactory } from "./profile";
import { MessageFactory } from "./message";
import OBACore from "@onebro/oba-core";
import { Enum } from "@onebro/oba-common";

export type ApiModelFactoriesType = Enum<any,"profiles"|"messages">;
export interface ApiModelFactories extends ApiModelFactoriesType {
  profiles:ProfileFactory;
  messages:MessageFactory;
  init:(core:OBACore) => Promise<ApiModelFactories>;
};
export class ApiModelFactories {
  init = async (core:OBACore) => {
    this.profiles = new ProfileFactory(core);
    this.messages = new MessageFactory(core);
    await this.profiles.init();
    await this.messages.init();
    return this as ApiModelFactories;
  }
}
export * from "./profile";
export * from "./message";