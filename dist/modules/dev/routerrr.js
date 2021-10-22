"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
import {Router} from "express";
import {AppMaster} from "@onebro/appmaster";
import {handleReqValidation as validation,handleAction as action,handleResponse as response} from "@onebro/oba-common";
import {validateAppUser as getUser,validateAPIAuthTkn as authTkn,refreshAppUser as setUser} from "../../utils";
import {obAuthAcctActions} from "../actions";
import {obAuthAcctModels,obAuthIdModels,obAuthCredsModels} from "../models";
import {obAuthAcctReqValidators as V} from "../validators";
const c = process.env.OBA_API_AUTH_COOKIE;
const s = process.env.OBA_API_AUTH_SECRET;
const k = process.env.OBA_API_EKEY;

export const obAuthAcctController = async (m:AppMaster):Promise<Router> => {
  const router = Router();
  const models = {
    ...await obAuthAcctModels(m,null),
    ...await obAuthIdModels(m,null),
    ...await obAuthCredsModels(m,null),};
  const {register$,set$,autoset$,verify$,login$,forgot$,reset$,logout$,create$,update$,updateMany$,removeMany$} = await obAuthAcctActions(m,models);
  router.post("/register",validation(V.register()),action(register$,201),setUser(c,k),response());
  router.post("/set",validation(V.set()),action(set$),setUser(c,k),response());
  router.get("/set",getUser(c,k),action(autoset$),setUser(c,k),response());
  router.post("/verify",getUser(c,k),authTkn(s),validation(V.verify()),action(verify$),setUser(c,k),response());
  router.post("/acct",getUser(c,k),authTkn(s),validation(V.create()),action(create$),setUser(c,k),response());
  router.put("/acct",getUser(c,k),authTkn(s),validation(V.update()),action(update$),setUser(c,k),response());
  router.post("/login",getUser(c,k),authTkn(s),validation(V.login()),action(login$),setUser(c,k),response());
  router.get("/login",getUser(c,k),action(forgot$),setUser(c,k),response());
  router.put("/login",getUser(c,k),authTkn(s),validation(V.reset()),action(reset$),setUser(c,k),response());
  router.delete("/login",getUser(c,k),authTkn(s),action(logout$),setUser(c,k),response());
  router.put("/accts",getUser(c,k),authTkn(s),validation(V.updateMany()),action(updateMany$),setUser(c,k),response());
  router.delete("/accts",getUser(c,k),authTkn(s),validation(V.removeMany()),action(removeMany$),setUser(c,k),response());
  return router;
};
export default obAuthAcctController;

*/ 
//# sourceMappingURL=routerrr.js.map