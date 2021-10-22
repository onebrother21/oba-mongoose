import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const authRouter = (O:ApiRouterNetwork) => J.desc("Auths",() => {
  it("Register",async () => {
    const req = O.C.auths(O.J)[0];
    const o = O.J.auths[0] = await O.M.auths.register$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Register **EXISTING EMAIL**",async () => {
    const req = O.C.auths(O.J)[0];
    try{await O.M.auths.register$(req);}
    catch(e){
      J.instance(e,Error);
      J.match(e.message,/user/,"i");
      J.match(e.message,/exist/);
    }
  },1E9);
  it("Set",async () => {
    const req = {body:{username:"jacob@gmail.com"}};
    const o = O.J.auths[0] = await O.M.auths.set$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("AutoSet",async () => {
    const req = {appuser:"jacob@gmail.com"};
    const o = O.J.auths[0] = await O.M.auths.autoset$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Verify **INVALID CODE**",async () => {
    const req = {body:{code:"8888"},appuser:"jacob@gmail.com",authtkn:{okto:"verify",next:"123456",role:"USER"}};
    try{await O.M.auths.verify$(req);}
    catch(e){
      J.instance(e,Error);
      J.match(e.message,/invalid/,"i");
      J.match(e.message,/code/);
    }
  },1E9);
  it("Verify",async () => {
    const req = {body:{code:"XOX-333"},appuser:"jacob@gmail.com",authtkn:{okto:"verify",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.verify$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Complete Acct **EXISTING USERNAME**",async () => {
    const req = {
      body:{$set:{
        handle:"Jenn",
        name:{first:"Jacob",last:"Swift"},
        dob:new Date("1980/09/27"),
        hometown:"Houston, TX",}},
      appuser:"jacob@gmail.com",
      authtkn:{okto:"complete",next:"123456",role:"USER"}};
    try{await O.M.auths.complete$(req);}
    catch(e){
      J.instance(e,Error);
      J.match(e.message,/exist/,"i");
      J.match(e.message,/user/);
    }
  },1E9);
  it("Complete Acct **EXISTING FULL NAME**",async () => {
    const req = {
      body:{$set:{
        handle:"Jacob",
        name:{first:"Jack",last:"Swift"},
        dob:new Date("1980/09/27"),
        hometown:"Houston, TX",}},
      appuser:"jacob@gmail.com",
      authtkn:{okto:"complete",next:"123456",role:"USER"}};
    try{await O.M.auths.complete$(req);}
    catch(e){
      J.instance(e,Error);
      J.match(e.message,/exist/,"i");
      J.match(e.message,/user/);
    }
  },1E9);
  it("Complete Acct",async () => {
    const req = {
      body:{
        $set:{
          status:{name:"Enabled"},
          name:{first:"Jacob",last:"Swift"},
          handle:"Jacob",
          dob:new Date("1980/09/27"),
          hometown:"Houston, TX",
          pin:"0000",
          contact:"text",
          phn:"1-888-888-8888",
        },
      },
      appuser:"jacob@gmail.com",
      authtkn:{okto:"complete",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.complete$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Login **INVALID PIN**",async () => {
    const req = {body:{pin:"8888"},appuser:"jacob",authtkn:{okto:"login",next:"123456",role:"USER"}};
    try{await O.M.auths.login$(req);}
    catch(e){
      J.instance(e,Error);
      J.match(e.message,/invalid/,"i");
      J.match(e.message,/pin/);
    }
  },1E9);
  it("Login",async () => {
    const req = {body:{pin:"0000"},appuser:"jacob",authtkn:{okto:"login",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.login$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Update Acct",async () => {
    const req = {
      body:{$set:{handle:"Jacob21",phn:"1-888-888-8882"}},
      appuser:"jacob",
      authtkn:{okto:"use-api",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.update$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Logout",async () => {
    const req = {appuser:"jacob21",authtkn:{okto:"use-api",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.logout$(req);
    J.is(o,null);
  },1E9);
  it("AutoSet",async () => {
    const req = {appuser:"jacob21"};
    const o = O.J.auths[0] = await O.M.auths.autoset$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
  },1E9);
  it("Login",async () => {
    const req = {body:{pin:"0000"},appuser:"jacob21",authtkn:{okto:"login",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.login$(req);
    J.is(o);
    J.not(o,null);
    J.type(o.token,"string");
    console.log(o);
  },1E9);
  /*it("Logout",async () => {
    const req = {appuser:"jacob21",authtkn:{okto:"use-api",next:"123456",role:"USER"}};
    const o = O.J.auths[0] = await O.M.auths.logout$(req);
    J.is(null);
  },1E9);
  */
});