export const trim = (s:string) => s.toLocaleLowerCase().replace(" ","").replace(",","");
export const isNumeric = (s:any) => typeof Number(s) === "number" && Number(s) > -1;
export const isNumericStr = (s:string) => !s.split("").filter(s_ => !isNumeric(s_)).length;
export const isNumericStrWLength = (s:string,n?:number) => s || s.length == (n||4) || isNumericStr(s);