import { ProfileSignature } from "./profile";
import { MessageSignature } from "./message";

export type ApiModelSignatures = {
  "profiles":ProfileSignature;
  "messages":MessageSignature;
};

export * from "./profile";
export * from "./message";