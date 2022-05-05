"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
export const modelControllerHub = async <Sigs,Roles>(
  core:OBACoreApi,
  controller_constructors:ModelControllerConstructors<Sigs,Roles>,
  factory_constructors:ModelFactoryConstructors<Sigs>) => {
  const controllers:Partial<ModelControllerHub<Sigs,Roles>> = {};
  for(const k in controller_constructors){
    const K = k as Keys<Sigs>;
    const ctr = controller_constructors[K];
    const controller = new ctr(core);
    controllers[K] = await controller.init$(factory_constructors);
  }
  return controllers as ModelControllerHub<Sigs,Roles>;
};
*/ 
//# sourceMappingURL=model-controller-hub.js.map