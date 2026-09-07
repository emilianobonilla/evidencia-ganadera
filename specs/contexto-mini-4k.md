# Contexto común y restricciones del DJI Mini 4K

**Versión:** 0.3.0 · **Fecha de consulta:** 2026-09-07.

**Aclaración del usuario (2026-09-06):** el escenario del POC es corral o grupo reunido. El conteo principal usa una imagen de referencia con el grupo completo; la reconciliación entre vistas queda como extensión P2.

## Equipo confirmado y hechos del fabricante

El usuario dispone de un **DJI Mini 4K**. Las siguientes capacidades corresponden a ese modelo específico:

| Dato publicado | Valor |
|---|---|
| Sensor / fotografías | CMOS de 1/2,3 pulgadas, 12 MP; hasta 4000 × 3000; JPEG/DNG |
| Video original | MP4 H.264, 3840 × 2160 a 24/25/30 fps; hasta 100 Mbps |
| Gimbal | Estabilización mecánica de tres ejes; inclinación controlable hasta −90° |
| Autonomía máxima anunciada | 31 minutos en condiciones de ensayo; no es un presupuesto operativo garantizado |
| Posicionamiento | GPS, GLONASS y Galileo |

Fuente primaria: [especificaciones de DJI](https://www.dji.com/mini-2-se/specs). La página combina Mini 4K y Mini 2 SE; los valores de video de arriba son los del Mini 4K.

DJI indica que se utiliza DJI Fly y que los originales requieren microSD; sin ella, la grabación en el teléfono queda limitada a 720p. Fuente: [preguntas frecuentes de DJI](https://www.dji.com/mini-2-se/faq).

La [matriz oficial de compatibilidad SDK](https://repair.dji.com/help/content?customId=01700000763&lang=en&paperDocType=ARTICLE&re=US&spaceId=17) marca **sin compatibilidad** al Mini 4K. Por eso el POC se diseña sin control programático del vuelo, streaming por SDK ni misiones de vuelo comandadas desde nuestra aplicación. Esta es una decisión de diseño basada en la compatibilidad consultada.

## Decisiones propuestas para el POC

- Captura manual en DJI Fly con video original 4K a 30 fps o fotografías JPEG originales. Se elige una única imagen de referencia para cada conteo; el video conserva contexto y permite seleccionar un fotograma. No se exige DNG para la primera entrega.
- Electricidad permanente mediante baterías, generador o red, e internet garantizado mediante Starlink, confirmados por el usuario el 2026-09-07. Se elimina el requisito de operación sin conexión y se recomienda procesamiento posterior en nube, con acceso privado y exportación descargable. La velocidad de subida y el tiempo total se medirán; la disponibilidad de internet queda resuelta.
- El Mini 4K conserva su autonomía por batería: disponer de corriente en tierra permite recargar y sostener los equipos, pero no elimina cambios de batería ni convierte el vuelo en continuo.
- Vista aproximadamente cenital y sin zoom digital. Calibrar altura, velocidad y exposición con imágenes del lugar antes de congelar el protocolo; no fijar una altura universal para todos los rodeos.
- Encuadrar el corral o grupo completo, incluyendo sus límites, sin cortar animales. En el POC principal, el grupo constituye un único sector; los recortes para analizar la imagen son divisiones del mismo instante, no pasadas adicionales. Registrar giros, cortes y cambios de batería sin sumar sus conteos.
- Registrar reserva de batería, duración operativa y condiciones reales con el piloto. Las decisiones de vuelo corresponden al piloto y al procedimiento aplicable al lugar; el software documenta la campaña.
- Ante reacción del ganado, interrumpir la aproximación y ajustar el procedimiento. El objetivo es observarlo sin arrearlo con el dron.
- No depender de GPS por fotograma, archivos SRT, RTK, mapas centimétricos ni metadatos no comprobados. Datos ausentes se registran como ausentes; una ubicación cargada por una persona queda identificada como declarada.

Estos puntos son hipótesis y requisitos propuestos, no un protocolo ya validado.

## Unidad de conteo y vocabulario

| Concepto | Definición para todas las specs |
|---|---|
| Campaña | Observación de un corral o grupo delimitado durante una ventana declarada; contiene archivos y una imagen de referencia para el conteo principal |
| Sector | Área objetivo con límites identificables y estado de cobertura; en P1 es el corral/grupo completo, y en P2 puede ser una parte del conjunto |
| Imagen de referencia | Fotografía original o fotograma seleccionado por calidad y cobertura antes de consultar predicciones o total físico; todas las marcas del conteo P1 pertenecen a ese mismo instante |
| Conteo visible | Bovinos observables en una imagen o región a un instante; incluye terneros si se distinguen como individuos |
| Conteo automático | Propuesta antes de correcciones humanas, con las mismas fronteras espaciales y temporales del resultado revisado |
| Conteo revisado | Propuesta corregida con historial y evidencia; puede seguir siendo parcial |
| Referencia | Conteo independiente del lote real y anotaciones independientes de la evidencia visible; son dos referencias distintas |
| Cobertura | Estado completo, incompleto o desconocido de lo observado; incluye encuadre, pertenencia al grupo y visibilidad individual, contemplando animales superpuestos, techos, comederos y otros puntos ciegos |
| Estado del resultado | `pendiente`, `parcial`, `revisado` o `rechazado`. Solo `revisado` permite presentar un total del lote, si cobertura y correspondencias están resueltas |

## Condiciones para cerrar el conteo del grupo

En P1, el operador delimita el corral o el grupo objetivo y documenta sus entradas/salidas durante la ventana de referencia. Para un grupo sin cerco se debe identificar el límite observado y registrar cómo se verifica que ningún integrante queda fuera. La imagen de referencia debe abarcarlo completo y permitir distinguir los individuos; las oclusiones y las dudas de pertenencia deben estar resueltas con evidencia. Estas condiciones y la revisión de las marcas permiten cerrar un total del grupo. Si alguna falla, el resultado es parcial o pendiente y puede requerir recaptura.

Se elige la imagen por cobertura, nitidez y visibilidad, antes de ver el resultado del detector o el total físico. Otra imagen puede ayudar a interpretar una forma en la imagen de referencia, pero no permite añadir al conteo P1 un animal que solo aparece en el otro instante. Cambiar de imagen de referencia crea una nueva ejecución con motivo y conserva la anterior. En prueba se congela también esta regla; no se escoge la imagen por tener más detecciones o por acercarse a la referencia física.

Un animal totalmente oculto no puede contarse visualmente. No se rellena un faltante usando el inventario esperado. Los identificadores de seguimiento de la extensión P2 son locales a la campaña, no identidad persistente ni identificación oficial. GNSS o un mosaico de animales en movimiento no resuelven por sí solos la correspondencia entre vistas; 005 y una evaluación separada en 007 deben verificar esa extensión.

## Frontera del producto

Incluye bovinos, detección, conteo por imagen/campaña, revisión, exportación e informe de evaluación. Excluye estimación de peso, sanidad, reconocimiento de caravanas, integración SNIG, identificación entre días, vuelo autónomo, sensores adicionales, operación nocturna y certificación probatoria para terceros.

El [dossier del repositorio](../research/report-source.md) es contexto de negocio, no evidencia de que este POC funcione. Los archivos de campo, ubicaciones precisas y datos de personas se guardarán fuera de los directorios publicados y no se versionarán como contenido del sitio.
