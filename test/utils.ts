export const J = {
  desc:describe,
  type:(a:any,b:string) => expect(typeof a).toBe(b),
  instance:(a:any,b:any) => expect(a instanceof b).toBe(true),
  arr:(a:any) => expect(Array.isArray(a)).toBe(true),
  gt:(a:number,b:number) => expect(a).toBeGreaterThan(b),
  eq:(a:number,b:number,c:number=2) => expect(a).toBeCloseTo(b,c),
  ne:(a:number,b:number,c?:number) => expect(a).not.toBeCloseTo(b,c||2),
  is:(a:any,b?:any) => b!==undefined?expect(a).toBe(b):expect(a).toBeDefined(),
  not:(a:any,b?:any) => b!==undefined?expect(a).not.toBe(b):expect(a).not.toBeDefined(),
  match:(a:string,b:RegExp) => expect(a).toMatch(b),
  has:(a:string,b:string) => expect(a).toContain(b),
  includes:(a:any[],b:any) => expect(a.indexOf(b) > -1).toBe(true),
  prop:(a:any,b:any) => expect(a).toHaveProperty(b),
  true:(o:any) => expect(o).toBeTruthy(),
  throws:(o:Function) => expect(o()).toThrow(),
  doesNotThrow:(o:Function) => expect(o()).not.toThrow(),
  error:(o:any) => expect(o).toBeInstanceOf(Error),
  noterror:(o:any) => expect(o).not.toBeInstanceOf(Error),
};
/*
export const initApi = async () => {
  try{
    const config = masterConfig("OBA_API");
    config.logger.dirname = path.join(__dirname,"/../../logs");
    config.middleware.views.dirname = path.join(__dirname,"/../../views");
    config.middleware.public.dirname = path.join(__dirname,"/../../views");
    const core = new OBACore(config);
    const app = request(core.app);
    await core.db.start();
    return {core,app};}
  catch(e){console.error(e);throw e;}
};
*/