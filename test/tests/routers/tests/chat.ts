import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const chatRouter = (O:ApiRouterNetwork) => J.desc("Chats",() => {
  it("Create Chats",async () => {
    const C = O.C.chats(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.chats[i] = await O.M.chats.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{
          J.is(o.users[0].name,"Jack");
          J.is(o.users[1].name,"Jim");
          break;
        }
        default:break;
      }
    }
  },1E9);
  it("Fetch Chats",async () => {
    const F = O.F.chats(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.chats.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Chats [Set & Push]",async () => {
    const U = O.U.chats(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.chats[i] = await O.M.chats.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Chats [Pull]",async () => {
    const U = O.U.chats(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.chats[i] = await O.M.chats.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("**EXTENDED** Create Msg And Chat",async () => {
    const msgConfig = O.C.messages(O.J)[0];
    const req = {...msgConfig};
    const o = O.J.chats[1] = await O.M.chats.createMessage$(req);
    J.is(o);
    J.not(o,null);
  },1E9);
  it("**EXTENDED** Add Msg To Existing Chat",async () => {
    const msgConfig = O.C.messages(O.J)[1];
    const req = {params:{id:O.J.chats[1].id},...msgConfig};
    const o = O.J.chats[1] = await O.M.chats.addMessage$(req);
    J.is(o);
    J.not(o,null);
  },1E9);
  it("**EXTENDED** Remove Msg From Existing Chat",async () => {
    const req = {params:{id:O.J.chats[1].id,msg:O.J.chats[1].msgs[1].id}};
    const o = O.J.chats[1] = await O.M.chats.removeMessage$(req);
    J.is(o);
    J.not(o,null);
  },1E9);
  it("Fetch Chats - Final Check",async () => {
    const F = O.F.chats(O.J);
    const o = await O.M.chats.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Active");
    J.is(o.users[0].name,"Jack");
    J.is(o.users[1].name,"Jim");
  },1E9);
  it("Query Chats",async () => {
    const Q = O.Q.chats(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.chats.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,2);break;}
        case 1:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});