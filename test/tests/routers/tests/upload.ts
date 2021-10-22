import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";

export const uploadRouter = (O:ApiRouterNetwork) => J.desc("Uploads",() => {
  it("Create Uploads",async () => {
    const C = O.C.uploads(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.uploads[i] = await O.M.uploads.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      J.is(o.publisher,O.J.profiles[i].id);
    }
  },1E9);
  it("Fetch Uploads",async () => {
    const F = O.F.uploads(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.uploads.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Uploads [Set & Push]",async () => {
    const U = O.U.uploads(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.uploads[i] = await O.M.uploads.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Uploads [Pull]",async () => {
    const U = O.U.uploads(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.uploads[i] = await O.M.uploads.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Uploads - Final Check",async () => {
    const F = O.F.uploads(O.J);
    const o = await O.M.uploads.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Saved");
    J.is(o.publisher,O.J.profiles[0].id);
  },1E9);
  it("Query Uploads",async () => {
    const Q = O.Q.uploads(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.uploads.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,2);break;}
        case 1:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});