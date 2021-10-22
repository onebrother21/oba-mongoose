import {body,oneOf} from "express-validator";

export const appUserAuthReqValidators = {
  register:() => [body("email").exists()],
  set:() => [body("username").exists()],
  verify:() => [body("code").exists()],
  create:() => [
    body("name").exists(),
    body("yob").exists(),
    body("handle").exists(),
    body("pin").exists(),],
  update:() => [
    oneOf([
      body("handle").exists(),
      body("pin").exists(),
      body("email").exists(),
      body("loc").exists(),
      body("phn").exists(),])],
  login:() => [body("pin").exists()],
  reset:() => [body("pin").exists()],
  updateMany:() => [
    body("ids").exists(),
    body("updates").exists(),
    oneOf([
      body("updates.pin").exists(),
      body("updates.handle").exists(),
      body("updates.email").exists(),
      body("updates.loc").exists(),
      body("updates.phn").exists(),])],
  removeMany:() => [body("ids").exists()],
};