import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const messageRouter = (O:ApiRouterNetwork) => J.desc("Messages",() => {
  it("Create Messages",async () => {
    const C = O.C.messages(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.messages[i] = await O.M.messages.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.is(o.author.name,"Jack");break;}
        case 1:{J.is(o.author.name,"Jim");break;}
        case 2:{J.is(o.author.name,"Jenn");break;}
        default:break;
      }
    }
  },1E9);
  it("Fetch Messages",async () => {
    const F = O.F.messages(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.messages.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Messages [Set & Push]",async () => {
    const U = O.U.messages(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.messages[i] = await O.M.messages.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Messages [Pull]",async () => {
    const U = O.U.messages(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.messages[i] = await O.M.messages.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Messages - Final Check",async () => {
    const F = O.F.messages(O.J);
    const o = await O.M.messages.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name.toLocaleUpperCase(),"SEEN");
    J.is(o.author.name,"Jack");
  },1E9);
  it("Query Messages",async () => {
    const Q = O.Q.messages(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.messages.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,3);break;}
        case 1:{J.is(o.results.length,1);break;}
        case 2:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});