import mongoose from "mongoose";
import OBACore,{coreConfig} from "@onebro/oba-core";
import OB from "@onebro/oba-common";

export const App = {
  refresh:async () => {
    const {db:{uri,opts}} = coreConfig();
    try {
        OB.log(`dropping MongoDB database`);
        const db = mongoose.createConnection(uri,opts);//.asPromise();
        if(OB.match(/mongodb\+srv/i,uri)) return;
        else await db.dropDatabase();
      }
      catch(e){
        OB.warn(`MongoDB connection failed -> ${e.message||e}`);
      }
  },
  initCore:async () => {
    try{
      const {vars,db,errors} = coreConfig();
      const core:OBACore = new OBACore({vars,db,errors});
      await core.init(1);
      return core;
    }
    catch(e){console.error(e);throw e;}
  },
};