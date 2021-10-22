import { Keys } from "@onebro/oba-common";
import {
  ModelStages,
  CommonPropSelector,
  ModelPropSelector,
  ModelSignatureKeys,
  ModelType,
  ModelTypes,
  ModelAsPropTypes,
  IsObjectId,
  SpecialType,
  Settings,
  InfoHashMap,
  Extends,
  AnyBoolean,
} from "../../../src";
import {
  ProfileStatuses,
  ProfileRoles,
  ProfilePermissions,
  ProfileSocials,
  ProfileStats,
} from "../dicts";

export type ProfileProps<t extends ModelStages> =
CommonPropSelector<"name"|"bio"|"motto"> &
SpecialType<ProfileRoles,t,"role"> &
{
  settings:Settings<{optionsOnly:boolean;withBal:boolean}>;
  permissions:InfoHashMap<ProfilePermissions,Date,t>;
  socials:InfoHashMap<ProfileSocials,string,t>;
  stats:InfoHashMap<ProfileStats,number,t>;
};
export type ProfileRefs<t extends ModelStages> = {};
export type ProfileMeta<t extends ModelStages> = {_type_:"profile";memberSince:Date;};

export type ProfileConfigKeys = "name"|"role";
export type ProfileConfigOptKeys = "bio"|"motto"|"settings"|"permissions"|"socials"|"stats";
export type ProfileInstanceKeys = ProfileConfigKeys|ProfileConfigOptKeys;
export type ProfileJsonKeys = ProfileInstanceKeys|"_type_"|"memberSince";
export type ProfilePreviewKeys = "name"|"memberSince";

export type ProfileSelfRefs = {
  followers:{out:"P";arr:1};
  following:{out:"P";arr:true};
  endorsements:{out:"P";arr:true};
};
export type ProfileMethods = {};

export type ProfileAllProps<t extends ModelStages> =  ProfileProps<t> & ProfileRefs<t> & ProfileMeta<t>;
export type ProfileAllPropKeys<t extends ModelStages> = Keys<ProfileAllProps<t>>;
export type ProfilePropSelector<
t extends ModelStages,
k extends ProfileAllPropKeys<t> = undefined,
j extends ProfileAllPropKeys<t> = undefined> = ModelPropSelector<ProfileAllProps<t>,k,j>;
export type ProfileTypes = ModelTypes<
ProfilePropSelector<"C",ProfileConfigKeys,ProfileConfigOptKeys>,
ProfilePropSelector<"I",ProfileInstanceKeys> & ProfileMethods,
ProfilePropSelector<"J",undefined,ProfileJsonKeys>,
ProfilePropSelector<"J",undefined,ProfilePreviewKeys>,
ProfileStatuses,
ProfileSelfRefs>;
export type Profile<k extends ModelSignatureKeys<ProfileTypes>> = ModelType<ProfileTypes,k>;
export type ProfileAsProp<IsArr extends AnyBoolean,IsUser extends AnyBoolean = undefined> = ModelAsPropTypes<
Extends<IsArr,true|1,IsObjectId[],IsObjectId>,
Extends<IsArr,true|1,Profile<"instance">[],Profile<"instance">>,
Extends<IsArr,true|1,
Extends<IsUser,true|1,Profile<"json">[],Profile<"preview">[]>,
Extends<IsUser,true|1,Profile<"json">,Profile<"preview">>>>;