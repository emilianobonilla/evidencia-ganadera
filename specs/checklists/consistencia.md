# Revisión de consistencia del conjunto de specs

**Fecha:** 2026-09-07 · **Versión revisada:** 0.3.0 · **Alcance:** documentación. No es el resultado de ejecutar `speckit.analyze`, ni una validación del POC.

## Trazabilidad del recorrido completo

| Necesidad del usuario | Spec y requisitos principales | Evidencia futura de aceptación |
|---|---|---|
| Usar el Mini 4K disponible | 001 FR-002/003; contexto común | Captura manual y registro real de campaña |
| Saber qué se observó | 001 FR-004/005/008/009; 006 FR-004 | Grupo, encuadre completo y visibilidad individual identificados |
| Procesar con energía e internet garantizados | 002 FR-007/008; 004 FR-005; 007 FR-009/010 | Carga íntegra y reanudable, trabajo remoto, acceso privado y métricas de tiempo/costo |
| Evaluar con una referencia independiente | 003 FR-003–006 | Conteos ciegos, particiones y referencias reconciliadas |
| Detectar bovinos visibles | 004 FR-001–003; SC-001 | Marcas y precisión/exhaustividad en imágenes retenidas |
| Contar en un solo instante | 002 FR-009; 004 FR-003; 006 FR-009 | Imagen seleccionada sin mirar conteos y marcas sin duplicar |
| No duplicar animales entre imágenes (P2) | 005 FR-001–007 | Evaluación separada de correspondencias y discontinuidades |
| Corregir y conservar el resultado automático | 006 FR-002/003/008 | Historial reversible y versiones separadas |
| Exportar un resultado verificable | 006 FR-004–007 | Paquete portable con originales, marcas y limitaciones |
| Decidir si el POC sirve | 007 FR-001–008; SC-001–007 | Informe con error, aceptación, esfuerzo y decisión |

## Revisión documental realizada

- [x] CHK001 Las siete features tienen historias priorizadas, aceptación, requisitos, entidades, casos límite, métricas y supuestos.
- [x] CHK002 El recorrido principal 001–004 → 006 → 007 es completo por imagen; 005 y sus integraciones quedan como extensión P2 sin bloquearlo.
- [x] CHK003 Las metas compartidas se definen en 007; 004 mantiene la misma definición de precisión/exhaustividad y tiempo de preparación/detección.
- [x] CHK004 El tamaño mínimo distingue campañas retenidas de campañas aceptadas y conserva intentos fallidos en el denominador.
- [x] CHK005 Todas las referencias a cierre de un total exigen cobertura y correspondencias resueltas; revisar manualmente no convierte un parcial en total.
- [x] CHK006 SDK, archivos y capacidades del dron tienen fuentes primarias; altura, modelo, rendimiento y exactitud son decisiones o metas propuestas.
- [x] CHK007 La especificación no supone identidad SNIG, GPS por fotograma, autenticidad garantizada por hash ni precisión ya demostrada.
- [x] CHK008 Los documentos contienen especificaciones, principios y una recomendación de arquitectura; no se afirma que haya código, CLI instalada, planes o tareas generadas.
- [x] CHK009 La aclaración del usuario fija corral/grupo reunido; no quedan decisiones abiertas sobre ese escenario ni dependencias obligatorias de seguimiento para P1.
- [x] CHK010 Encuadre completo no equivale a individuos distinguibles; selección de imagen, oclusiones y uso de vistas de contexto tienen reglas explícitas.

- [x] CHK011 Electricidad e internet están confirmados; se retiraron las exigencias de proceso local, operación sin conexión y ausencia de cuentas. La exportación portable sigue siendo un requisito distinto.
- [x] CHK012 Tiempos de subida/cola/arranque y costos complementan la evaluación, sin modificar las metas de exactitud.

## Decisiones todavía abiertas

El escenario corral/grupo reunido quedó confirmado por el usuario. Restan tamaño y densidad del grupo, dimensiones y estructuras, entorno de nube, cliente, presupuesto y tiempo total, método físico de referencia y calendario máximo de prueba. Los checklists revisan la claridad del borrador y no representan aprobación de estos supuestos restantes.

## Comprobaciones de implementación futuras

Cuando existan `plan.md` y `tasks.md`, revisar su cobertura de los FR y SC de cada feature mediante el flujo de spec-kit. Ejecutar después las pruebas funcionales indicadas y las campañas de 007. Ninguna casilla marcada arriba representa una de esas pruebas ejecutada.
