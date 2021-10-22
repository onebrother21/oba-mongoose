import {ApiUserRoles,ApiUserStatuses} from "./common";

/** PROFILE COMMON PROPS */
export type ProfileRoles = ApiUserRoles;
export const ProfileRoles = ApiUserRoles;

export type ProfileStatuses = ApiUserStatuses;
export const ProfileStatuses = ApiUserStatuses;

export type ProfilePermissions = {"K":"cookies";"L":"location";"G":"gallery";"C":"camera";"V":"video";"F":"files"};
export const ProfilePermissions:ProfilePermissions = {"K":"cookies","L":"location","G":"gallery","C":"camera","V":"video","F":"files"};

export type ProfileSocials = {"fb":"fb";"tw":"tw";"go":"go";"rd":"rd";"pin":"pin";};
export const ProfileSocials:ProfileSocials = {"fb":"fb","tw":"tw","go":"go","rd":"rd","pin":"pin"};

export type ProfileStats = {"V":"views";};
export const ProfileStats:ProfileStats = {"V":"views"};