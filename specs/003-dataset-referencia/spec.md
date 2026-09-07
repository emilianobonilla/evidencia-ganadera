# Spec 003: construir el dataset y la referencia independiente

**Feature:** `003-dataset-referencia` · **Creada:** 2026-09-06 · **Actualizada:** 2026-09-07 · **Versión:** 0.3.0 · **Estado:** borrador.
**Entrada:** medir detección y conteo de bovinos con evidencia local.
**Dependencias:** [001](../001-captura-campana/spec.md), [002](../002-importacion-calidad/spec.md). Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Disponer de dos referencias: animales visibles anotados en imágenes y total físico independiente del lote durante la campaña. Una anotación visual no acredita animales ocultos ni cobertura total.

## Historias de usuario y pruebas

### US1 — Anotar lo que se ve y registrar el total real (P1)

Como evaluador, quiero una referencia independiente para distinguir errores de detección de fallas de captura o cobertura.

**Motivo de prioridad:** el porcentaje de acierto solo tiene sentido con una referencia verificable.
**Prueba independiente:** anotar imágenes y conciliar un conteo físico sin ejecutar el detector.

**Escenarios de aceptación:**

1. **Dada** una imagen con adultos, terneros y oclusiones, **cuando** se anota, **entonces** cada individuo distinguible tiene una región y las zonas ambiguas quedan marcadas.
2. **Dados** dos conteos independientes del lote, **cuando** coinciden o se reconcilian con evidencia, **entonces** queda una referencia final con método y ventana temporal; si no, la campaña queda sin referencia apta.

### US2 — Separar desarrollo de prueba (P1)

Como responsable del POC, quiero reservar campañas completas para estimar desempeño fuera de los ejemplos usados para ajustar el sistema.

**Motivo de prioridad:** fotogramas casi idénticos no deben aparecer a ambos lados de la evaluación.
**Prueba independiente:** revisar un manifiesto de particiones y detectar una campaña o duplicado introducido deliberadamente en dos particiones.

**Escenarios de aceptación:**

1. **Dadas** capturas del mismo lote y día, **cuando** se asignan particiones, **entonces** todas pertenecen a una sola partición, incluso si provienen de distintos vuelos.
2. **Dado** un conjunto de prueba congelado, **cuando** se ajustan pesos, umbrales o reglas, **entonces** el ajuste usa solo desarrollo/validación; si ya se observó la prueba, una nueva iteración necesita otra prueba retenida.

## Requisitos funcionales

- **FR-001:** el dataset DEBE incluir guía de anotación para la clase bovino, adultos y terneros como individuos, bovinos echados, parcialmente visibles, bordes, oclusiones y distractores; no exigir clasificación de raza/edad.
- **FR-002:** DEBE registrar región de cada animal visible y regiones ignoradas por ambigüedad. Las regiones ignoradas y los descartes se cuantifican; no se ocultan al evaluar.
- **FR-003:** cada referencia física DEBE tener método, observadores, hora inicial/final y evidencia de entradas/salidas controladas. Una planilla histórica sin reconciliación temporal no es referencia suficiente.
- **FR-004:** DEBE haber dos conteos ciegos entre sí y respecto del modelo; toda discrepancia debe resolverse mediante repetición o evidencia independiente, o quedar como referencia no apta.
- **FR-005:** DEBE versionar originales, anotaciones, partición y motivos de exclusión; agrupar por lote-día y mantener duplicados y derivados dentro de la misma partición.
- **FR-006:** DEBE reservar prueba antes de ajustar modelos/reglas y restringir su uso a la evaluación final. Un mismo rodeo en distintas fechas se declarará como repetición, no como generalización a otro establecimiento.
- **FR-007:** DEBE incluir corral/grupo reunido con animales separados, cuerpos tocándose y oclusiones; luz variable, sombras de alambrado, suelo/barro, comederos, bovinos echados y terneros cuando existan. Incluir corrales vacíos y distractores; reportar estratos ausentes. Un individuo no separable se marca según la guía de ambigüedad, no se inventa una región.
- **FR-008:** DEBE distinguir la imagen de referencia usada para contar el grupo completo de las imágenes adicionales de anotación/contexto. Registrar si abarca todos los integrantes y las dudas de oclusión; ni varias fotos del mismo grupo ni varios fotogramas constituyen nuevas campañas independientes.

## Entidades principales

- **Anotación:** imagen, región, clase o ambigüedad, autor y versión.
- **Referencia de campaña:** total, método independiente, ventana, observadores, discrepancias y aptitud.
- **Versión de dataset:** manifiesto de particiones, grupos, derechos de uso y exclusiones.

## Casos límite

Conteos humanos discordantes; ternero pegado a la madre; animal oculto bajo árbol; lote que cambia entre conteo físico y vuelo; recortes de una imagen en particiones diferentes; repetición del mismo rodeo; regiones donde no es posible separar cuerpos. La referencia de detección puede existir aunque no exista referencia del total del lote.

## Criterios de éxito

- **SC-001:** conjunto exploratorio mínimo propuesto de 300 imágenes distintas seleccionadas, incluidas al menos 30 sin bovinos, procedentes de al menos 12 campañas; es un piso de diversidad, no garantía de suficiencia para entrenar.
- **SC-002:** al menos cinco campañas quedan retenidas para prueba, de al menos dos lotes y dos fechas. Todos los intentos de esas jornadas previstos para prueba se conservan, incluidos rechazos. La cantidad de imágenes de una campaña no aumenta el número de muestras independientes.
- **SC-003:** cero originales, derivados, duplicados conocidos o grupos lote-día atraviesan las particiones de desarrollo, validación y prueba.
- **SC-004:** 100% de las campañas de prueba usadas para medir error de lote tienen referencia física reconciliada y anotación visual doble; en desarrollo/validación se revisa por segunda persona al menos 20% de las imágenes.

## Supuestos y decisiones por aclarar

El escenario confirmado es corral o grupo reunido. Se propone obtener la referencia contemporánea mediante el manejo existente y registrar portones, entradas/salidas o movimientos en el borde del grupo sin cerco. Si no se consigue una referencia independiente apta, solo se valida conteo visible y 007 debe declarar inconclusa la validación del total. Las cuotas iniciales se amplían según diversidad y curvas de aprendizaje, sin reutilizar la prueba para ajustarlas.
