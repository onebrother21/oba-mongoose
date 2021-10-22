import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const profileRouter = (O:ApiRouterNetwork) => J.desc("Profiles",() => {
  it("Create Profiles",async () => {
    const C = O.C.profiles(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.profiles[i] = await O.M.profiles.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.is(o.name,"John");break;}
        case 1:{J.is(o.name,"Jim");break;}
        case 2:{J.is(o.name,"Jenn");break;}
      }
    }
  },1E9);
  it("Fetch Profiles",async () => {
    const F = O.F.profiles(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.profiles.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Profiles [Set & Push]",async () => {
    const U = O.U.profiles(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.profiles[i] = await O.M.profiles.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Profiles [Pull]",async () => {
    const U = O.U.profiles(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.profiles[i] = await O.M.profiles.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Profiles [Final Check]",async () => {
    const F = O.F.profiles(O.J);
    const o = await O.M.profiles.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Enabled");
    J.is(o.name,"Jack");
    J.is(o.role,"ADMIN");
    J.instance(o.permissions.cookies,Date);
  },1E9);
  it("Query Profiles",async () => {
    const Q = O.Q.profiles(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.profiles.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,1);break;}
        case 1:{J.is(o.results.length,0);break;}
        case 2:{J.is(o.results.length,2);break;}
      }
    }
  },1E9);
});