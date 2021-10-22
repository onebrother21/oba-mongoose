import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const planRouter = (O:ApiRouterNetwork) => J.desc("Plans",() => {
  it("Create Plans",async () => {
    const C = O.C.plans(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.plans[i] = await O.M.plans.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      J.is(o.user,O.J.profiles[i].id);
    }
  },1E9);
  it("Fetch Plans",async () => {
    const F = O.F.plans(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.plans.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Plans [Set & Push]",async () => {
    const U = O.U.plans(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.plans[i] = await O.M.plans.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Plans [Pull]",async () => {
    const U = O.U.plans(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.plans[i] = await O.M.plans.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Plans - Final Check",async () => {
    const F = O.F.plans(O.J);
    const o = await O.M.plans.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Saved");
    J.is(o.user,O.J.profiles[0].id);
  },1E9);
  it("Query Plans",async () => {
    const Q = O.Q.plans(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.plans.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,1);break;}
        case 1:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});