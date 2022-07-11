import {
  Keys,
  Extends,
  AnyBoolean,
  PropSelector,
  CommonPropSelector,
  TestProps,
} from "@onebro/oba-common";
import {
  Model,
  ModelSignature,
  ModelBaseTypeSig,
  Stages,
} from "../../../src";
import {ProfileAsProp} from "./profile";
import {MessageStatuses} from "../dicts";

export type MessageProps<t extends Stages> = CommonPropSelector<"title"|"slug"|"body"> & Record<"loc",string> & {test:TestProps;};
export type MessageRefs<t extends Stages> = {author:ProfileAsProp<0>[t];recipients:ProfileAsProp<1>[t];};
export type MessageMeta<t extends Stages> = {_type_:"message";published:Date;};

export type MessageConfigKeys = "author"|"body"|"loc";
export type MessageConfigOptKeys = "title"|"slug"|"recipients"|"test";
export type MessageInstanceKeys = MessageConfigKeys|MessageConfigOptKeys;
export type MessageJsonKeys = MessageInstanceKeys|"_type_"|"published";
export type MessagePreviewKeys = "author"|"body"|"published";

export type MessageSelfRefs = {"notes":{out:"P";arr:true}};
export type MessageMethods = {};

export type MessageAllProps<t extends Stages> = MessageProps<t> & MessageRefs<t> & MessageMeta<t>;
export type MessageAllPropKeys<t extends Stages> = Keys<MessageAllProps<t>>;
export type MessagePropSelector<t extends Stages,
k extends MessageAllPropKeys<t>,
j extends MessageAllPropKeys<t> = undefined> = PropSelector<MessageAllProps<t>,k,j>;
export type MessageSignature = ModelSignature<
MessagePropSelector<"C",MessageConfigKeys,MessageConfigOptKeys>,
MessagePropSelector<"I",MessageInstanceKeys> & MessageMethods,
MessagePropSelector<"J",MessageJsonKeys>,
MessagePropSelector<"J",MessagePreviewKeys>,
MessageStatuses,
MessageSelfRefs>;
export type Message = Model<MessageSignature>;
export type MessageAsProp<IsArr extends AnyBoolean> = ModelBaseTypeSig<
Extends<IsArr,true|1,string[],string>,
Extends<IsArr,true|1,Message["instance"],Message["instance"][]>,
Extends<IsArr,true|1,Message["preview"],Message["preview"][]>>;