# Revisión documental: electricidad, Starlink, Mac mini y nube

**Fecha:** 2026-09-07 · **Versión del POC:** 0.3.0 · **Alcance:** impacto del nuevo supuesto en todos los documentos del repositorio. No es una nueva verificación de todas las afirmaciones históricas de mercado ni una prueba de campo.

## Supuesto confirmado y efecto

El usuario garantiza corriente eléctrica mediante baterías, generador o red e internet mediante Starlink. Se sustituye la exigencia de procesamiento local sin conexión por una arquitectura recomendada en nube. No queda pendiente confirmar si habrá suministro o internet. Sí se deben dimensionar las cargas y medir transferencia, costo y tiempo total con los equipos y archivos elegidos.

La revisión abarca **51 documentos preexistentes**: README, constitución, 17 documentos de specs, informe Markdown de mercado, 28 páginas públicas y tres páginas técnicas. Se agregan este registro y la [arquitectura recomendada](arquitectura-recomendada.md). También se revisaron los generadores, estilos, validador, guía de contribución y configuración de publicación para delimitar el efecto de los cambios.

## Inventario y resultado

| Documentos revisados | Resultado |
|---|---|
| [README del repositorio](../README.md) | Enlaces al nuevo supuesto, arquitectura y esta revisión |
| [Constitución](../.specify/memory/constitution.md) | Principio V actualizado: electricidad/internet, nube, privacidad y persistencia; exportación portable |
| [Índice de specs](README.md), [contexto](contexto-mini-4k.md) y [consistencia](checklists/consistencia.md) | Infraestructura confirmada; cliente y nube separados; nuevas métricas y trazabilidad |
| [001 · Captura](001-captura-campana/spec.md) | Registro con internet disponible; vuelo manual y baterías del dron siguen vigentes |
| [002 · Importación](002-importacion-calidad/spec.md) | Carga remota privada, reanudación, integridad y permisos; preferencia por JPEG original en P1 |
| [003 · Dataset](003-dataset-referencia/spec.md) | Versión revisada; permanecen particiones, anotaciones y referencia independiente |
| [004 · Detección](004-deteccion-bovinos/spec.md) | Trabajo asíncrono remoto, sin GPU cliente; cómputo separado de subida, cola y arranque |
| [005 · Reconciliación](005-conteo-sin-duplicados/spec.md) | Versión revisada; permanece extensión P2, sin sumas temporales en P1 |
| [006 · Revisión](006-revision-evidencia/spec.md) | Una cuenta autenticada, persistencia remota y descarga; se conserva lectura offline del paquete exportado |
| [007 · Validación](007-validacion-campo/spec.md) | Costos, tiempos y pruebas de servicio añadidos; metas de exactitud y denominadores conservados |
| Siete checklists individuales | Fecha/versión y estado de supuestos actualizados; no representan pruebas ejecutadas |
| [Supuestos públicos](../research/supuestos.html), [preguntas](../research/preguntas.html) | S06 y S18 revisados; Q06 sustituye respuesta previa y Q20 conserva latencia por definir; historial explícito |
| [Tecnología](../research/tecnologia.html), [análisis](../research/analisis.html), [inicio](../research/index.html) | Aviso de alcance del POC y principios corregidos; autonomía local queda condicionada al despliegue |
| [Fondos](../research/fondos.html), [feedlot](../research/feedlot.html) | Se conserva alcance comercial más amplio; la sincronización offline deja de ser una exigencia universal |
| [Mercado](../research/mercado.html), [supuestos de mercado](../research/supuestos-mercado.html), [preguntas de mercado](../research/preguntas-mercado.html), [informe fuente](../research/report-source.md) | M06 y supuesto fuente corregidos; aviso del POC separado de las fechas de investigación comercial |
| 18 fichas en [research/items](../research/items/ganaderia.html) | Revisadas sin cambios: las prestaciones offline de proveedores y sus incógnitas no son supuestos operativos propios |
| [Análisis técnico](../research-tech/analisis.html), [supuestos técnicos](../research-tech/supuestos.html), [preguntas técnicas](../research-tech/preguntas.html) | S-20, contexto de S-21, P-14 y P-16 revisados; estudios solares y edge quedan como escenarios diferentes |
| Generadores de mercado y enfoques | Fuentes y HTML regenerado coinciden; ninguna ficha comercial cambia por el nuevo supuesto |
| Estilos, validador, AGENTS y workflow | Sin cambios necesarios: se reutiliza el diseño y la publicación sigue limitada a research/ |

Las 18 fichas revisadas son AgriWebb, Baqueano, Breedr, CattleEye, CattleProof, Cattler, Ceres Tag, FieldData, Finca, GanaderIA, Ganaderos, mooVement, Olho do Dono, Optiweigh, PGG, Terko TK3516L, Tru-Test WOW y Vytelle SENSE.

## Qué cambia en las decisiones

- **Compra de equipo:** una estación NVIDIA deja de ser necesaria para el procesamiento principal. Se puede usar un cliente existente; M6 con 24 GB/512 GB es la propuesta si se compra Mac mini para nube. M5 Pro con 48 GB/1 TB se justifica principalmente por trabajo local adicional.
- **Plataforma:** aplicación web, CPU y GPU por trabajo en Modal, originales privados en S3 y estado en PostgreSQL administrado. Proveedores propuestos, no contratados.
- **Modelo:** RF-DETR Small sigue como candidato a validar/adaptar; disponer de nube no exige un LLM ni demuestra mejor conteo.
- **Operación:** medir costo y tiempo total. Electricidad garantizada no evita los cambios de batería en vuelo; internet garantizado no fija una velocidad de subida.
- **Validación:** exactitud, cobertura, animales ocultos, referencia física y rechazo de intentos permanecen. Nube o Mac más potente no recuperan evidencia visual ausente.

## Comprobaciones y límites

Los dos generadores se ejecutaron y el validador público confirmó 28 HTML, 18 fichas, IDs y enlaces locales válidos. Se comprobó además integridad de enlaces locales Markdown y de las tres páginas técnicas, y ausencia de errores de whitespace en el diff. No se ejecutó spec-kit ni pruebas de producto: aún no existe implementación.

La comprobación visual en escritorio y móvil no se completó: la política de seguridad del navegador rechazó abrir las páginas como archivos locales. No se eludió ese bloqueo. Se conserva el CSS existente; esta limitación no equivale a una validación visual aprobada.

Los cambios están en el repositorio local, sin publicación ni contratación de nube. Specs y research-tech no forman parte del despliegue actual de GitHub Pages. Las fuentes actuales de Apple, Modal, PyTorch, AWS y RF-DETR están enlazadas junto a las afirmaciones en la arquitectura recomendada; las fechas de corte de investigación histórica se conservan.
