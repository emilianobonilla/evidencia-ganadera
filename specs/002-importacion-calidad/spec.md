# Spec 002: importar originales y evaluar su calidad

**Feature:** `002-importacion-calidad` · **Creada:** 2026-09-06 · **Versión:** 0.2.0 · **Estado:** borrador.
**Entrada:** transformar una captura del Mini 4K en evidencia local utilizable.
**Dependencias:** [001](../001-captura-campana/spec.md). Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Importar los originales, conservar su procedencia y seleccionar una imagen de referencia del corral o grupo sin perder la relación con el video o fotografía original. Se pueden preparar otras imágenes para inspección o dataset, pero el conteo P1 utiliza un solo instante. Un archivo inválido o una zona sin imagen nunca deben interpretarse como conteo cero.

## Historias de usuario y pruebas

### US1 — Importar una campaña sin duplicar originales (P1)

Como operador, quiero copiar los archivos y relacionarlos con la campaña para procesarlos y volver a encontrarlos.

**Motivo de prioridad:** constituye la entrada común a detección, revisión y evaluación.
**Prueba independiente:** importar dos videos y una foto de ejemplo, repetir la importación y comparar los originales.

**Escenarios de aceptación:**

1. **Dado** un MP4 o JPEG admitido, **cuando** lo importo, **entonces** se conserva una copia íntegra y quedan disponibles tipo, dimensiones, tamaño y duración cuando corresponda.
2. **Dado** el mismo contenido con otro nombre, **cuando** lo importo nuevamente, **entonces** se reconoce como duplicado y se permite vincularlo sin duplicar el original ni el conteo.

### US2 — Identificar material utilizable y sus fallas (P1)

Como revisor, quiero ver imágenes candidatas y problemas de calidad para elegir evidencia y pedir una repetición si hace falta.

**Motivo de prioridad:** evita confiar en imágenes que no permiten distinguir individuos.
**Prueba independiente:** usar material nítido, borroso, oscuro, truncado y sin metadatos de ubicación.

**Escenarios de aceptación:**

1. **Dado** un video legible, **cuando** preparo las imágenes de trabajo, **entonces** cada imagen lleva referencia al archivo y a su tiempo de presentación original.
2. **Dado** material ilegible o de baja calidad, **cuando** lo proceso, **entonces** aparece rechazado o pendiente con motivo y se mantiene registrado en la campaña.

## Requisitos funcionales

- **FR-001:** el sistema DEBE admitir originales MP4 H.264 4K a 24/25/30 fps y JPEG; informar formatos no admitidos sin modificar el archivo de entrada.
- **FR-002:** DEBE conservar los originales, identificar contenido duplicado mediante una huella de integridad y separar de ellos todas las transformaciones.
- **FR-003:** DEBE asociar originales a campaña/sector y registrar nombre, huella, dimensiones, duración, fecha de importación y procedencia declarada; metadatos ausentes permanecen ausentes.
- **FR-004:** DEBE permitir seleccionar intervalos e imágenes a resolución original. Cada imagen derivada conserva su localizador temporal y la configuración de extracción. Las vistas reducidas no sustituyen la entrada de análisis.
- **FR-005:** DEBE conservar acceso a la secuencia original como contexto de revisión y para la eventual extensión 005, aunque el conteo P1 use una única imagen; el muestreo no debe destruir el resto de la evidencia.
- **FR-006:** DEBE mostrar banderas revisables de desenfoque, exposición o tamaño insuficiente del animal y permitir confirmarlas/corregirlas. Los umbrales se calibran con 003 y quedan versionados antes de la prueba.
- **FR-007:** DEBE gestionar importación interrumpida, archivo corrupto y espacio insuficiente sin presentar trabajos parciales como completos; permitir reintentar de forma idempotente.
- **FR-008:** DEBE funcionar sin conexión con los componentes ya preparados y sin enviar originales o ubicaciones a servicios externos.
- **FR-009:** DEBE registrar la imagen de referencia seleccionada por nitidez, cobertura y visibilidad individual antes de consultar predicciones o total físico, conforme al contexto común. Cambiarla genera una nueva ejecución con motivo y conserva las anteriores; no seleccionarla por máximo conteo ni cercanía al inventario esperado.

## Entidades principales

- **Original:** contenido, huella, metadatos observados y asociación a campaña.
- **Imagen de trabajo:** localizador de origen, transformaciones y calidad.
- **Importación:** estado, errores, progreso y resultado por archivo.

## Casos límite

Mismo nombre con distinto contenido; distinto nombre con igual contenido; fragmentos consecutivos de una grabación; cadencia irregular o tiempos discontinuos; GPS inexistente; captura de pantalla del teléfono; video válido sin bovinos. Una vista previa reducida debe quedar identificada y no pasar por original apto para la evaluación 4K.

## Criterios de éxito

- **SC-001:** 100% de las imágenes derivadas de las pruebas permiten abrir el original y localizar el instante o fotografía correspondiente.
- **SC-002:** una segunda importación del mismo conjunto agrega cero copias de contenido y conserva todas sus asociaciones válidas.
- **SC-003:** en pruebas con corrupción, falta de espacio e interrupción, 100% de los archivos afectados presentan estado y motivo verificables, y ningún original resulta alterado.
- **SC-004:** cada conteo P1 queda asociado a exactamente una imagen de referencia; al cambiarla se crea una nueva ejecución y no se mezclan sus detecciones con las anteriores.

## Supuestos y decisiones por aclarar

Hay un lector o método de copia de microSD y espacio local suficiente. El equipo de proceso, los límites por campaña y los umbrales de calidad se fijarán en el plan y se probarán con archivos reales antes de la evaluación final. DNG queda fuera de la entrada mínima.
