export type ApiUserRoles = {
  G:"GUEST";
  U:"USER";
  A:"ADMIN";
  S:"SUPER";
  Y:"_SA_";
};
export const ApiUserRoles:ApiUserRoles = {
  G:"GUEST",
  U:"USER",
  A:"ADMIN",
  S:"SUPER",
  Y:"_SA_",
};
export type ApiUserStatuses = {
  S0:"New";
  S1:"Authenticated";
  S2:"Enabled";
  S3:"Verified";
  S4:"Locked";
  S5:"Disabled";
  S6:"Deleted";
  S7:"Inactive";
  S8:"Offline";
};
export const ApiUserStatuses:ApiUserStatuses = {
  S0:"New",
  S1:"Authenticated",
  S2:"Enabled",
  S3:"Verified",
  S4:"Locked",
  S5:"Disabled",
  S6:"Deleted",
  S7:"Inactive",
  S8:"Offline",
};
export type ApiDocStatuses = {
  S0:"New";
  S1:"Active";
  S2:"Inactive";
  S3:"Saved";
  S4:"Locked";
  S5:"Seen";
  S6:"Sent";
  S7:"Deleted";
};
export const ApiDocStatuses:ApiDocStatuses = {
  S0:"New",
  S1:"Active",
  S2:"Inactive",
  S3:"Saved",
  S4:"Locked",
  S5:"Seen",
  S6:"Sent",
  S7:"Deleted",
};
