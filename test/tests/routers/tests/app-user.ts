import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const appUserRouter = (O:ApiRouterNetwork) => J.desc("AppUsers",() => {
  it("Create AppUsers",async () => {
    const C = O.C.users(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.users[i] = await O.M.users.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.match(o.email,/jack/);break;}
        case 1:{J.match(o.email,/james/);break;}
        case 2:{J.match(o.email,/jenn/);break;}
        default:break;
      }
    }
  },1E9);
  it("Fetch AppUsers",async () => {
    const F = O.F.users(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.users.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update AppUsers [Set & Push]",async () => {
    const U = O.U.users(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.users[i] = await O.M.users.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update AppUsers [Pull]",async () => {
    const U = O.U.users(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.users[i] = await O.M.users.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch AppUsers - Final Check",async () => {
    const F = O.F.users(O.J);
    const o = await O.M.users.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Enabled");
    J.match(o.fullname,/Jack Swift/);
    J.is(o.age,40);
    J.is(o.hometown,"Houston, TX");
  },1E9);
  it("Query AppUsers",async () => {
    const Q = O.Q.users(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.users.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,0);break;}
        case 1:{J.is(o.results.length,2);break;}
        case 2:{J.is(o.results.length,2);break;}
      }
    }
  },1E9);
});