import mongoose from "mongoose";
import OBACore,{coreConfig} from "@onebro/oba-core";
import OB from "@onebro/oba-common";

export const App = {
  refresh:async () => {
    const c = coreConfig();
    if(c.db){
      try {
        OB.log(`dropping MongoDB database`);
        const {uri,opts} = c.db;
        if(OB.match(/mongodb\+srv/,uri)) return;
        const db = mongoose.createConnection(uri,opts);
        await db.dropDatabase();
      }
      catch(e){
        OB.warn(`MongoDB connection failed -> ${e.message||e}`);
      }
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