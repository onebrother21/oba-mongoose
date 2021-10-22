import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const notificationRouter = (O:ApiRouterNetwork) => J.desc("Notifications",() => {
  it("Create Notifications",async () => {
    const C = O.C.notifications(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.notifications[i] = await O.M.notifications.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.is(o.audience[0].name,"Jack");break;}
        default:break;
      }
    }
  },1E9);
  it("Fetch Notifications",async () => {
    const F = O.F.notifications(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.notifications.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Notifications [Set & Push]",async () => {
    const U = O.U.notifications(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.notifications[i] = await O.M.notifications.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Notifications [Pull]",async () => {
    const U = O.U.notifications(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.notifications[i] = await O.M.notifications.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Notifications - Final Check",async () => {
    const F = O.F.notifications(O.J);
    const o = await O.M.notifications.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Sent");
    J.instance(o.sent,Date);
    J.type(o.job,"string");
    J.is(o.method,"text");
    J.is(o.type,"welcome");
    J.is(o.audience[0].name,"Jack");
  },1E9);
  it("Query Notifications",async () => {
    const Q = O.Q.notifications(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.notifications.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,1);break;}
        case 1:{J.is(o.results.length,1);break;}
        case 2:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});