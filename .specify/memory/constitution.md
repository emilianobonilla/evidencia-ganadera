# Constitución del POC de conteo bovino con DJI Mini 4K

**Versión:** 0.2.0 · **Creada / actualizada:** 2026-09-06
**Estado:** propuesta inicial para el POC; pendiente de validación operativa.
**Alcance:** las especificaciones en `specs/` y su futura implementación. Se mantienen las reglas de investigación y publicación de `AGENTS.md`.

## I. Diseñar para el equipo disponible

La captura debe poder realizarse con el DJI Mini 4K del usuario, mediante vuelo manual y archivos originales. Ningún requisito esencial dependerá de controlar el dron desde nuestra aplicación. Las capacidades del fabricante y las decisiones del POC se documentarán por separado en el [contexto](../../specs/contexto-mini-4k.md).

## II. Contar con un alcance explícito

El escenario confirmado es corral o grupo reunido. Todo resultado debe identificar lugar declarado, ventana de captura, área observada y estado de cobertura. El POC principal cuenta sobre una sola imagen de referencia que abarque el grupo y permita distinguir sus integrantes; comprobar el encuadre no sustituye comprobar la visibilidad. La agregación entre imágenes es una extensión opcional que debe resolver correspondencias antes de sumar. La incertidumbre debe producir un resultado parcial o pendiente, nunca un cero implícito.

## III. Conservar evidencia y correcciones

El resultado debe permitir volver al archivo y al instante o imagen de origen. Los originales y las predicciones automáticas se conservarán separados de las correcciones humanas. Un hash acredita integridad desde la importación; por sí solo no acredita fecha, ubicación ni autenticidad de captura.

## IV. Evaluar contra una referencia independiente

Las metas se fijarán antes de abrir el conjunto de prueba. Se separarán campañas de desarrollo, validación y prueba; fotogramas cercanos no se repartirán entre particiones. Se reportarán error automático, error revisado, cobertura, rechazos y tiempo humano por separado. La referencia no se construirá mirando las predicciones que luego se evalúan.

## V. Mantener un POC acotado y usable sin conexión

Un operador debe poder importar, procesar, revisar y exportar localmente después de la preparación inicial del entorno. La experiencia estará en español. Pesaje, identidad SNIG, lectura de caravanas, vuelos autónomos y certificación de existencias quedan fuera del POC.

## VI. Especificar resultados antes de elegir herramientas

Cada feature tendrá historias priorizadas, prueba independiente, escenarios de aceptación, requisitos verificables, entidades, casos límite y criterios de éxito. Las decisiones de arquitectura, modelos y dependencias corresponden a `plan.md`; las tareas de implementación se derivan después del plan.

## Gobernanza

Los planes deben comprobar estos seis principios antes de implementarse. Los cambios de alcance o de métricas actualizarán las specs afectadas y su fecha/versión antes de una nueva evaluación. Cambiar una meta después de observar la prueba requiere otro conjunto de prueba y debe constar en el informe. Esta versión documenta principios propuestos, no aprobación de un piloto ni resultados de campo.
