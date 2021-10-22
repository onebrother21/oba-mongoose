/*
import {DeepPartial,IActionsCreator,IInstance,longId,encrypt,decrypt} from "@onebro/oba-common";
import {AppMaster} from "@onebro/appmaster";
import {
  OBAuthAcctActions,
  OBAuthJson,
  OBAuthAcct,
  OBAuthTokenData,
  OBAuthId,
  OBAuthAcctModelMap,
  OBAuthAcctInstanceMap,
  OBAuthAcctRoles,
  OBAuthAcctRole,
  OBAuthIdLastAction} from "../00-ob-auth/types";
import {generateTkn,verifyTkn,mapUserRole} from "../../utils";
import {notifyUser,notifications} from "../../utils";
const secret = process.env.OBA_API_AUTH_SECRET;
const key = process.env.OBA_API_EKEY;

const wrapup = async (o:OBAuthAcctInstanceMap) => {
  const json:any = {};
  const getNextAction = () => {
    if(!o) return null;
    const doLogin:OBAuthIdLastAction[] = ["set","created","reset"];
    switch(true){
      case o.authId && !o.authId.verified:return "verify";
      case o.creds && !o.creds.pin:return "create";
      case o.creds && !!o.creds.reset:return "reset";
      case o.authId && doLogin.includes(o.authId.action):return "login";
      default:return "auth";}};
  const refreshTkn = () => {
    const next = longId();
    const role = OBAuthAcctRoles[o.acct.role];
    const token = generateTkn({next:encrypt(key,next),role,okto},secret);
    o.authId.next = token;
    o.creds.next = next;
    o.acct.next = next;};
  const okto = getNextAction();
  if(okto) refreshTkn();
  for(const k in o){
    const p = await (o[k as keyof OBAuthAcctInstanceMap] as IInstance).save();
    Object.assign(json,okto && (okto == "auth" || k == "authId")?p.json():null);}
  delete json.id;
  return json as OBAuthJson;};
export const obAuthAcctActions:IActionsCreator<AppMaster>  = async (m,{OBAuthAcct,OBAuthId,OBAuthCreds}:OBAuthAcctModelMap) => {
  const actions:OBAuthAcctActions = {
    register$:async ({body:{email,role,location}}) => await Promise.resolve()
      .then(async () => ({
        authId:await OBAuthId._create({email}),
        acct:await OBAuthAcct._create({role:mapUserRole(OBAuthAcctRoles,role) as OBAuthAcctRole,location}),
        creds:await OBAuthCreds._create(null)}))
      .then(async o => {
        const code = "XOX-333";//numId(6,"-",2);
        await o.authId.setCode(code);
        await notifyUser({
          type:"verification",
          method:o.acct.contact?o.acct.contact.method:"email",
          user:o.authId.email,
          data:{...notifications.verification,code}});
        o.authId.action = "registered";
        return o;})
      .then(async o => await wrapup(o)),
    set$:async ({body:{username}}) => await Promise.resolve()
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => [authId,await verifyTkn("Bearer "+ authId.next,secret)])
      .then(async ([authId,authtkn]:[OBAuthId,OBAuthTokenData]) => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,authtkn.next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,authtkn.next)})}))
      .then(async o => {o.authId.action = "set";return o;})
      .then(async o => await wrapup(o)),
    autoset$:async ({appuser:username}) => await Promise.resolve()
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => [authId,verifyTkn("Bearer "+ authId.next,secret)])
      .then(async ([authId,authtkn]:[OBAuthId,OBAuthTokenData]) => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,authtkn.next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,authtkn.next)})}))
      .then(async o => {o.authId.action = "set";return o;})
      .then(async o => await wrapup(o)),
    verify$:async ({body:{code},appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "verify") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => ({...o,acct:await o.acct.valid()}))
      .then(async o => ({...o,authId:await o.authId.valid(code)}))
      .then(async o => {
        if(o.creds.attempts){
          if(o.creds.attempts == 5) o.acct.status = [...o.acct.status,{name:"L",time:new Date()}];
            await o.acct.save();
            await o.creds.save();
          throw m.e.mismatch("username or pin");}
        //o.acct.status = [...o.acct.status,{name:"A",time:new Date()}]; why am i adding an auth status after verification??
        o.acct.lastStatus = {name:"V",time:new Date()};
        o.authId.action = "verified";
        return o;})
      .then(async o => await wrapup(o)),
    create$:async ({body:updates,appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "create") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => {
        await OBAuthId._update(o.authId,updates);
        await OBAuthCreds._update(o.creds,updates);
        await OBAuthAcct._update(o.acct,updates);
        return o;})
      .then(async o => {
        await notifyUser({
          type:"welcome",
          method:o.acct.contact?o.acct.contact.method:"email",
          user:o.authId.email,
          data:{...notifications.welcome}});
        o.acct.updated = new Date();
        o.authId.action = "created";
        return o;})
      .then(async o => await wrapup(o)),
    update$:async ({body:updates,appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "auth") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => {
        await OBAuthId._update(o.authId,updates);
        await OBAuthCreds._update(o.creds,updates);
        await OBAuthAcct._update(o.acct,updates);
        return o;})
      .then(async o => {
        o.acct.updated = new Date();
        o.authId.action = "updated";
        return o;})
      .then(async o => await wrapup(o)),
    remove$:async ({params:{id},authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "auth") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find(id))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => {return o;})
      .then(async o => await wrapup(o)),
    login$:async ({body:{pin},appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "login") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => ({...o,acct:await o.acct.valid(),creds:await o.creds.valid({pin})}))
      .then(async o => {
        if(o.creds.attempts){
          if(o.creds.attempts == 5) o.acct.lastStatus = {name:"L",time:new Date()};
          await o.acct.save();
          await o.creds.save();
          throw m.e.mismatch("username or pin");}
        o.acct.lastStatus = {name:"A",time:new Date()};
        o.authId.action = "authenticated";
        return o;})
      .then(async o => await wrapup(o)),
    forgot$:async ({appuser:username}) => await Promise.resolve()
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => [authId,verifyTkn("Bearer "+ authId.next,secret)])
      .then(async ([authId,authtkn]:[OBAuthId,OBAuthTokenData]) => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,authtkn.next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,authtkn.next)})}))
      .then(async o => {
        o.creds.reset = "okiedokie";//await randomId(16);
        await notifyUser({
          type:"resetPin",
          method:o.acct.contact.method,
          user:o.acct.contact.method == "email"?o.authId.email:o.acct.contact.phn,
          data:{...notifications.resetPin,resetme:o.creds.reset}});
        return o;})
      .then(async o => await wrapup(o)),
    reset$:async ({query:{resetme:reset},body:{pin},appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "reset") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => ({...o,acct:await o.acct.valid(),creds:await o.creds.valid({reset:reset as string})}))
      .then(async o => {
        if(o.creds.attempts){
          if(o.creds.attempts == 5) o.acct.lastStatus = {
            name:"L",
            time:new Date(),
            info:{msg:"**locked using reset token**"}};
            await o.acct.save();
            await o.creds.save();
          throw m.e.mismatch("pin reset token");}
        await o.creds.setPin(pin);
        o.acct.lastStatus = {name:"E",time:new Date()};
        o.authId.action = "reset";
        return o;})
      .then(async o => await wrapup(o)),
    logout$:async ({appuser:username,authtkn:{next,okto}}) => await Promise.resolve()
      .then(() => {if(okto !== "auth") throw m.e.unauthorized("api privileges");})
      .then(() => OBAuthId._find({$or:[{email:username},{handle:username}]}))
      .then(async authId => ({
        authId,
        acct:await OBAuthAcct._find({next:decrypt(key,next)}),
        creds:await OBAuthCreds._find({next:decrypt(key,next)})}))
      .then(async o => {return o;})
      .then(async () => await wrapup(null)),
    updateMany$:async ({body:{ids,updates}}:{body:{ids:string[];updates:DeepPartial<OBAuthAcct>}}) => await Promise.resolve()
      //.then(() => {if(okto !== "auth") throw m.e.unauthorized("api privileges");})
      //.then(() => {if(role !== "Admin") throw m.e.unauthorized("api privileges");})
      .then(async () => {
        if(ids.length){
          const arr:OBAuthAcct[] = [];
          for(let i = 0,l = ids.length;i<l;i++){
            const o = await OBAuthAcct._find(ids[i]);
            await OBAuthAcct._populate(o);
            arr.push(o);}
          return arr;}
        return await OBAuthAcct.find();})
      .then(async o => {
        for(let i = 0,l = ids.length;i<l;i++){
          await OBAuthAcct._update(o[i],updates);
          await o[i].save();}
        return o.length;})
      .then(n => ({updated:n} as any)),
    removeMany$:async ({body:{ids}}:{body:{ids:string[]}}) => await Promise.resolve()
      //.then(() => {if(okto !== "auth") throw m.e.unauthorized("api privileges");})
      //.then(() => {if(role !== "Admin") throw m.e.unauthorized("api privileges");})
      .then(async () => {
        if(ids.length){
          const arr:OBAuthAcct[] = [];
          for(let i = 0,l = ids.length;i<l;i++){
            const o = await OBAuthAcct._find(ids[i]);
            await OBAuthAcct._populate(o);
            arr.push(o);}
          return arr;}
        return await OBAuthAcct.find();})
      .then(async o => {
        for(let i = 0,l = o.length;i<l;i++) await o[i].remove();
        return o.length;})
      .then(n => ({removed:n} as any)),
    fetch$:async ({params:{id},appuser:username,authtkn:{next,okto}}) => await Promise.resolve({created:null,updated:null}),
    query$:async ({query,appuser:username,authtkn:{next,okto}}) => await Promise.resolve({results:[]}),
    search$:async ({query,appuser:username,authtkn:{next,okto}}) => await Promise.resolve({results:[]}),
  };
  return actions;
};
*/