/*
export const ObjectId = mongoose.Types.ObjectId;
export const mapAliases = (p:DataMap<any>,thisSchema:string,schemaMap:DataMap<any>):any => {
  const o:any = {};
  const schema = schemaMap[thisSchema];
  for(const k in schema){
    const propA = schema[k];
    const propB =  p[propA.alias];
    if(propB)o[k] = p[schema[k].alias];}
  return o;};
export const getPopulation = (thisSchema:string,schemaMap:DataMap<any>):any => {
  const pops:IPopulation[] = [];
  const schema = schemaMap[thisSchema];
  for(const k in schema) schema[k].ref?pops.push({path:k,model:schema[k].ref}):null;
  return pops;
};
export const mapQueryPopulation = (popJ:DataMap<any>,thisSchema:string,schemaMap:DataMap<any>):any => {
  const pops:IPopulation[] = [];
  const schema = schemaMap[thisSchema];
  for(const k in schema){
    const schemaO = schema[k];
    const popJObj = popJ[schemaO.alias];
    if(schemaO.ref && popJObj) pops.push({
      path:k,
      model:schemaO.ref,
      populate:mapQueryPopulation(popJObj,schemaO.ref,schemaMap)
    });}
  return pops;
};
export const getAliasedSchema = (props:ISchemaConfig[],prefix:string = "a",offset:number = 0):SchemaDefinition => {
  return props.reduce((o,p,i) => ({...o,[prefix+(offset+i)]:p}),{} as any);
};
export const getSchemaRefs = (s:Schema):IPopulation[] => {
  const o:IPopulation[] = [];
  for(const k in s.obj) s.obj[k].ref?o.push({path:k,model:s.obj[k].ref}):null;
  //console.log(o);
  return o;
};
export const schemaOpts = {
  toJSON:{virtuals:true},
  toObject:{virtuals:true},
  timestamps:{createdAt:"created",updatedAt:"updated"}
};
*/
/*
export const samplePipeline = [
  {"$lookup": {
    from:"finavigatoruserprofiles",
    localField:"a2",
    foreignField:"_id",
    as:"agent"}},
  {"$lookup": {
    from:"finavigatoruserprofiles",
    localField:"a3",
    foreignField:"_id",
    as:"client"}},
  {"$lookup": {
    from:"finavigatorvenues",
    localField:"a4.a0",
    foreignField:"_id",
    as:"venue"}},
  {"$lookup": {
    from:"finavigatormessages",
    localField:"a5",
    foreignField:"_id",
    as:"notes"}},
  {"$lookup": {
    from:"finavigatorleads",
    localField:"a6",
    foreignField:"_id",
    as:"lead"}},
  {"$unwind":"$agent"},
  {"$unwind":"$client"},
  {"$unwind":"$venue"},
  {"$unwind":"$lead"},
  {"$match":{"venue.a2":"The Nook"}},
  {"$group":{
    "_id":{
      "id":"$_id",
      "created":"$a0",
      "pat":"$a4",
      "venue":"$venue",
      "agent":"$agent",
      "client":"$client",
      "lead":"$lead",
      "referral":"$a7",
      "status":{"$arrayElemAt":["$a8",-1]}},
    "notes":{"$push":"$notes"}
    }},
  {"$unwind":"$notes"},
  {"$project":{
    "id":"$_id.id",
    "created":"$_id.created",
    "agent":{
      "id":"$_id.agent._id",
      "username":"$_id.agent.a2",
      "img":"$_id.agent.a11"},
    "client":{
      "id":"$_id.client._id",
      "username":"$_id.client.a2",
      "img":"$_id.client.a11"},
    "pat":{
      "date":"$_id.pat.a1",
      "time":"$_id.pat.a2",
      "venue":{name:"$_id.venue.a2",loc:"$_id.venue.a4.info"}},
    "notes":"$notes",
    "lead":{
      "id":"$_id.lead._id",
      "created":"$_id.lead.a0",
      "method":"$_id.lead.a2",
      "campaign":"$_id.lead.a3"},
    "referral":"$_id.referral",
    "status":"$_id.status"},
    //"count":{"$sum":1},
  }
];
*/
/*import { checkSchema } from "express-validator";
const authValidation = () => checkSchema({
  // The location of the field, can be one or more of body, cookies, headers, params or query.
  // If omitted, all request locations will be checked
  // Sanitizers can go here as well
  id: {
    in: ["params", "query"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true},
  myCustomField: {
    // Custom validators
    custom: {
      options: (value, { req, location, path }) => {
        return value + req.body.foo + location + path;}},
    // and sanitizers
    customSanitizer: {
      options: (value, { req, location, path }) => {
        let sanitizedValue;
        if (req.body.foo && location && path) {sanitizedValue = parseInt(value);}
        else {sanitizedValue = 0;}
        return sanitizedValue;}}},
  password: {
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      // Multiple options would be expressed as an array
      options: { min: 7 }}},
  firstName: {
    isUppercase:{negated:true},// To negate a validator
    //rtrim:{options:[" ", "-"]},
  },
  // Wildcards/dots for nested fields work as well
  "addresses.*.postalCode": {
    // Make this field optional when undefined or null
    optional:{ nullable: true },
    isPostalCode: true
  }
});
*/