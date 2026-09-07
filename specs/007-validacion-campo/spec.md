# Spec 007: validar el POC y decidir el siguiente paso

**Feature:** `007-validacion-campo` · **Creada:** 2026-09-06 · **Versión:** 0.2.0 · **Estado:** borrador.
**Entrada:** comprobar utilidad y límites del conteo con el Mini 4K.
**Dependencias P1:** [001](../001-captura-campana/spec.md), [002](../002-importacion-calidad/spec.md), [003](../003-dataset-referencia/spec.md), [004](../004-deteccion-bovinos/spec.md), [006](../006-revision-evidencia/spec.md). [005](../005-conteo-sin-duplicados/spec.md) se agrega únicamente al evaluar la extensión P2. Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Evaluar de extremo a extremo captura del corral/grupo → importación y selección de imagen de referencia → detección → revisión de marcas y cobertura → evidencia. La evaluación P1 puede validar el total del grupo a partir de una sola imagen suficiente y referencia física independiente. La extensión P2 agrega correspondencias entre vistas y necesita su propia evaluación, sin mezclar métricas o campañas entre modos. El informe limita sus conclusiones al escenario probado.

## Historias de usuario y pruebas

### US1 — Medir contra campañas retenidas (P1)

Como responsable del POC, quiero una comparación ciega con conteos independientes para conocer error y tasa de uso real.

**Motivo de prioridad:** una demostración elegida por funcionar bien no valida el POC.
**Prueba independiente:** calcular el informe con campañas tabuladas de ejemplo, incluyendo rechazo, cero animales, duplicación y omisión; comprobar manualmente todas las métricas.

**Escenarios de aceptación:**

1. **Dadas** campañas de prueba reservadas, **cuando** comienza la evaluación, **entonces** modelo, parámetros, protocolo, reglas de rechazo y métricas están congelados y las referencias ocultas a quienes operan/revisan el sistema.
2. **Dado** un intento fallido, **cuando** se publica el informe, **entonces** aparece con motivo y afecta la tasa de aceptación aunque no tenga error numérico calculable.

### US2 — Decidir con error, cobertura y esfuerzo (P1)

Como usuario, quiero saber si ahorro trabajo manteniendo un conteo suficientemente confiable en mi escenario.

**Motivo de prioridad:** la utilidad depende del tiempo humano y de cuántos vuelos permiten cerrar un resultado.
**Prueba independiente:** producir un informe aprobado y otro que falle una meta usando resultados ficticios rotulados como tales.

**Escenarios de aceptación:**

1. **Dado** un buen error promedio pero muchos rechazos o un lote con error excesivo, **cuando** se decide, **entonces** el POC no figura como aprobado si incumple sus metas por campaña o de aceptación.
2. **Dado** que la revisión humana alcanza la meta y el automático no, **cuando** se informa, **entonces** se distingue la utilidad asistida de la precisión automática y se propone ajustar esta última.

## Requisitos funcionales

- **FR-001:** la evaluación DEBE usar las particiones de 003 y congelar protocolo, selección de imagen, modelo, configuración, calidad, descarte, reglas de conteo y metas antes de abrir la prueba. La imagen se selecciona por nitidez/cobertura/visibilidad, antes de ver predicciones o referencia física.
- **FR-002:** DEBE medir por campaña el total de referencia, propuesta automática previa a revisión, resultado revisado, cobertura, estado, omisiones, duplicaciones/fusiones y tiempo humano/máquina.
- **FR-003:** DEBE registrar todos los intentos de prueba previstos, incluidos vuelos abortados, fallas de importación, referencia no apta y resultados parciales; publicar motivos y denominadores. Una repetición no elimina el intento fallido.
- **FR-004:** DEBE medir precisión/exhaustividad de detección con correspondencia uno a uno, y error de conteo separado; dos errores que se cancelan en el total siguen siendo un falso positivo y un falso negativo.
- **FR-005:** DEBE comparar revisión asistida con conteo manual de la misma evidencia, usando orden alternado y revisores distintos cuando sea posible. Ambos permanecen ciegos a la referencia física y a los resultados del otro método. Registrar aprendizaje y experiencia de los revisores.
- **FR-006:** DEBE publicar resultados por campaña y por estrato de captura presente, además del agregado. Estratos ausentes o escasos no reciben conclusiones de generalización.
- **FR-007:** en P1 DEBE incluir pruebas de trazabilidad, marcas duplicadas en la misma imagen, oclusiones, animales fuera de cuadro, cambio de imagen, errores/cero y exportación; usar 001–004 y 006 como matriz. Comprobar que un animal visible solo en otro instante no se agrega al conteo P1. Los tests de seguimiento y discontinuidades de 005 se exigen al evaluar P2.
- **FR-008:** DEBE emitir una decisión con metas cumplidas/incumplidas, limitaciones, material necesario para repetirla y cambios propuestos. Los ajustes tras ver prueba se evalúan en otra versión con nueva prueba retenida.

## Entidades principales

- **Intento de prueba:** campaña prevista, resultado, referencia, cobertura y motivo de rechazo o abstención.
- **Medición:** método, conteo, error, duración, entorno y estrato.
- **Informe de evaluación:** versiones congeladas, denominadores, resultados por campaña, límites y decisión.

## Métricas y denominadores

Para una campaña con referencia apta, `N` es el conteo físico, `A` el automático congelado antes de correcciones y `R` el revisado. Una ausencia de resultado se registra como no disponible, nunca como cero.

| Métrica | Definición |
|---|---|
| Error absoluto automático/revisado | `abs(A − N)` / `abs(R − N)`, calculados por separado cuando existe el número |
| Error relativo | Error absoluto dividido por `N`, solo si `N > 0` |
| MAE | Promedio de errores absolutos sobre campañas con número y referencia; indicar tamaño de muestra para cada método |
| WAPE | `sum(abs(predicción − N)) / sum(N)` sobre la misma muestra, si el denominador es positivo |
| Sesgo | Promedio de `predicción − N`; positivo indica sobreconteo. No sustituye el error absoluto |
| Aceptación operativa | Intentos con referencia apta, cobertura completa y resultado revisado cerrado / todos los intentos de prueba previstos |
| Disponibilidad automática | Intentos con propuesta automática numérica / todos los intentos; publicar también cuántas propuestas cumplen su tolerancia |
| Rechazo/abstención | Intentos sin resultado cerrado / todos los intentos, desglosados por causa; complementa la aceptación |
| Precisión de detección | `TP / (TP + FP)` con correspondencia uno a uno a regiones anotadas, IoU ≥0,5 |
| Exhaustividad de detección | `TP / (TP + FN)` con la misma regla; denominadores vacíos se informan como no disponibles |
| Ahorro humano | `1 − mediana(tiempo de revisión asistida) / mediana(tiempo de conteo manual)` sobre las mismas campañas aceptadas por ambos métodos |

Los tiempos humanos incluyen selección de la imagen, navegación y resolución de dudas, además de edición. La selección común se carga a ambos métodos; se registra el acceso a imágenes de contexto. Los tiempos de captura, importación, preparación/detección y exportación se registran por separado, junto con la duración total; P2 agrega la deduplicación entre vistas. Para intentos parciales o rechazados se reporta igualmente el esfuerzo consumido. La tasa de aceptación no es porcentaje de área encuadrada: encuadre y visibilidad individual se registran por separado.

## Casos límite

Lote vacío; referencia discordante; omisión y duplicación que cancelan el error neto; una campaña muy grande que domina WAPE; todas las campañas rechazadas; buen conteo pero revisión más lenta que la manual; resultados ausentes; intento repetido tras observar un fallo. Un informe sin campañas aceptadas es inconcluso o fallido, nunca error medio cero.

## Criterios de éxito

Todos los umbrales son metas propuestas del POC, pendientes de contraste en campo:

- **SC-001 — Muestra y aceptación:** al menos cinco campañas de prueba aceptadas, de al menos dos lotes y dos fechas, y aceptación operativa ≥80%. Si se planifican cinco y una falla, hace falta ampliar con prueba nueva hasta cumplir ambos criterios; se conserva el fallo en el denominador. El presupuesto de ampliación se fija antes de evaluar para no detenerse selectivamente al alcanzar la meta.
- **SC-002 — Conteo automático:** cada campaña aceptada tiene propuesta automática y error `≤ max(2, 0,05 × N)` animales. Un resultado automático ausente no cumple este criterio aunque un humano logre cerrarlo.
- **SC-003 — Conteo revisado:** en cada campaña aceptada, error `≤ max(1, 0,02 × N)` animales. Para `N = 0`, ambos conteos deben ser exactamente cero; esta regla sustituye las tolerancias anteriores en lotes vacíos.
- **SC-004 — Detección:** precisión ≥95% y exhaustividad ≥90% en prueba según 004, reportando el número de animales/regiones evaluados y los resultados por condiciones presentes.
- **SC-005 — Esfuerzo:** ahorro humano mediano ≥50% sobre las mismas campañas, con al menos cinco pares de mediciones. Se reporta dispersión y no se atribuye ahorro si el asistido abandona casos que el manual sí completa.
- **SC-006 — Operación y evidencia:** preparación/detección de hasta 10 minutos de video en hasta 30 minutos en el equipo documentado, conforme a 004; 100% de paquetes cerrados son reconstruibles y ningún caso deliberado de cobertura incompleta/duda abierta permite un total revisado.

## Regla de decisión

- **Continuar con un piloto mayor:** se cumplen SC-001–SC-006 en el escenario probado. El tamaño inicial permite una decisión exploratoria, no una garantía comercial de exactitud.
- **Ajustar y repetir:** falla alguna meta, pero hay evidencia de una mejora concreta de captura, detector, correspondencias o revisión; declarar qué metas sí cumple el flujo asistido. No cambiar umbrales para aprobar la misma prueba.
- **Descartar el enfoque para ese escenario:** las limitaciones de visibilidad, continuidad o esfuerzo impiden producir un total útil con el protocolo y equipo disponibles.
- **Inconcluso:** faltan referencias aptas o muestra suficiente; conservar resultados y especificar qué evidencia falta.

## Supuestos y decisiones por aclarar

El escenario confirmado es corral o grupo reunido. Antes de la prueba se fijan calendario, cantidad máxima de intentos, computadora y responsables. Fotografías o fotogramas que cubran el grupo completo pueden validar el POC principal si existe referencia física independiente; fotos parciales sin ella solo permiten evaluar detección visible. Si la densidad u oclusión impide obtener una imagen suficiente, los intentos siguen en la tasa de rechazo y se decide si mejorar captura o estudiar P2.
