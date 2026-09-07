# Arquitectura recomendada: POC Mini 4K con procesamiento en nube

**Versión:** 0.3.0 · **Fecha:** 2026-09-07 · **Estado:** recomendación de diseño, sin implementación, contratación ni benchmark de campo.

## Decisión y supuestos

El usuario garantiza electricidad mediante baterías, generador o red e internet mediante Starlink. Recomiendo una aplicación web privada con procesamiento de visión en nube, pagado por uso. El equipo de campo importa archivos de la microSD y permite revisar detecciones; no necesita una GPU dedicada. La captura sigue realizándose manualmente con DJI Fly y el Mini 4K. No se presupone streaming, control remoto mediante nuestra aplicación ni cómputo a bordo.

Esto sustituye la recomendación anterior de una estación local con GPU NVIDIA como equipo principal. Se retiran el modo offline obligatorio, SQLite como base principal de producción y la prohibición de alojar originales en servicios remotos. Se incorporan cargas reanudables, acceso autenticado, almacenamiento privado, trabajos persistentes y medición del costo por campaña. Un paquete descargado sigue siendo legible sin internet.

El cambio no mejora por sí mismo la exactitud. Permanecen el escenario de corral/grupo reunido, una sola imagen de referencia P1, selección ciega, evidencia original, referencia física independiente, visibilidad individual y tratamiento explícito de oclusiones. La electricidad en tierra permite recargar, pero no prolonga la autonomía de una batería durante un vuelo.

## Plataforma y tecnologías propuestas

| Capa | Elección inicial | Función en el POC |
|---|---|---|
| Cliente | Navegador de escritorio; macOS, Windows o Linux | Importar desde microSD, cargar, revisar y descargar evidencia |
| Interfaz | TypeScript, React, Vite y react-konva | Zoom, marcas sobre la imagen original y correcciones reversibles |
| API y alojamiento web | Python 3.12, FastAPI y Uvicorn en un servicio CPU de Modal | Servir la interfaz compilada y API bajo el mismo origen; sesiones, campañas y estado de trabajos |
| Cómputo de visión | Funciones Python en contenedores Linux de Modal, inicialmente GPU NVIDIA L4 | Inferencia por trabajo; límite inicial de un trabajo GPU simultáneo y escalado a cero en reposo |
| Preparación | FFmpeg/ffprobe, OpenCV y Pillow en CPU | Inspección, extracción trazable de fotogramas y controles de calidad |
| Modelo | RF-DETR Small con PyTorch/CUDA | Candidato inicial; adaptar a imágenes aéreas propias si el baseline no alcanza las metas |
| Objetos pequeños | Recortes superpuestos; evaluar SAHI solo si aporta mejora | Mantener detalle y reconciliar duplicados espaciales antes de contar |
| Archivos | Bucket privado AWS S3 | Originales, derivados, pesos del modelo y paquetes de evidencia |
| Estado | PostgreSQL administrado en Neon; SQLAlchemy y Alembic | Campañas, trabajos, revisiones y trazabilidad; conexiones agrupadas para las funciones |
| Acceso | Una cuenta autorizada, sesión segura y comprobación de permisos en FastAPI | Acceso privado sin construir colaboración multiusuario; secretos solo en servidor |
| Dataset | CVAT y formato COCO; manifiestos versionados | Anotación y particiones por lote/día; tratamiento de negativos y ambigüedades |
| Entorno y verificación | uv, Git, pytest y Playwright | Dependencias fijadas, pruebas de importación/integridad/conteo y recorrido de revisión |
| LLM | Ninguno necesario para contar | Reporte con plantilla; un asistente de texto sería una extensión ajena al conteo |

Son elecciones de ingeniería propuestas, no requisitos de proveedor. Modal documenta [GPU disponibles](https://modal.com/docs/guide/gpu), [servicios FastAPI/ASGI](https://modal.com/docs/guide/webhooks) y [escalado a cero](https://modal.com/docs/guide/scale). Neon ofrece [conexiones PostgreSQL agrupadas](https://neon.com/docs/connect/connection-pooling). El [repositorio de RF-DETR](https://github.com/roboflow/rf-detr) distingue los componentes Apache 2.0 de los componentes Plus con otra licencia: fijar y registrar la licencia del paquete y checkpoint Small elegidos. Ningún benchmark general demuestra todavía conteo bovino cenital con este dron.

Empezar con una L4 y medir memoria y latencia tanto en inferencia como en ajuste del modelo. Modificar batch, resolución o GPU a partir de esa prueba. El entrenamiento es un trabajo separado, ejecutado durante desarrollo; no se reentrena por campaña. Reservar la GPU para tareas que la aprovechan y ejecutar preparación y revisión en CPU. La aplicación futura se aloja aparte del sitio estático de investigación: GitHub Pages no ejecutará el backend ni la GPU.

## Flujo y persistencia

1. Capturar fotografías JPEG originales del grupo y video cuando aporte contexto. Leer la microSD desde el cliente; conservar los archivos de captura hasta verificar la carga.
2. Crear campaña y obtener permisos temporales de carga. Enviar el contenido directamente al bucket privado, con identificadores de objeto inmutables. Usar carga multipart reanudable para videos grandes.
3. Verificar tamaño y huella de integridad de extremo a extremo. Los archivos incompletos no habilitan análisis. El ETag de un multipart no se tratará como SHA-256 del archivo completo. S3 documenta [cargas mediante URL temporal](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html) y [multipart](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html).
4. Preparar candidatas y seleccionar la imagen por nitidez, cobertura y visibilidad antes de ver predicciones o conteo físico. Para un JPEG, el propio archivo es el original; para un fotograma, conservar además su video y localizador temporal.
5. Registrar el trabajo en PostgreSQL y despachar la función GPU. La API devuelve el identificador del trabajo; la interfaz consulta estado sin mantener una petición larga abierta. Registrar intentos y reintentar de forma idempotente; reconciliar trabajos registrados cuyo despacho haya fallado. Cerrar el navegador no cancela un trabajo confirmado. Un disco temporal del contenedor no es almacenamiento de evidencia.
6. Guardar predicciones y revisión por separado. Descargar un paquete con reporte, CSV, originales necesarios, marcas y manifiesto. No cerrar un paquete completo mientras falten originales verificados.

Fijar región, retención, límites de carga, presupuesto y política de borrado en los planes. Elegir regiones cercanas entre cómputo, objetos y base de datos; medir la transferencia real desde Starlink. No se ha contratado ni configurado ninguno de estos servicios.

## Mac mini M6 y M5 Pro

Apple anunció ambos el 25 de agosto de 2026 y señala disponibilidad a partir del 22 de septiembre. Al momento de esta revisión no debe confundirse preventa con entrega inmediata, ni asumirse stock en Uruguay. [Anuncio de Apple](https://www.apple.com/newsroom/2026/08/apple-unveils-a-more-powerful-mac-mini-featuring-the-all-new-m6-and-m5-pro/).

| Uso | Recomendación | Motivo |
|---|---|---|
| POC con visión en nube | Usar una computadora existente; si se compra Mac mini, M6 con 24 GB y SSD de 512 GB | Margen para desarrollo, carga y revisión; 16 GB puede bastar para un cliente dedicado al navegador |
| Experimentación local frecuente | M5 Pro con 48 GB y SSD de 1 TB | Mayor capacidad de memoria y ancho de banda para modelos y video; compra condicionada al interés real en cómputo local |
| Trabajo en varios corrales | Portátil con navegador y lector microSD | Más cómodo de trasladar; el Mac mini requiere pantalla, teclado y alimentación externa |

En las [especificaciones de Apple](https://www.apple.com/mac-mini/specs/), M6 llega a 32 GB de memoria unificada y M5 Pro a 64 GB; este último ofrece 307 GB/s de ancho de banda, frente a hasta 170 GB/s en M6. Una generación más nueva no hace que el chip base supere automáticamente a la gama Pro en esta carga. No hay mediciones de RF-DETR del POC sobre estos equipos que permitan prometer una relación de velocidad.

Para proceso local en Mac habría que probar PyTorch con su backend [MPS/Metal](https://docs.pytorch.org/docs/2.14/notes/mps.html), en lugar de CUDA. MPS utiliza la GPU; no equivale a usar automáticamente el Neural Engine. Verificar operaciones, dependencias y resultados del checkpoint elegido sobre el sistema real. Exportar a Core ML sería otra optimización con validación propia. Si todo el detector corre en nube, cambiar M6 por M5 Pro no modifica su precisión ni su capacidad de cómputo remoto; la diferencia queda principalmente en tareas locales.

## Transferencia, costo y aceptación

La disponibilidad de internet queda confirmada. Falta medir su velocidad efectiva de subida para dimensionar tiempos. DJI publica hasta 100 Mbps de bitrate para el video del Mini 4K en la [ficha compartida](https://www.dji.com/mini-2-se/specs). Por cálculo, 10 minutos al máximo equivalen a unos 7,5 GB decimales. Subir ese archivo a 20 Mbps constantes llevaría unos 50 minutos, antes de sobrecargas. Es un ejemplo calculado, no una medición ni una promesa de velocidad de Starlink. Por eso se priorizan fotografías originales para P1 cuando permitan distinguir todo el grupo.

La [tarifa publicada de Modal para L4](https://modal.com/pricing) es US$0,000222 por segundo: aproximadamente US$0,80 por hora. Diez horas facturables equivalen a unos US$8 de GPU solamente. Se agregan CPU/RAM, almacenamiento, base de datos, transferencia, servicios y los períodos de inicialización o espera que resulten facturables. No es una estimación del costo mensual completo ni incluye Starlink o el equipo cliente. Medir una campaña real antes de proyectar volumen o comparar contra la compra de hardware.

Mantener la meta de hasta 30 minutos de preparación/detección para hasta 10 minutos de video como **tiempo de cómputo**. Publicar aparte subida, cola, arranque, revisión y duración total. [007](007-validacion-campo/spec.md) exige fijar también objetivos de costo por campaña y tiempo total antes de evaluar, sin inventar valores ya aceptados. Las metas de exactitud, cobertura y muestra permanecen vigentes.

## Aplicación en spec-kit

Este documento alimenta los futuros `plan.md`, especialmente 002, 004, 006 y 007. Las siete `spec.md` conservan requisitos de usuario verificables y no fijan marcas de nube. No se ejecutó la CLI de spec-kit ni se crearon planes, tareas, infraestructura o código de producto durante esta revisión.
