import {
  Keys,
  Extends,
  AnyBoolean,
  PropSelector,
  CommonPropSelector,
  SpecialType,
  Settings,
  InfoMap, 
} from "@onebro/oba-common";
import {
  Model,
  ModelSignature,
  ModelBaseTypeSig,
  Stages,
  StageGuard,
} from "../../../src";
import {
  ProfileStatuses,
  ProfileRoles,
  ProfilePermissions,
  ProfileSocials,
  ProfileStats,
} from "../dicts";

export type ProfileProps<t extends Stages> =
CommonPropSelector<"name"|"bio"|"motto"> &
SpecialType<ProfileRoles,StageGuard<t>,"role"> &
{
  settings:Settings<{optionsOnly:boolean;withBal:boolean}>;
  permissions:InfoMap<ProfilePermissions,Date,StageGuard<t>>;
  socials:InfoMap<ProfileSocials,string,StageGuard<t>>;
  stats:InfoMap<ProfileStats,number,StageGuard<t>>;
};
export type ProfileRefs<t extends Stages> = {};
export type ProfileMeta<t extends Stages> = {_type_:"profile";memberSince:Date;};

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

export type ProfileAllProps<t extends Stages> =  ProfileProps<t> & ProfileRefs<t> & ProfileMeta<t>;
export type ProfileAllPropKeys<t extends Stages> = Keys<ProfileAllProps<t>>;
export type ProfilePropSelector<
t extends Stages,
k extends ProfileAllPropKeys<t>,
j extends ProfileAllPropKeys<t> = undefined> = PropSelector<ProfileAllProps<t>,k,j>;
export type ProfileSignature = ModelSignature<
ProfilePropSelector<"C",ProfileConfigKeys,ProfileConfigOptKeys>,
ProfilePropSelector<"I",ProfileInstanceKeys> & ProfileMethods,
ProfilePropSelector<"J",ProfileJsonKeys>,
ProfilePropSelector<"J",ProfilePreviewKeys>,
ProfileStatuses,
ProfileSelfRefs>;
export type Profile = Model<ProfileSignature>;
export type ProfileAsProp<IsArr extends AnyBoolean,IsUser extends AnyBoolean = null> = ModelBaseTypeSig<
Extends<IsArr,true|1,string[],string>,
Extends<IsArr,true|1,Profile["instance"][],Profile["instance"]>,
Extends<IsArr,true|1,
Extends<IsUser,true|1,Profile["json"][],Profile["preview"][]>,
Extends<IsUser,true|1,Profile["json"],Profile["preview"]>>>;