# Spec 006: revisar el conteo y exportar evidencia

**Feature:** `006-revision-evidencia` · **Creada:** 2026-09-06 · **Actualizada:** 2026-09-07 · **Versión:** 0.3.0 · **Estado:** borrador.
**Entrada:** convertir propuestas automáticas en resultados entendibles y corregibles.
**Dependencias P1:** [001](../001-captura-campana/spec.md), [002](../002-importacion-calidad/spec.md), [004](../004-deteccion-bovinos/spec.md). [005](../005-conteo-sin-duplicados/spec.md) se requiere únicamente para la extensión P2 entre vistas. Ambas historias se implementan en P1 sobre una sola imagen. Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Dar a una persona la posibilidad de revisar el conteo, resolver dudas y descargar un paquete de resultados con evidencia. El POC tiene un operador con acceso autenticado desde navegador, sin colaboración simultánea. El procesamiento y la persistencia pueden residir en nube.

## Historias de usuario y pruebas

### US1 — Corregir las marcas del conteo (P1)

Como revisor, quiero agregar omisiones, quitar falsos positivos y corregir duplicados viendo el original.

**Motivo de prioridad:** permite usar y evaluar el POC aun cuando el detector cometa errores.
**Prueba independiente:** cargar una imagen de referencia con una omisión, un falso positivo y dos marcas del mismo bovino; corregirlos y deshacer las acciones. La revisión de correspondencias entre imágenes se prueba solo al activar P2.

**Escenarios de aceptación:**

1. **Dado** un animal omitido, **cuando** lo agrego sobre la imagen, **entonces** cambia el conteo revisado y permanece intacta la propuesta automática.
2. **Dado** un bovino marcado dos veces en la misma imagen, **cuando** quito la marca duplicada, **entonces** veo el efecto en el total y queda registro reversible con motivo y evidencia. En P2 también puedo unir o separar observaciones de distintas imágenes.

### US2 — Cerrar y exportar un resultado entendible (P1)

Como responsable del lote, quiero un reporte que explique el número, su alcance y sus limitaciones.

**Motivo de prioridad:** el entregable del POC es el conteo con evidencia.
**Prueba independiente:** abrir una exportación completa y otra parcial en otra carpeta sin acceso a la aplicación ni a internet.

**Escenarios de aceptación:**

1. **Dada** una campaña con cobertura completa, movimientos reconciliados y cero dudas, **cuando** confirmo la revisión, **entonces** se exportan total automático, total revisado y su evidencia como una versión cerrada.
2. **Dada** una campaña con cobertura incompleta o dudas abiertas, **cuando** exporto, **entonces** el reporte conserva estado parcial/pendiente y explica qué falta; no ofrece cierre como total del lote.

## Requisitos funcionales

- **FR-001:** la interfaz DEBE estar en español y permitir navegar por campaña, sector, imagen e instante original, con ampliación y marcas visibles.
- **FR-002:** DEBE permitir agregar/quitar/corregir detecciones sobre la imagen de referencia, con deshacer, persistencia al reabrir e historial de cuenta autorizada, fecha y motivo. Unir/separar observaciones entre imágenes solo es requisito de P2.
- **FR-003:** DEBE mostrar conteo automático y revisado, dudas pendientes, cobertura y alcance temporal/espacial sin confundir el conteo visible con el total del lote.
- **FR-004:** DEBE impedir cerrar un total revisado si incumple las condiciones de cierre del [contexto común](../contexto-mini-4k.md): grupo completo, individuos distinguibles, movimientos reconciliados y dudas resueltas. En P2 se aplica además FR-006 de 005. Permitir exportar el trabajo parcial con motivos explícitos.
- **FR-005:** DEBE generar un reporte legible sin la aplicación y una tabla CSV de resultados/correcciones. El paquete incluye imágenes anotadas, manifiesto de archivos con huellas y localizadores al origen, modelo/configuración, tiempos, estados y versiones.
- **FR-006:** el paquete DEBE incluir la evidencia original necesaria para reconstruir el resultado cerrado, con rutas relativas; si el usuario exporta solo un resumen sin originales, debe rotularlo como resumen sin evidencia completa.
- **FR-007:** DEBE separar ubicación/hora declaradas de metadatos observados y explicar que la huella de integridad no autentica el momento o lugar del vuelo.
- **FR-008:** DEBE guardar nuevas revisiones como versiones en almacenamiento persistente y confirmar su guardado al operador. Reabrir el navegador recupera la última revisión confirmada. La infraestructura remota mantiene los datos privados; ninguna exportación se publica o comparte automáticamente con destinatarios externos.
- **FR-009:** en P1, todas las marcas incluidas DEBEN pertenecer a la misma imagen de referencia. Las vistas adicionales sirven como contexto, no para añadir individuos visibles solo en otros instantes ni para completar el número esperado. La duda persistente exige resultado parcial o nueva captura; cambiar de imagen inicia otra ejecución.

## Entidades principales

- **Corrección:** acción reversible, objetos afectados, motivo y cuenta autorizada.
- **Revisión:** versión, resultado antes/después, dudas y estado de cierre.
- **Paquete de evidencia:** reporte, tabla, imágenes, originales y manifiesto verificable.

## Casos límite

Corral completo en cuadro pero animales ocultos bajo techo; terneros solapados; intentar agregar un animal visto solo en otro fotograma; cerrar sin revisar el borde del grupo; correcciones contradictorias; borrar accidentalmente un animal; ejecutar otro modelo; original ausente; falta de espacio; exportación interrumpida; lote vacío. Un total cero solo es cerrable con evidencia completa y revisión explícita.

## Criterios de éxito

- **SC-001:** agregar una omisión, quitar un falso positivo y resolver un duplicado cambia el conteo esperado; deshacerlos restaura exactamente el resultado anterior, incluso tras reabrir.
- **SC-002:** 100% de los paquetes completos de prueba permiten reconstruir el número y abrir la evidencia desde otra carpeta sin depender de rutas absolutas ni internet.
- **SC-003:** ningún caso de prueba con cobertura incompleta/desconocida o dudas abiertas logra cerrar un total revisado del lote.
- **SC-004:** el tiempo de revisión y el error corregido alcanzan las metas de [007](../007-validacion-campo/spec.md), medidos con revisores que no ven la referencia.

## Supuestos y decisiones por aclarar

La revisión se hace desde un navegador de escritorio con una cuenta autorizada; las correcciones registran esa identidad. No se exige firma digital personal ni cadena de custodia certificada. El formato concreto del reporte se elige en el plan, manteniendo descarga y lectura independiente. SC-002 exige portabilidad del paquete descargado, no operación sin conexión de la aplicación.
