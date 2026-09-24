/* REBA — módulo independiente. Matrices tomadas del archivo REBA 6 aportado. */
export const REBA_META = Object.freeze({
  id:"REBA", nombre:"REBA — Rapid Entire Body Assessment", version:"6",
  fuente:"Archivo REBA 6 aportado para este proyecto"
});

const TABLE_A = [
  [1,2,3,4,3,3,5,6,4,5,6,7],
  [2,3,4,5,4,5,6,7,5,6,7,8],
  [2,4,5,6,5,6,7,8,6,7,8,9],
  [3,5,6,7,6,7,8,9,7,8,9,9],
  [4,6,7,8,7,8,9,9,8,9,9,9]
];
const TABLE_B = [
  [1,2,2,1,2,3],
  [1,2,3,2,3,4],
  [3,4,5,4,5,5],
  [4,5,5,5,6,7],
  [6,7,8,7,8,8],
  [7,8,8,8,9,9]
];
const TABLE_C = [
  [1,1,1,2,3,3,4,5,6,7,7,7],
  [1,2,2,3,4,4,5,6,6,7,7,8],
  [2,3,3,3,4,5,6,7,7,8,8,8],
  [3,4,4,4,5,6,7,8,8,9,9,9],
  [4,4,4,5,6,7,8,8,9,9,9,9],
  [6,6,6,7,8,8,9,9,10,10,10,10],
  [7,7,7,8,9,9,9,10,10,11,11,11],
  [8,8,8,9,10,10,10,10,10,11,11,11],
  [9,9,9,10,10,10,11,11,11,12,12,12],
  [10,10,10,11,11,11,11,12,12,12,12,12],
  [11,11,11,11,11,12,12,12,12,12,12,12],
  [12,12,12,12,12,12,12,12,12,12,12,12]
];

const LEVELS = {
  1:{nivel:"Negligible",accion:"None necessary"},
  2:{nivel:"Low",accion:"May be necessary"},
  3:{nivel:"Low",accion:"May be necessary"},
  4:{nivel:"Medium",accion:"Necessary"},
  5:{nivel:"Medium",accion:"Necessary"},
  6:{nivel:"Medium",accion:"Necessary"},
  7:{nivel:"Medium",accion:"Necessary"},
  8:{nivel:"High",accion:"Necessary soon"},
  9:{nivel:"High",accion:"Necessary soon"},
  10:{nivel:"High",accion:"Necessary soon"},
  11:{nivel:"Very High",accion:"Necessary now"},
  12:{nivel:"Very High",accion:"Necessary now"},
  13:{nivel:"Very High",accion:"Necessary now"},
  14:{nivel:"Very High",accion:"Necessary now"},
  15:{nivel:"Very High",accion:"Necessary now"}
};

const req = (v,name,min,max) => {
  const n=Number(v);
  if(!Number.isFinite(n)||n<min||n>max) throw new Error(name+" debe estar entre "+min+" y "+max+".");
  return n;
};

export function calcularREBA(v){
  const neck=req(v.neck,"Cuello",1,3);
  const trunk=req(v.trunk,"Tronco",1,5);
  const legs=req(v.legs,"Piernas",1,3);
  const upper=req(v.upperArm,"Brazo superior",1,6);
  const lower=req(v.lowerArm,"Antebrazo",1,2);
  const wrist=req(v.wrist,"Muñeca",1,3);
  const force=req(v.force,"Carga/fuerza",0,3);
  const coupling=req(v.coupling,"Acoplamiento",0,3);
  const activity=req(v.activity,"Actividad",0,3);

  const neckFinal=Math.min(5,neck+(v.neckTwist?1:0)+(v.neckSideBend?1:0));
  const trunkFinal=Math.min(5,trunk+(v.trunkTwist?1:0)+(v.trunkSideBend?1:0));
  const legIndex=legs-1;
  const neckIndex=neckFinal-1;
  const trunkIndex=trunkFinal-1;
  const tableAIndex=neckIndex*4+legIndex;
  const scoreApost=TABLE_A[trunkIndex][tableAIndex];
  const scoreA=Math.min(12,scoreApost+force);

  const upperIndex=upper-1;
  const lowerIndex=lower-1;
  const wristIndex=wrist-1;
  const scoreBpost=TABLE_B[upperIndex][lowerIndex*3+wristIndex];
  const scoreB=Math.min(12,scoreBpost+coupling);

  const scoreC=TABLE_C[scoreA-1][scoreB-1];
  const final=Math.min(15,scoreC+activity);
  const info=LEVELS[final] || LEVELS[15];

  return {
    metodo:REBA_META,tipoResultado:"escala_riesgo",valorPrincipal:final,
    nivelRiesgo:info.nivel,accion:info.accion,
    detalle:{neck:neckFinal,trunk:trunkFinal,legs,scoreApost,scoreA,scoreBpost,scoreB,scoreC,activity,final}
  };
}

export function crearSnapshot(entrada,resultado,metadata={}){
  return JSON.parse(JSON.stringify({metodo:REBA_META,fecha:new Date().toISOString(),entrada,resultado,metadata}));
}
