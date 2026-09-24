/* Res. SRT 886/2015 — identificación inicial de factores del Anexo I. */
export const PROTOCOLO_886 = Object.freeze([
 {codigo:"A",nombre:"Levantamiento y descenso",planilla:"2.A",metodosRelacionados:["NIOSH"],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"B",nombre:"Empuje / arrastre",planilla:"2.B",metodosRelacionados:[],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"C",nombre:"Transporte",planilla:"2.C",metodosRelacionados:[],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"D",nombre:"Bipedestación",planilla:"2.D",metodosRelacionados:[],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"E",nombre:"Movimientos repetitivos",planilla:"2.E",metodosRelacionados:[],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"F",nombre:"Postura forzada",planilla:"2.F",metodosRelacionados:["RULA","REBA"],descripcion:"Identificación inicial del factor según Planilla 1."},
 {codigo:"G",nombre:"Vibraciones mano-brazo",planilla:"2.G",metodosRelacionados:[],descripcion:"La planilla remite a la evaluación correspondiente de vibraciones."},
 {codigo:"H",nombre:"Confort térmico",planilla:"2.H",metodosRelacionados:[],descripcion:"La planilla remite a la Curva de Confort de Fanger."},
 {codigo:"I",nombre:"Estrés de contacto",planilla:"2.I",metodosRelacionados:[],descripcion:"Identificación inicial del factor según Planilla 1."}
]);
export function obtenerFactor(codigo){return PROTOCOLO_886.find(x=>x.codigo===codigo)||null;}
