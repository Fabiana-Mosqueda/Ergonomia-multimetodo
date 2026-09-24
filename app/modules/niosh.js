/* NIOSH — módulo de levantamiento manual. Parámetros y FM tomados de las planillas aportadas. */
export const NIOSH_META = Object.freeze({
  id:"NIOSH_LEVANTAMIENTO", nombre:"Ecuación NIOSH revisada — levantamiento", version:"1993",
  fuente:"Planillas NIOSH aportadas para este proyecto"
});

const FM_TABLE=[
[0.2,1,0.95,0.85,1,0.95,0.85],[0.5,0.97,0.92,0.81,0.97,0.92,0.81],
[1,0.94,0.88,0.75,0.94,0.88,0.75],[2,0.91,0.84,0.65,0.91,0.84,0.65],
[3,0.88,0.79,0.55,0.88,0.79,0.55],[4,0.84,0.72,0.45,0.84,0.72,0.45],
[5,0.80,0.60,0.35,0.80,0.60,0.35],[6,0.75,0.50,0.27,0.75,0.50,0.27],
[7,0.70,0.42,0.22,0.70,0.42,0.22],[8,0.60,0.35,0.18,0.60,0.35,0.18],
[9,0.52,0.30,0,0.52,0.30,0],[10,0.45,0.26,0,0.45,0.26,0],
[11,0.41,0,0,0.41,0,0],[12,0.37,0,0,0.37,0,0],
[13,0.34,0,0,0.34,0,0],[14,0.31,0,0,0.31,0,0],
[15,0.28,0,0,0.28,0,0]
];

function nearestFM(f){ 
  let best=FM_TABLE[0];
  for(const row of FM_TABLE){ if(row[0]<=f) best=row; else break; }
  return best;
}
function num(v,n){const x=Number(v);if(!Number.isFinite(x))throw new Error(n+" es requerido.");return x;}

export function calcularNIOSH(v){
  const H=num(v.H,"H"), V=num(v.V,"V"), D=num(v.D,"D"), A=num(v.A,"A"), F=num(v.F,"F"), L=num(v.load,"Peso");
  const LC=23;
  const fuera=[];
  if(H<25||H>63) fuera.push("H fuera de 25–63 cm");
  if(V<0||V>175) fuera.push("V fuera de 0–175 cm");
  if(D<25||D>175) fuera.push("D fuera de 25–175 cm");
  if(A<0||A>135) fuera.push("A fuera de 0–135°");
  if(F<0.2||F>15) fuera.push("F fuera de 0.2–15 lev/min");
  if(v.unaMano) fuera.push("tarea con una sola mano");
  if(v.sentadoArrodillado) fuera.push("tarea sentado/arrodillado");
  if(v.cargaInestable) fuera.push("carga inestable");

  const HM=H<=25?1:25/H;
  const VM=1-0.003*Math.abs(V-75);
  const DM=D<25?1:0.82+4.5/D;
  const AM=1-0.0032*A;
  const row=nearestFM(F);
  const duration=v.duration||"Corta (≤1h)";
  const lowV=V<75;
  const col=lowV ? ({ "Corta (≤1h)":1,"Moderada (1-2h)":2,"Larga 2-8h":3}[duration]||1) : ({ "Corta (≤1h)":4,"Moderada (1-2h)":5,"Larga 2-8h":6}[duration]||4);
  const FM=row[col];
  const coupling=v.coupling||"Bueno";
  const CM=V<75?(coupling==="Bueno"?1:coupling==="Regular"?0.95:0.9):(coupling==="Malo"?0.9:1);
  const RWL=fuera.length?0:LC*HM*VM*DM*AM*FM*CM;
  const LI=RWL>0?L/RWL:null;

  return {
    metodo:NIOSH_META,tipoResultado:"RWL_LI",valorPrincipal:LI,
    aplicable:fuera.length===0,
    motivoAplicabilidad:fuera.length?fuera.join("; "):"Las variables ingresadas están dentro de los rangos de la planilla.",
    detalle:{LC,H,V,D,A,F,L,duration,coupling,HM,VM,DM,AM,FM,CM,RWL,LI}
  };
}
export function crearSnapshot(entrada,resultado,metadata={}){
  return JSON.parse(JSON.stringify({metodo:NIOSH_META,fecha:new Date().toISOString(),entrada,resultado,metadata}));
}
