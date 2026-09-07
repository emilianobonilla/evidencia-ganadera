# Spec 001: capturar una campaña de conteo

**Feature:** `001-captura-campana` · **Creada:** 2026-09-06 · **Versión:** 0.2.0 · **Estado:** borrador.
**Entrada:** contar ganado con el DJI Mini 4K disponible.
**Dependencias:** ninguna. Aplican la [constitución](../../.specify/memory/constitution.md) y el [contexto común](../contexto-mini-4k.md).

## Objetivo y alcance

Permitir que un operador capture el corral o grupo reunido completo en una misma imagen y registre si cada individuo resulta distinguible. Incluye protocolo y registro de campaña; la aplicación no pilota el dron. El escenario fue confirmado por el usuario el 2026-09-06; el recorrido de varios sectores queda para la extensión P2.

## Historias de usuario y pruebas

### US1 — Preparar y ejecutar una captura reproducible (P1)

Como operador, quiero delimitar el corral o grupo, obtener un encuadre completo y registrar el vuelo para repetir la captura y evaluar su cobertura.

**Motivo de prioridad:** sin una captura interpretable no se puede evaluar el conteo.
**Prueba independiente:** completar un registro y capturar el grupo; otra persona identifica sus límites, la imagen de referencia y los originales sin explicación oral del piloto.

**Escenarios de aceptación:**

1. **Dado** un corral o grupo con límites conocidos, **cuando** preparo la campaña, **entonces** quedan registrados objetivo, límites, fecha/hora con zona horaria, operador, configuración y procedimiento de referencia física.
2. **Dado** un grupo que cabe en el encuadre, **cuando** termino, **entonces** queda una imagen candidata que lo abarca completo y un registro separado de visibilidad individual; encuadrar el corral no basta para declarar cobertura completa.

### US2 — Reconocer oclusiones y repetir una captura insuficiente (P1)

Como operador, quiero reconocer si hay animales fuera de cuadro u ocultos para repetir la captura o emitir un resultado parcial.

**Motivo de prioridad:** un grupo reunido puede entrar en cuadro y aun así ocultar individuos.
**Prueba independiente:** usar una captura con bordes cortados y otra con animales superpuestos; registrar el problema y una repetición sin acumular sus conteos.

**Escenarios de aceptación:**

1. **Dado** un grupo parcialmente fuera de cuadro o una captura interrumpida, **cuando** repito, **entonces** ambas capturas quedan registradas y se elige una imagen suficiente sin sumar observaciones de instantes distintos.
2. **Dado** ganado oculto bajo una estructura o detrás de otros individuos, **cuando** cierro la captura sin resolverlo, **entonces** el grupo conserva cobertura incompleta o desconocida y un motivo.

## Requisitos funcionales

- **FR-001:** el procedimiento DEBE registrar identificador de campaña, corral/grupo objetivo, límites, ventana temporal y responsable. En P1 el grupo completo se representa como un solo sector.
- **FR-002:** el operador DEBE poder preparar el protocolo y completar el registro sin conexión durante la jornada, una vez preparado el equipo.
- **FR-003:** el protocolo DEBE usar captura manual y originales compatibles con el [contexto común](../contexto-mini-4k.md), incluyendo una muestra de calibración de nitidez y tamaño visible del animal.
- **FR-004:** el grupo DEBE vincularse a archivos/intervalos y a cobertura completa, incompleta o desconocida, con motivo para las dos últimas. Registrar por separado encuadre completo e individuos distinguibles en la imagen de referencia.
- **FR-005:** el registro DEBE incluir cortes, giros, repeticiones, cambios de batería, movimientos de entrada/salida y áreas o individuos ocultos observados por el operador. No agregar automáticamente conteos de distintas capturas.
- **FR-006:** el protocolo DEBE definir antes del vuelo la ventana de referencia independiente, quién la registra y cómo controlar o documentar entradas y salidas del lote.
- **FR-007:** el procedimiento DEBE registrar configuración ensayada, condiciones de luz y viento, duración y batería inicial/final; las reglas operativas se acuerdan con el piloto antes de capturar.
- **FR-008:** DEBE buscar una vista aproximadamente cenital del grupo completo, con margen en los bordes e individuos distinguibles. Si no se logra sin dejar animales ocultos o demasiado pequeños, marcar captura insuficiente y proponer recaptura; dividir la captura en varios instantes pertenece a P2.
- **FR-009:** para grupos reunidos sin cerco, DEBE documentar el límite del grupo y cómo se verifica que no queden integrantes fuera; una agrupación visible dentro del encuadre no equivale a todo el lote por defecto.

## Entidades principales

- **Campaña:** objetivo, lote, tiempo, operador, protocolo y vuelos asociados.
- **Sector:** límites reconocibles, evidencia, cobertura y excepciones.
- **Vuelo:** configuración, intervalos, batería e incidencias; varios vuelos pueden pertenecer a una campaña.

## Casos límite

Corral vacío; techo o comedero que oculta animales; cuerpos superpuestos; ternero junto a su madre; portón abierto; grupo sin cerco que se dispersa; animal cortado por el encuadre; batería agotada; captura repetida; falta de microSD/originales; horario incorrecto. Un corral vacío necesita evidencia de observación, no solo ausencia de archivos.

## Criterios de éxito

- **SC-001:** en tres capturas exploratorias, cada grupo objetivo tiene una imagen candidata y cobertura registrada, o un motivo explícito de captura insuficiente.
- **SC-002:** un segundo operador puede identificar el grupo, la imagen de referencia y todos los archivos utilizados usando solamente el registro.
- **SC-003:** una interrupción y una repetición deliberadas quedan registradas y nunca producen cobertura completa por omisión.

## Supuestos y decisiones por aclarar

El usuario confirmó corral o grupo reunido. Se proponen luz diurna y 20–100 bovinos como rango exploratorio; quedan por confirmar dimensiones, densidad, barreras, estructuras que oculten animales, baterías y método de referencia física. Altura, velocidad y exposición se elegirán con la muestra de calibración para equilibrar encuadre del grupo y visibilidad individual.
