# Spec 004: detectar bovinos y contar los visibles

**Feature:** `004-deteccion-bovinos` · **Creada:** 2026-09-06 · **Versión:** 0.2.0 · **Estado:** borrador.
**Entrada:** obtener una propuesta automática a partir de evidencia aérea.
**Dependencias:** [002](../002-importacion-calidad/spec.md), [003](../003-dataset-referencia/spec.md). Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Localizar bovinos visibles en la imagen de referencia de un corral o grupo reunido y proponer un conteo con marcas revisables. El detector entrega un conteo visible; 006 verifica cobertura y revisión antes de cerrarlo como total del grupo. La selección y eventual adaptación del modelo corresponden al plan.

## Historias de usuario y pruebas

### US1 — Obtener un conteo visible con marcas (P1)

Como operador, quiero ver qué animales detectó el sistema para revisar el número propuesto.

**Motivo de prioridad:** es la primera demostración útil de visión artificial.
**Prueba independiente:** procesar imágenes reservadas con anotaciones y comparar marcas, omisiones y falsos positivos.

**Escenarios de aceptación:**

1. **Dada** una imagen utilizable, **cuando** ejecuto detección, **entonces** veo las regiones propuestas, sus puntuaciones y un número que coincide con las detecciones incluidas.
2. **Dada** una imagen utilizable sin animales, **cuando** termina correctamente, **entonces** puede producir un conteo cero explícito; un error de procesamiento produce estado de error, sin conteo.

### US2 — Repetir una ejecución y entender sus límites (P1)

Como evaluador, quiero identificar modelo y configuración para comparar versiones sin sobrescribir resultados anteriores.

**Motivo de prioridad:** permite atribuir cambios de precisión y reproducir una evaluación.
**Prueba independiente:** ejecutar dos veces el mismo conjunto y luego cambiar la configuración, conservando las tres ejecuciones.

**Escenarios de aceptación:**

1. **Dados** el mismo modelo, configuración, entrada y entorno fijados, **cuando** repito el proceso, **entonces** obtengo el mismo conteo y marcas equivalentes bajo la tolerancia registrada en el plan.
2. **Dadas** imágenes con animales pequeños u ocluidos, **cuando** no cumplen el perfil validado, **entonces** aparecen advertencias revisables y no se presenta la puntuación como certeza de un total correcto.

## Requisitos funcionales

- **FR-001:** el detector DEBE devolver una región por bovino candidato, clase, puntuación, estado de inclusión y localizador en la imagen original.
- **FR-002:** DEBE calcular el conteo visible desde las detecciones incluidas en una región de interés explícita, conservando candidatas descartadas para revisión.
- **FR-003:** si procesa recortes superpuestos, DEBE resolver detecciones repetidas del mismo objeto al recomponer la imagen original antes de contar; esa deduplicación espacial no sustituye 005.
- **FR-004:** DEBE conservar identificación y huella de modelo, parámetros, versión del proceso, entorno y tiempos por ejecución; nunca sobrescribir automáticamente ejecuciones previas.
- **FR-005:** DEBE procesar localmente después de la preparación inicial, con progreso, cancelación y posibilidad de reanudar sin duplicar resultados.
- **FR-006:** DEBE separar imagen rechazada, ejecución fallida, detección pendiente y ejecución válida con cero bovinos.
- **FR-007:** DEBE permitir medir falsos positivos y falsos negativos por estrato de 003, y documentar procedencia/licencia del modelo y de los datos utilizados antes de distribuirlos.
- **FR-008:** DEBE conservar la resolución útil del original; cualquier reducción o división aplicada se registra y se evalúa sobre el tamaño real de los animales. No se presupone que un modelo genérico reconozca bovinos cenitales con precisión suficiente.

## Entidades principales

- **Detección:** región, puntuación, inclusión y referencia a imagen.
- **Ejecución:** modelo, configuración, entradas, estados, duración y salidas.
- **Perfil evaluado:** condiciones de captura y estratos donde se midió el desempeño.

## Casos límite

Sombras de alambrados; comederos y postes; ovejas/caballos; vacas echadas; terneros junto a su madre; cuerpo cortado por el borde; varios animales tocándose o parcialmente superpuestos; el mismo animal en dos recortes; ninguna detección por falla del proceso. Una puntuación del modelo no es una probabilidad calibrada de que el conteo sea correcto.

## Criterios de éxito

- **SC-001:** meta propuesta en imágenes de prueba: precisión ≥95% y exhaustividad (recall) ≥90%, con correspondencia uno a uno e intersección sobre unión de regiones ≥0,5; las regiones ambiguas se tratan según la guía congelada de 003.
- **SC-002:** 100% de las detecciones incluidas se pueden ubicar sobre el original y el conteo mostrado coincide con ellas.
- **SC-003:** meta operativa: una campaña de hasta 10 minutos de video completa preparación de imágenes y detección en hasta 30 minutos en el equipo de referencia documentado; se reportan cadencia de muestreo, equipo, tiempo y pico de memoria. No se exige analizar todos los fotogramas en este hito.
- **SC-004:** al cancelar y reanudar una campaña de prueba no se duplican detecciones ni se pierden resultados ya completados.

## Supuestos y decisiones por aclarar

El hardware y el modelo se seleccionarán tras el conjunto exploratorio. Los umbrales se eligen en validación y se congelan antes de prueba. Alcanzar las metas de detección no implica alcanzar las de conteo total: ambas se evalúan por separado en 007.
