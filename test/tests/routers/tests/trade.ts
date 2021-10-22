import {J} from "../../utils";
import {ApiRouterNetwork} from "../main";


export const tradeRouter = (O:ApiRouterNetwork) => J.desc("Trades",() => {
  it("Create Trades",async () => {
    const C = O.C.trades(O.J);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.J.trades[i] = await O.M.trades.create$(C[i]);
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      J.is(o.user,O.J.profiles[0].id);
    }
  },1E9);
  it("Fetch Trades",async () => {
    const F = O.F.trades(O.J);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.M.trades.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Trades [Set & Push]",async () => {
    const U = O.U.trades(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.J.trades[i] = await O.M.trades.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Update Trades [Pull]",async () => {
    const U = O.U.trades(O.J);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.J.trades[i] = await O.M.trades.update$(req);
      J.is(o);
      J.not(o,null);
    }
  },1E9);
  it("Fetch Trades - Final Check",async () => {
    const F = O.F.trades(O.J);
    const o = await O.M.trades.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Saved");
    J.is(o.quotes[0].price,.87);
    J.is(o.quotes[1].price,.53);
  },1E9);
  it("Query Trades",async () => {
    const Q = O.Q.trades(O.J);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.M.trades.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
      switch(i){
        case 0:{J.is(o.results.length,24);break;}
        case 1:{J.is(o.results.length,0);break;}
      }
    }
  },1E9);
});