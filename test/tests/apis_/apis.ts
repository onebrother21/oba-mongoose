import {J,handleResponse,ResponseData} from "../utils";
import {Response} from "supertest";
import {AppMaster} from "@onebro/appmaster";

export const obaDevApisTests = () => J.desc("OBA-Dev-Apis Api",() => {
  let m:AppMaster,app:any,
  data:ResponseData = {cookieArr:[],cookies:{},csrfToken:"",authToken:"",body:{}};
  it("init w/o errors",async () => {
    const o = await require("../utils/init");
    J.is(o.master);
    J.is(o.app);
    m = o.master;
    app = o.app;                     
    //console.log(m.routes);
    },1E9);                    
  it("Home:GET / [403 - No Origin]",async (done) => {
    await app
    .get("/")
    .expect(403)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/cors/i.test(res.body.message));
      done();});
    },1E9);
  it("Home:GET / [403 - Bad Origin]",async (done) => {
    await app
    .get("/")
    .set("Origin","https://oihihih.com")
    .expect(403)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/cors/i.test(res.body.message));
      done();});
    },1E9);
  it("Home:GET / [200 - Origin & Cookies OK]",async (done) => {
    await app
    .get("/")
    .set("Origin","https://oba-dev-apps.com")
    .expect(200)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.is(data.cookies["_bc_0"]);
      J.is(data.cookies["_somesession"]);
      J.is(data.cookies["_csrf"]);
      J.is(data.cookies["XSRF-TOKEN"]);
      done();});
    },1E9);
  it("Test: GET /test-only [200 - Resource OK]",async (done) => {
    await app
    .get("/test-only")
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("Cookie",data.cookieArr)
    .expect("Content-Type",/json/)
    .expect(200)
    .expect(async (res:Response) => {
      J.is(res.body.ready);
      handleResponse(data,res);
      done();});
    },1E9);
  it("Test1: GET /test-only1 [404 - Resource Not Found]",async (done) => {
      await app
      .get("/test-only1")
      .set("Origin","https://oba-dev-apps.com")
      .set("oba-CLIENT-ID","abcdefghi0")
      .set("oba-CLIENT-KEY","1873487748")
      .set("Cookie",data.cookieArr)
      .expect("Content-Type",/json/)
      .expect(404)
      .expect(async (res:Response) => {
        handleResponse(data,res);
        J.true(/not found/.test(res.body.message));
        done();});
      },1E9); 
  it("Test: POST /test-only [403 - Missing CSRF]",async (done) => {
    await app
    .post("/test-only")
    .send({admin:"ObAuth"})
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("Cookie",data.cookieArr)
    .expect("Content-Type",/json/)
    .expect(403)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/access denied/i.test(res.body.message));
      J.true(/csrf/i.test(res.body.info));
      done();});
    },1E9);
  it("Test: POST /test-only [403 - Bad CSRF]",async (done) => {
    await app
    .post("/test-only")
    .send({admin:"ObAuth"})
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("XSRF-TOKEN","snickerdoodle")
    .set("Cookie",data.cookieArr)
    .expect("Content-Type",/json/)
    .expect(403)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/access denied/i.test(res.body.message));
      J.true(/csrf/i.test(res.body.info));
      done();});
    },1E9);
  it("Test: POST /test-only [422 - Req Validation - Body Missing Prop]",async (done) => {
    await app
    .post("/test-only")
    .send({admi:"ObAuth"})
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("XSRF-TOKEN",data.csrfToken)
    .set("Cookie",data.cookieArr)
    .set("Accept","application/json")
    .expect("Content-Type",/json/)
    .expect(422)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/Check data/.test(res.body.message));
      J.true(/invalid/i.test(res.body.errors[0].admin));
      done();});
    },1E9);
  it("Test: POST /test-only [422 - Req Validation - Body Invalid Prop]",async (done) => {
    await app
    .post("/test-only")
    .send({admin:"ObAuth1"})
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("XSRF-TOKEN",data.csrfToken)
    .set("Cookie",data.cookieArr)
    .set("Accept","application/json")
    .expect("Content-Type",/json/)
    .expect(422)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/Check data/.test(res.body.message));
      J.true(/invalid/i.test(res.body.errors[0].admin));
      done();});
    },1E9);
  it("Test: POST /test-only [200 - CSRF & Req Validation - Body OK]",async (done) => {
    //console.log({cookieArr,cookies,data.csrfToken});
    await app
    .post("/test-only")
    .send({admin:"ObAuth"})
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","abcdefghi0")
    .set("oba-CLIENT-KEY","1873487748")
    .set("XSRF-TOKEN",data.csrfToken)
    .set("Cookie",data.cookieArr)
    .set("Accept","application/json")
    .expect("Content-Type",/json/)
    .expect(200)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      done();});},1E9);
  it("Auth Test: GET /ob-auth/v1/en/test-only [401 - No Api Creds]",async (done) => {
    await app
    .get("/ob-auth/v1/en/test-only")
    .set("Origin","https://oba-dev-apps.com")
    .expect(401)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/not provided/i.test(res.body.message));
      J.true(/cred/i.test(res.body.message));
      done();});
    },1E9);
  it("Auth Test: GET /ob-auth/v1/en/test-only [401 - Bad Api Creds]",async (done) => {
    await app
    .get("/ob-auth/v1/en/test-only")
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","00-ob-auth")
    .set("oba-CLIENT-KEY","uenuvenv")
    .expect(401)
    .expect(async (res:Response) => {
      handleResponse(data,res);
      J.true(/invalid/i.test(res.body.message));
      J.true(/cred/i.test(res.body.message));
      done();});
    },1E9);
  it("Auth Test: GET /ob-auth/v1/en/test-only [200 - Origin & Api Creds OK]",async (done) => {
    await app
    .get("/ob-auth/v1/en/test-only")
    .set("Origin","https://oba-dev-apps.com")
    .set("oba-CLIENT-ID","00-ob-auth")
    .set("oba-CLIENT-KEY","1873487748")
    .expect("Content-Type",/json/)
    .expect(200)
    .expect((res:Response) => {
      J.is(res.body.ready);
      handleResponse(data,res);
      done();});},1E9);
});