import { Keys,OPick } from "@onebro/oba-common";
import {
  ModelStages,
  CommonPropSelector,
  ModelPropSelector,
  ModelSignatureKeys,
  ModelType,
  ModelTypes,
  ModelAsPropTypes,
  IsObjectId,
  Extends,
  AnyBoolean,
} from "../../../src";
import {ProfileAsProp} from "./profile";
import {MessageStatuses} from "../dicts";

export type MessageProps<t extends ModelStages> = CommonPropSelector<"title"|"slug"|"body"> & Record<"loc",string>;// & {test:TestProps;};
export type MessageRefs<t extends ModelStages> = {author:ProfileAsProp<0>[t];recipients:ProfileAsProp<1>[t];};
export type MessageMeta<t extends ModelStages> = {_type_:"message";published:Date;};

export type MessageConfigKeys = "author"|"body"|"loc";
export type MessageConfigOptKeys = "title"|"slug"|"recipients";
export type MessageInstanceKeys = MessageConfigKeys|MessageConfigOptKeys;
export type MessageJsonKeys = MessageInstanceKeys|"_type_"|"published";
export type MessagePreviewKeys = "author"|"body"|"published";

export type MessageSelfRefs = {"notes":{out:"P";arr:true}};
export type MessageMethods = {};

export type MessageAllProps<t extends ModelStages> = MessageProps<t> & MessageRefs<t> & MessageMeta<t>;
export type MessageAllPropKeys<t extends ModelStages> = Keys<MessageAllProps<t>>;
export type MessagePropSelector<
t extends ModelStages,
k extends MessageAllPropKeys<t> = undefined,
j extends MessageAllPropKeys<t> = undefined> = ModelPropSelector<MessageAllProps<t>,k,j>;
export type MessageTypes = ModelTypes<
MessagePropSelector<"C",MessageConfigKeys,MessageConfigOptKeys>,
MessagePropSelector<"I",MessageInstanceKeys> & MessageMethods,
MessagePropSelector<"J",undefined,MessageJsonKeys>,
MessagePropSelector<"J",undefined,MessagePreviewKeys>,
MessageStatuses,
MessageSelfRefs>;
export type Message<k extends ModelSignatureKeys<MessageTypes>> = ModelType<MessageTypes,k>;
export type MessageAsProp<IsArr extends AnyBoolean> = ModelAsPropTypes<
Extends<IsArr,true|1,IsObjectId[],IsObjectId>,
Extends<IsArr,true|1,Message<"instance">,Message<"instance">[]>,
Extends<IsArr,true|1,Message<"preview">,Message<"preview">[]>>;