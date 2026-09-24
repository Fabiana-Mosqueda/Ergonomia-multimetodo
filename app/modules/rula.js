/* RULA — módulo independiente. Motor separado de la UI. */
export const RULA_META = Object.freeze({
  id:"RULA", nombre:"RULA — Rapid Upper Limb Assessment", version:"1.0",
  fuente:"McAtamney, L. & Corlett, N. (1993). Applied Ergonomics, 24(2), 91–99.",
  fechaReferencia:"1993"
});
const key=(...x)=>x.join("-");
const A={};
const setA=(ua,la,v)=>{let i=0;for(const w of [1,2,3,4]){A[key(ua,la,w,1)]=v[i++];A[key(ua,la,w,2)]=v[i++];}};
setA(1,1,[1,2,2,2,2,3,3,3]);setA(1,2,[2,2,2,2,3,3,3,3]);setA(1,3,[2,3,3,3,3,3,4,4]);
setA(2,1,[2,3,3,3,3,4,4,4]);setA(2,2,[3,3,3,3,3,4,4,4]);setA(2,3,[3,4,4,4,4,4,5,5]);
setA(3,1,[3,3,4,4,4,4,5,5]);setA(3,2,[3,4,4,4,4,4,5,5]);setA(3,3,[4,4,4,4,4,5,5,5]);
setA(4,1,[4,4,4,4,4,5,5,5]);setA(4,2,[4,4,4,4,4,5,5,5]);setA(4,3,[4,4,4,5,5,5,6,6]);
setA(5,1,[5,5,5,5,5,6,6,7]);setA(5,2,[5,6,6,6,6,7,7,7]);setA(5,3,[6,6,6,7,7,7,7,8]);
setA(6,1,[7,7,7,7,7,8,8,9]);setA(6,2,[8,8,8,8,8,9,9,9]);setA(6,3,[9,9,9,9,9,9,9,9]);
const B={};
const setB=(n,v)=>{let i=0;for(const t of [1,2,3,4,5,6]){B[key(n,t,1)]=v[i++];B[key(n,t,2)]=v[i++];}};
setB(1,[1,3,2,3,3,4,5,5,6,6,7,7]);setB(2,[2,3,2,3,4,5,5,5,6,7,7,7]);
setB(3,[3,3,3,4,4,5,5,6,6,7,7,7]);setB(4,[5,5,5,6,6,7,7,7,7,7,8,8]);
setB(5,[7,7,7,7,7,8,8,8,8,8,8,8]);setB(6,[8,8,8,8,8,8,8,9,9,9,9,9]);
const C=[
[1,2,3,3,4,5,5,5,5,5,5,5,5,5],[2,2,3,4,4,5,5,5,5,5,5,5,5,5],
[3,3,3,4,4,5,6,6,6,6,6,6,6,6],[3,3,3,4,5,6,6,6,6,6,6,6,6,6],
[4,4,4,5,6,7,7,7,7,7,7,7,7,7],[4,4,5,6,6,7,7,7,7,7,7,7,7,7],
[5,5,6,6,7,7,7,7,7,7,7,7,7,7],[5,5,6,7,7,7,7,7,7,7,7,7,7,7],
[5,5,6,7,7,7,7,7,7,7,7,7,7,7],[5,5,6,7,7,7,7,7,7,7,7,7,7,7],
[5,5,6,7,7,7,7,7,7,7,7,7,7,7],[5,5,6,7,7,7,7,7,7,7,7,7,7,7],
[5,5,6,7,7,7,7,7,7,7,7,7,7,7]];
const clamp=(n,a,b)=>Math.min(Math.max(n,a),b);
const LEVEL={1:{title:"Nivel 1 — Postura aceptable",desc:"La postura es aceptable si no se mantiene o repite durante periodos prolongados."},2:{title:"Nivel 2 — Investigar más adelante",desc:"Se requiere un estudio más a fondo del puesto; pueden ser necesarios cambios."},3:{title:"Nivel 3 — Investigar y actuar pronto",desc:"El estudio debe profundizarse y los cambios implementarse en el corto plazo."},4:{title:"Nivel 4 — Actuar de inmediato",desc:"Se requiere investigar y realizar cambios en la postura de forma urgente."}};
const ACTION={1:1,2:1,3:2,4:2,5:3,6:3,7:4};
function validate(v){
 const req=["izq.ua","izq.la","izq.w","izq.wt","izq.musc","izq.force","der.ua","der.la","der.w","der.wt","der.musc","der.force","unico.neck","unico.trunk","unico.legs","unico.musc","unico.force"];
 const missing=req.filter(p=>{let x=v;for(const k of p.split("."))x=x?.[k];return x===null||x===undefined||x==="";});
 if(missing.length)throw new Error("Faltan variables requeridas: "+missing.join(", "));
}
export function calcularRULA(v){
 validate(v);
 const aL=A[key(v.izq.ua,v.izq.la,v.izq.w,v.izq.wt)],aR=A[key(v.der.ua,v.der.la,v.der.w,v.der.wt)];
 const b=B[key(v.unico.neck,v.unico.trunk,v.unico.legs)];
 const cL=aL+v.izq.musc+v.izq.force,cR=aR+v.der.musc+v.der.force,d=b+v.unico.musc+v.unico.force;
 const gL=C[clamp(cL,1,13)-1][clamp(d,1,14)-1],gR=C[clamp(cR,1,13)-1][clamp(d,1,14)-1],final=Math.max(gL,gR),nivelAccion=ACTION[clamp(final,1,7)];
 return {metodo:RULA_META,tipoResultado:"escala_riesgo",valorPrincipal:final,nivelAccion,interpretacion:LEVEL[nivelAccion],detalle:{scoreA_izq:aL,scoreA_der:aR,scoreB:b,scoreC_izq:cL,scoreC_der:cR,scoreD:d,scoreFinal_izq:gL,scoreFinal_der:gR,scoreFinalMax:final,nivelAccion}};
}
export function crearSnapshot(entrada,resultado,metadata={}){return JSON.parse(JSON.stringify({metodo:RULA_META,fecha:new Date().toISOString(),entrada,resultado,metadata}));}
