# Spec 005: contar por campaña sin duplicar observaciones

**Feature:** `005-conteo-sin-duplicados` · **Creada:** 2026-09-06 · **Versión:** 0.2.0 · **Estado:** borrador.
**Entrada:** convertir detecciones repetidas en una propuesta de conteo del área observada.
**Dependencias:** [001](../001-captura-campana/spec.md), [002](../002-importacion-calidad/spec.md), [004](../004-deteccion-bovinos/spec.md). Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

**Prioridad de feature: P2, extensión opcional.** El POC principal de corral/grupo reunido cuenta sobre una sola imagen y puede implementar 006 y 007 sin esta feature. La deduplicación entre recortes de esa misma imagen sigue siendo obligatoria en 004. Los requisitos y metas siguientes aplican cuando se active la extensión entre vistas, y se evalúan separadamente del POC principal.

Proponer correspondencias entre observaciones y explicar qué animales fueron contados una sola vez durante una campaña. La identidad temporal termina con esa campaña. El vuelo manual y el movimiento del rodeo hacen que ciertas correspondencias requieran revisión o no puedan resolverse.

## Historias de usuario y pruebas

### US1 — Evitar repeticiones dentro de una pasada continua (P2)

Como operador, quiero que un bovino visible en varias imágenes contribuya una sola vez al conteo de la pasada.

**Motivo de prioridad:** sumar detecciones por imagen sobrecuenta incluso una vaca inmóvil.
**Prueba independiente:** usar una secuencia corta con correspondencias anotadas y detecciones de ejemplo, sin depender del detector real.

**Escenarios de aceptación:**

1. **Dado** un bovino seguido en varias imágenes continuas, **cuando** se construye el conteo, **entonces** aporta una unidad y se conserva el vínculo con sus observaciones.
2. **Dado** un cruce entre dos animales, **cuando** la correspondencia es ambigua, **entonces** queda pendiente; no se fusionan solo por cercanía ni se crean dos nuevos animales sin advertencia.

### US2 — Reconciliar sectores y pasadas de una campaña (P2)

Como revisor, quiero identificar posibles repeticiones entre pasadas para decidir si hay suficiente evidencia para un total del lote.

**Motivo de prioridad:** un identificador nuevo después de un corte no demuestra un animal nuevo.
**Prueba independiente:** combinar dos pasadas de ejemplo con un grupo repetido, un animal que cambia de sector y un área nunca observada.

**Escenarios de aceptación:**

1. **Dadas** dos pasadas con observaciones del mismo grupo, **cuando** se agregan, **entonces** se presentan las correspondencias candidatas y los conflictos antes de ofrecer un total revisable.
2. **Dado** un cambio de batería sin continuidad suficiente, **cuando** reaparece ganado, **entonces** la campaña conserva una duda entre segmentos; no suma automáticamente sus identificadores como animales distintos.
3. **Dado** un sector no observado, **cuando** termina el procesamiento, **entonces** se informa el alcance parcial y no se presenta el subtotal como total del lote.

## Requisitos funcionales

- **FR-001:** el sistema DEBE asignar identificadores temporales a agrupaciones de observaciones dentro de una campaña y conservar toda su evidencia.
- **FR-002:** DEBE resolver repeticiones dentro de secuencias continuas considerando desplazamiento de la cámara y de los animales; la estrategia y sus límites se fijan y ensayan en el plan.
- **FR-003:** DEBE abrir una discontinuidad ante cortes, pérdidas prolongadas, cambios de sector/pasada o falta de evidencia temporal; no trasladar una identidad entre segmentos sin correspondencia respaldada.
- **FR-004:** DEBE presentar conflictos entre segmentos como candidatos a unir/separar con imágenes e instantes para la revisión de 006. Si la evidencia no los resuelve, debe conservar la incertidumbre.
- **FR-005:** DEBE aplicar una regla de pertenencia espacial explícita: en una imagen, se incluye un bovino si el centro de su región está dentro del área elegida; en un borde compartido se asigna a un solo sector. Cambios de sector entre instantes requieren reconciliación temporal adicional.
- **FR-006:** DEBE mantener cobertura y correspondencias como condiciones separadas. No se alcanza un total revisado con cobertura incompleta/desconocida, dudas abiertas o movimientos de entrada/salida del lote no reconciliados.
- **FR-007:** DEBE conservar conteo automático y conteo revisado de forma separada, junto con método, alcance y motivos de abstención. Una suma de subtotales sin reconciliar debe rotularse como observaciones, no como individuos únicos ni como límite inferior.
- **FR-008:** DEBE aceptar el caso de una sola imagen como conteo visible sin seguimiento; los resultados de distintas campañas nunca se suman como animales distintos por defecto.

## Entidades principales

- **Grupo de observaciones:** identidad temporal candidata y detecciones asociadas.
- **Correspondencia:** propuesta de mismo/diferente individuo, evidencia, conflicto y resolución.
- **Resultado de campaña:** alcance, cobertura, propuesta automática, revisión y dudas abiertas.

## Casos límite

Reentrada al encuadre; dos animales que se cruzan; uno que queda oculto; giro rápido del dron; salto temporal; pasada repetida en sentido contrario; animal en borde de sectores; movimiento entre sectores ya observados; múltiples vuelos. Ni el máximo de detecciones de un fotograma ni la suma de IDs de seguimiento representan por sí solos el total de una campaña.

## Criterios de éxito

- **SC-001:** en fixtures con correspondencias inequívocas, una vaca repetida en diez imágenes aporta una unidad y dos vacas que se cruzan aportan dos; la evidencia asociada se conserva.
- **SC-002:** 100% de los fixtures deliberadamente ambiguos, con corte sin continuidad o área no observada, impiden cerrar un total revisado hasta que exista una resolución respaldada o una nueva captura.
- **SC-003:** la propuesta automática cumple la meta por campaña definida en [007](../007-validacion-campo/spec.md); se reportan además duplicaciones, omisiones y fusiones erróneas por separado.
- **SC-004:** cada unidad incluida en un resultado revisado puede rastrearse a al menos una observación y a las resoluciones de duplicados que la afectaron.

## Supuestos y decisiones por aclarar

Esta extensión se considerará si no se logra contar el corral/grupo en una imagen suficiente. Se buscarán pasadas cortas con referencias visibles y movimiento acotado. Si hacen falta correspondencias entre individuos indistinguibles tras largos cortes, la salida seguirá siendo parcial. El plan de P2 debe resolver ese riesgo con datos de 003; no bloquea implementar ni evaluar el POC principal por imagen.
