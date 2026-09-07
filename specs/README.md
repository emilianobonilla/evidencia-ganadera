# Especificaciones del POC: contar ganado con DJI Mini 4K

**Versión:** 0.3.0 · **Fecha:** 2026-09-07 · **Estado:** escenario confirmado; especificaciones propuestas, sin implementación ni validación de campo.

## Objetivo

Comprobar si el DJI Mini 4K disponible permite obtener un conteo de bovinos útil y revisable en un **corral o grupo reunido**: captura manual, selección de una imagen que abarque el grupo, detección, revisión y exportación de evidencia. Se medirá por separado el conteo automático y el resultado corregido por una persona.

**Escenario confirmado por el usuario:** «Corral o grupo reunido» (2026-09-06). Se propone captura de día, con el grupo completo en una misma imagen y los individuos distinguibles. El video permite elegir una imagen de referencia y revisar su contexto; sus conteos no se acumulan. Como escala exploratoria se mantienen 20–100 bovinos por campaña, pendiente de confirmar junto con el dispositivo cliente y los responsables de la referencia independiente.

**Actualización del 2026-09-07:** electricidad e internet por Starlink garantizados. Se recomienda procesamiento en nube y se retira la exigencia de procesamiento local sin conexión. Ver [arquitectura, Mac mini y costos](arquitectura-recomendada.md) y [revisión de todos los documentos](revision-documental.md).

## Lista de specs y orden propuesto

P1 significa imprescindible para demostrar el POC completo; P2, mejora que puede esperar. La numeración define el orden de dependencias, no siete productos separados. Cada feature se puede verificar de forma aislada con entradas de ejemplo.

| Spec | Prioridad | Resultado entregable | Depende de |
|---|---|---|---|
| [001 · Captura de una campaña](001-captura-campana/spec.md) | P1 | Corral/grupo delimitado, encuadre completo e imagen de referencia | — |
| [002 · Importación y calidad](002-importacion-calidad/spec.md) | P1 | Originales trazables, imágenes utilizables y problemas visibles | 001 |
| [003 · Dataset y conteo de referencia](003-dataset-referencia/spec.md) | P1 | Imágenes anotadas y totales independientes para evaluar | 001, 002 |
| [004 · Detección de bovinos](004-deteccion-bovinos/spec.md) | P1 | Animales marcados y conteo visible por imagen | 002, 003 |
| [005 · Conteo sin duplicados](005-conteo-sin-duplicados/spec.md) | P2 | Extensión opcional para reconciliar varias imágenes o pasadas | 001, 002, 004 |
| [006 · Revisión y evidencia](006-revision-evidencia/spec.md) | P1 | Correcciones auditables y reporte del corral/grupo | 001, 002, 004; 005 solo en la extensión |
| [007 · Validación en campo](007-validacion-campo/spec.md) | P1 | Comparación ciega y decisión sobre el conteo del grupo completo | 001–004, 006; 005 solo en la extensión |

## Orden de implementación y extensión

1. **POC principal: 001 → 002 → 003 → 004 → 006 → 007.** Cada campaña selecciona una imagen de referencia del corral o grupo completo. El revisor corrige marcas, comprueba cobertura y exporta; se valida el total contra referencia física independiente. Seleccionar una imagen puede hacerse desde un video o a partir de fotografías originales. No requiere seguimiento entre fotogramas.
2. **Extensión P2: 005 e integración con 006/007.** Solo si hacen falta varias vistas para cubrir el grupo, estudiar correspondencias y duplicados entre imágenes. Mientras esta extensión no se implemente y valide, una captura sin imagen suficiente produce un resultado parcial o requiere recaptura; no se suman conteos de distintas vistas.

La deduplicación de detecciones entre recortes de una misma imagen sigue siendo P1 en 004. El riesgo principal del escenario reunido es distinguir individuos que se tocan, se superponen o quedan bajo estructuras; que el corral entre en el encuadre no demuestra por sí solo visibilidad de todos sus animales.

## Definición propuesta de éxito

Las fórmulas, denominadores y tratamiento de rechazos están en [007](007-validacion-campo/spec.md). Los umbrales siguientes son metas del proyecto, no prestaciones demostradas del dron o de un modelo:

- Al menos cinco campañas de prueba aceptadas, de al menos dos lotes y dos fechas, y una aceptación de al menos 80% de los intentos de prueba previstos. Los intentos fallidos permanecen en el informe.
- En cada campaña aceptada, error automático absoluto de hasta `max(2 animales, 5% del total de referencia)` y error revisado de hasta `max(1 animal, 2% del total de referencia)`. En lotes vacíos ambos deben ser exactamente cero.
- Mediana del tiempo humano de revisión al menos 50% menor que contar manualmente la misma evidencia, con el orden de los métodos alternado y sin mostrar la referencia al revisor.
- Todas las campañas con cobertura incompleta o correspondencias sin resolver quedan identificadas como parciales o pendientes; ninguna se exporta como total revisado del lote.

## Uso de spec-kit

Se sigue la [guía oficial](https://github.github.com/spec-kit/quickstart.html) y la [estructura oficial de especificación](https://github.com/github/spec-kit/blob/main/templates/spec-template.md): qué necesita el usuario, historias priorizadas, aceptación y éxito medible. Los textos se adaptan al español.

La [constitución](../.specify/memory/constitution.md), estas siete `spec.md` y sus checklists cubren la definición inicial. Para cada feature: aclarar sus supuestos (`speckit.clarify`), generar el diseño (`speckit.plan`), desglosar tareas (`speckit.tasks`), revisar consistencia (`speckit.analyze`) e implementar (`speckit.implement`). El plan debe incorporar las pruebas funcionales y de campo exigidas por la spec.

**Estado de herramientas:** estos documentos fueron redactados siguiendo la guía; no se ejecutó la CLI ni se instalaron comandos, plantillas o skills de spec-kit. Los nombres anteriores describen el flujo posterior, no comandos disponibles en este checkout. La integración de Codex determina la forma de invocarlos. No hay `plan.md` ni `tasks.md` porque este entregable es la lista desarrollada de especificaciones, con una recomendación de arquitectura separada que deberá concretarse en esos planes.

## Decisiones pendientes y supuestos

| Tema | Supuesto de trabajo | Cuándo resolverlo |
|---|---|---|
| Escenario | Corral o grupo reunido, confirmado por el usuario | Resuelto el 2026-09-06 |
| Escala y encuadre | 20–100 bovinos como hipótesis; grupo completo en una imagen con individuos distinguibles | Al preparar la primera campaña |
| Electricidad | Permanente mediante baterías, generador o red | Confirmado por el usuario el 2026-09-07 |
| Internet | Garantizado mediante Starlink | Confirmado por el usuario el 2026-09-07; medir velocidad de subida |
| Equipo de proceso | Nube recomendada; cliente con navegador y acceso a microSD | Fijar entorno y presupuesto en los planes de 002 y 004 |
| Referencia | Conteo físico independiente en ventana de movimiento controlado | Antes de capturar la prueba de 003 |
| Rendimiento esperado | Hasta 30 minutos de cómputo para hasta 10 minutos de video; subida, cola y arranque separados | Medir en 004; fijar además tiempo total y costo máximos en 007 |

La [revisión documental](checklists/consistencia.md) distingue integridad de las specs de la futura validación del producto. Las [restricciones y fuentes](contexto-mini-4k.md) son compartidas por las siete specs.
