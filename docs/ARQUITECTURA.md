# Arquitectura funcional — Ergonomía Multimétodo

## 1. Propósito

Evolucionar desde un calculador RULA aislado hacia una plataforma profesional de análisis ergonómico multimétodo.

La plataforma debe separar evidencia, observación, clasificación, datos, aplicabilidad, cálculo, resultado y mejora.

## 2. Principio rector

**La IA propone; el algoritmo calcula; el profesional valida, interpreta y decide.**

La IA no debe decidir qué método corresponde de manera autoritativa ni convertir una estimación visual en una medición.

## 3. Flujo principal

CASO
→ TAREA
→ CONTEXTO
→ EVIDENCIA
→ OBSERVACIÓN
→ FACTORES 886 PROPUESTOS
→ VALIDACIÓN PROFESIONAL
→ DATOS REQUERIDOS
→ DATOS CONFIRMADOS
→ MOTOR DE APLICABILIDAD
→ MÉTODOS SUGERIDOS
→ ELECCIÓN PROFESIONAL
→ CÁLCULO
→ RESULTADO
→ ALTERNATIVAS DE MEJORA
→ SEGUIMIENTO

## 4. Caso y tarea

Un caso puede contener una o más tareas.

Una tarea no se representa necesariamente con una sola fotografía. Puede requerir una secuencia de evidencias:

- E1: inicio o preparación
- E2: acción/interacción
- E3: transporte, desplazamiento o continuidad
- E4: finalización o apoyo

La cantidad de evidencias depende de la tarea. Tres puntos son una referencia práctica para tareas dinámicas, no una regla ergonómica universal.

El video es opcional y funciona como evidencia adicional.

## 5. Contexto

El contexto puede registrar:

- puesto
- actividad
- organización del trabajo
- jornada
- turnos
- pausas
- frecuencia
- duración
- ritmo
- recursos
- condiciones ambientales
- organización
- factores humanos y psicosociales

Los factores psicosociales y organizacionales constituyen una dimensión propia. No se convierten artificialmente en un multiplicador de RULA, REBA o NIOSH.

## 6. Evidencia

La evidencia puede ser:

- fotografía
- video
- documento
- registro aportado por el profesional
- otra evidencia pertinente

La evidencia es la fuente que permite formular observaciones.

Una fotografía puede apoyar una observación, pero no demuestra por sí sola peso, fuerza, frecuencia, duración, capacidad física u otros datos que no sean observables.

## 7. Observación

Toda observación debe distinguir:

- **OBSERVADO:** visible o comprobable en la evidencia.
- **ESTIMADO:** inferencia orientativa que requiere confirmación.
- **NO DETERMINABLE:** la evidencia no permite establecer el dato.

Las estimaciones de IA se presentan como propuestas y deben poder ser aceptadas, modificadas o rechazadas por el profesional.

## 8. Manifestación

Una manifestación conserva:

- texto expresado
- persona que la realizó, cuando corresponda
- fecha
- contexto
- evidencia asociada, si existe

Una manifestación no se convierte directamente en un dato de cálculo.

Ejemplo:

> “El carro se va para el lado que quiere.”

Esto constituye una manifestación. Puede generar una necesidad de investigación, pero no equivale por sí misma a una medición de fuerza, masa o condición de ruedas.

## 9. Duda

Una duda permite registrar una incertidumbre explícita sin alterar automáticamente ningún resultado.

Puede contener:

- descripción
- evidencia asociada
- fecha
- estado
- resolución
- observación posterior

## 10. Factores de Resolución SRT 886/2015

La plataforma puede proponer factores observables de la resolución a partir de la evidencia y el contexto.

Estados:

- propuesta
- confirmada
- modificada
- rechazada

Solo los factores confirmados por el profesional pueden generar requerimientos de datos posteriores.

Las condiciones de seguridad se mantienen separadas del análisis ergonómico.

## 11. Datos

Un dato confirmado es reutilizable.

Ejemplo:

**Peso de la carga = 20 kg**

Puede ser utilizado por más de una evaluación sin duplicar el valor.

Cada dato debe conservar, cuando corresponda:

- valor
- unidad
- origen
- fecha
- profesional que lo confirmó
- instrumento
- procedimiento
- observaciones

Una medición instrumental es un dato con origen de medición. No es una fotografía ni un tipo equivalente de evidencia.

## 12. Datos faltantes

Un dato faltante representa una variable requerida por una evaluación que todavía no está confirmada.

El sistema puede identificar que un método requiere una variable determinada.

El sistema no debe inventarla ni convertir automáticamente una estimación en un dato confirmado.

## 13. Motor de aplicabilidad

El motor consulta conocimiento técnico previamente definido para orientar sobre métodos potencialmente pertinentes.

Debe diferenciar:

- requisito
- exclusión
- dato requerido
- condición contextual
- orientación

El motor sugiere. El profesional decide.

Debe ser posible seleccionar cero, uno o varios métodos para una misma tarea.

## 14. Métodos independientes

### RULA

Escala y reglas propias de RULA.

### REBA

Escala y reglas propias de REBA.

### NIOSH

Se evalúa únicamente cuando se cumplen las condiciones de aplicabilidad de la ecuación correspondiente.

Sus resultados incluyen variables propias como RWL y LI.

No debe representarse como una escala de 1 a 7 equivalente a RULA o REBA.

### Marcos normativos

Una norma o resolución no debe confundirse con un método de puntuación.

Una resolución puede contener anexos o unidades de aplicación diferentes, cada una con sus propias condiciones y datos requeridos.

## 15. Resultado y trazabilidad

Un resultado cerrado debe conservar una instantánea de los valores realmente utilizados en el cálculo.

No alcanza con guardar una referencia viva al dato actual.

Si posteriormente cambia un dato:

- el dato nuevo conserva su historial;
- el resultado anterior mantiene los valores con los que fue calculado;
- un nuevo cálculo genera un nuevo resultado.

## 16. Alternativas de mejora

La IA puede proponer alternativas de mejora.

Estas propuestas deben quedar identificadas como asistencia hasta que el profesional las:

- confirme
- modifique
- rechace

La decisión profesional permanece fuera de la IA.

## 17. Estados visuales

- 🔵 PROPUESTA IA
- 🟢 CONFIRMADO POR PROFESIONAL
- 🟠 DATO PENDIENTE
- ⚪ NO DETERMINABLE
- 🔴 ALERTA DE SEGURIDAD

El color no debe ser el único indicador del estado.

## 18. Reglas de seguridad

No inferir automáticamente:

- peso real
- fuerza aplicada
- duración
- frecuencia
- edad
- diagnóstico
- embarazo
- capacidad física
- limitaciones funcionales
- sexo como sustituto de capacidad física

Cuando la evidencia no alcanza, el sistema debe decir **NO DETERMINABLE** y ofrecer una vía manual de confirmación o medición.

## 19. Arquitectura conceptual

CASO
└── TAREA
    ├── CONTEXTO
    │   ├── organización
    │   ├── ambiente
    │   └── factores humanos / psicosociales
    │
    ├── EVIDENCIA
    │   ├── fotografía
    │   └── video opcional
    │
    ├── OBSERVACIÓN
    ├── MANIFESTACIÓN
    ├── DUDA
    ├── FACTORES 886
    │   └── validación profesional
    ├── CONDICIONES DE SEGURIDAD
    ├── DATOS REQUERIDOS
    │   └── DATOS CONFIRMADOS
    ├── MOTOR DE APLICABILIDAD
    │   └── MÉTODOS SUGERIDOS
    ├── EVALUACIONES
    │   ├── RULA
    │   ├── REBA
    │   └── NIOSH
    ├── RESULTADOS
    ├── ALTERNATIVAS DE MEJORA
    └── SEGUIMIENTO
