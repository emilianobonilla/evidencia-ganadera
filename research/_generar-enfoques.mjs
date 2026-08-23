import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

function head(title, description) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${description}"><title>${title}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="styles.css"></head><body>`;
}

function nav(active) {
  const links = [
    ["fondos", "fondos.html", "Fondos"],
    ["feedlot", "feedlot.html", "Feedlot"],
    ["mercado", "mercado.html", "Mercado"],
    ["analisis", "analisis.html", "Análisis"],
    ["tecnologia", "tecnologia.html", "Tecnología"],
    ["supuestos", "supuestos.html", "Supuestos"],
    ["preguntas", "preguntas.html", "Preguntas"],
  ];
  return `<header class="topbar"><div class="topbar__inner"><a class="brand" href="index.html"><span class="brand__mark">UY</span><span class="brand__text">Ganadería aumentada</span></a><nav class="nav" aria-label="Documentos">${links.map(([id, href, label]) => `<a href="${href}"${id === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav></div></header>`;
}

const footer = `<footer class="footer">Dossier vivo · versión 0.6 · corte 23 ago 2026 · dos vías separadas: <a href="fondos.html">fondos ganaderos</a> y <a href="feedlot.html">feedlot</a> · las afirmaciones comerciales no equivalen a validación independiente.</footer>`;

function table(headers, rows) {
  return `<div class="table-wrap"><table class="market-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<td><strong>${c}</strong></td>` : `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function bullets(items) {
  return `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

// Bloque compartido: qué es común a las dos vías y qué diverge.
function frontera(from) {
  const other = from === "fondos"
    ? `<a href="feedlot.html">la vía de feedlot</a>`
    : `<a href="fondos.html">la vía de fondos</a>`;
  return `<section class="section" id="frontera"><p class="eyebrow">Qué se comparte y qué no</p><h2>Frontera con ${other}</h2><p class="section-intro">Separar los enfoques no significa duplicar el producto. Lo que se comparte es el núcleo técnico; lo que diverge es casi todo lo comercial.</p><div class="grid grid--2"><div class="card card--strong"><h3>Compartido</h3>${bullets([
    "Contrato de evento, identificadores, manifiesto canónico y firma del dispositivo.",
    "Lector RFID compatible con HDX y FDX‑B, y el pipeline de visión.",
    "Plataforma, sincronización offline, revisión de excepciones y exportación.",
    "El principio de que peso medido y peso estimado nunca se mezclan en el mismo campo.",
  ])}</div><div class="card card--warm"><h3>Divergente</h3>${bullets([
    "Comprador, presupuesto de origen y ciclo de decisión.",
    "Estándar de prueba: precisión en feedlot, no duplicación y procedencia en fondos.",
    "Unidad de cobro y techo de precio.",
    "Hardware: corredor fijo contra estructura transportable y sellada.",
    "Exigencia de independencia: sólo la vía de fondos la impone.",
  ])}</div></div><div class="callout"><strong>Regla de decisión:</strong> si una función sirve a las dos vías, va al núcleo compartido. Si sirve a una sola, va a su vía y se financia con el ingreso de esa vía. Ninguna de las dos paga el roadmap de la otra sin decirlo.</div></section>`;
}

function fondosPage() {
  return `${head("Vía 1 · Fondos ganaderos · Ganadería aumentada", "Enfoque separado para fondos y fideicomisos ganaderos: cliente, estándar de evidencia, competencia, precio y tecnología tras el colapso de Conexión Ganadera.")}${nav("fondos")}
  <main>
    <section class="hero"><div><p class="eyebrow">Vía 1 · Fondos y fideicomisos ganaderos</p><h1>Probar que el ganado existe.</h1><p class="lede">La vía que ataca un problema cuyo precio el mercado uruguayo ya pagó: existencias declaradas que no estaban. Tiene comprador, estándar de prueba, competencia, precio y tecnología propios, distintos de los del feedlot, y por eso se documenta por separado.</p></div><aside class="meta-card"><dl><dt>Prioridad</dt><dd>Vía principal</dd><dt>Comprador</dt><dd>Quien absorbe la pérdida</dd><dt>Unidad de cobro</dt><dd>Informe + cabeza observada</dd><dt>Configuración</dt><dd>Transportable y sellada</dd><dt>Corte</dt><dd>23 ago 2026</dd></dl></aside></section>
    <div class="layout"><aside class="toc"><strong>En esta vía</strong><a href="#posicion">Por qué va primero</a><a href="#cliente">Cliente y quién paga</a><a href="#evidencia">Estándar de evidencia</a><a href="#competencia">Competencia</a><a href="#comercial">Modelo y precio</a><a href="#tecnologia">Tecnología y peso</a><a href="#frontera">Frontera con feedlot</a><a href="#pruebas">Qué probar</a></aside><article class="content">

      <section class="section" id="posicion"><p class="eyebrow">Prioridad</p><h2>Por qué esta vía va primero</h2>
        <div class="callout callout--warning"><strong>Prioridad declarada:</strong> ésta es la apuesta comercial principal del proyecto, registrada en <a href="supuestos.html#s21">S21</a>. El feedlot conserva un rol propio y necesario —ingreso recurrente y banco de pruebas—, descrito en <a href="feedlot.html">su documento</a>.</div>
        <div class="grid grid--2">
          <div class="card card--strong"><h3>Por qué ahora</h3><p>El BCU advirtió desde 2022 sobre estos esquemas y en 2025 redactó cambios para ampliar la supervisión sobre la captación masiva de recursos. Hay concursos abiertos, síndicos, fiscalías y unas 7.000 personas afectadas buscando cómo verificar existencias. El estándar probatorio se está escribiendo en este momento.</p></div>
          <div class="card card--warm"><h3>Por qué no esperar al piloto</h3><p>El banco de pruebas técnico no necesita preceder a la conversación comercial. Entrevistar a fiduciarios, bancos y al regulador no consume hardware ni piloto: consume agenda. Postergarlo sólo garantiza llegar cuando el estándar ya esté fijado por otro.</p></div>
          <div class="card card--risk"><h3>El riesgo de esta apuesta</h3><p>El colapso creó la necesidad y al mismo tiempo destruyó parte de la clientela: capital que huyó, fondos que dejaron de operar. La primera medición de esta vía no es técnica sino de mercado —cuántos fideicomisos ganaderos siguen vivos y con cuántas cabezas—, y puede devolver un número demasiado chico.</p></div>
          <div class="card"><h3>Lo que todavía no está probado</h3><p><a href="supuestos-mercado.html#m04">M04</a> sigue abierto en su parte decisiva. El fraude es evidencia de <em>problema</em>, no de <em>disposición a pagar</em>. Nadie ha confirmado aún quién firma la orden de compra del informe ni por cuánto.</p></div>
        </div>
      </section>

      <section class="section" id="cliente"><p class="eyebrow">Cliente</p><h2>El que paga no es el auditado</h2><p class="section-intro">Ésta es la diferencia estructural con el feedlot, donde el que usa el dato y el que lo paga son la misma persona. Acá el comprador es quien absorbe la pérdida si el ganado no está.</p>
        ${table(["Comprador", "De qué presupuesto sale", "Qué compra exactamente", "Ciclo", "Señal de que es real"], [
          ["Fiduciario o administradora de fideicomisos ganaderos", "Costo de administración, trasladable al inversor", "Certificación periódica de existencias que le permita seguir colocando", "Trimestral, atado al calendario de reporte", "Que hoy no pueda responder “cuántos animales hay y dónde” sin llamar al productor"],
          ["Banco o financiador con prenda ganadera", "Riesgo crediticio y provisiones", "Verificación de que la garantía existe, es esa y está donde se declaró", "Al alta del crédito y luego revisiones", "Que el aforo de la prenda mejore o baje la provisión con el informe en la mano"],
          ["Síndico, liquidador o fiscalía en los concursos abiertos", "Masa del concurso", "Inventario forense puntual con valor probatorio", "Una vez, con urgencia", "Que ya se estén pagando peritos y visitas para hacer lo mismo a mano"],
          ["Estudio contable o auditor que firma la opinión", "Honorario de auditoría", "El instrumento y el paquete de evidencia, no la opinión", "Anual, con el cierre", "Que no tenga procedimiento propio de existencia física más allá del extracto SNIG y la vista ocular"],
          ["Aseguradora de ganado", "Suscripción y siniestralidad", "Verificación al alta de la póliza y al siniestro", "Por póliza", "Que hoy suscriba sobre declaración del asegurado"],
          ["Inversor damnificado organizado", "Bolsillo propio", "No compra: presiona a los que sí compran", "—", "Útil como fuerza de demanda y como fuente de casos; no tratarlo como cliente"],
          ["BCU y MGAP", "No compra", "Fijan el estándar que crea o cancela el mercado", "Normativa en redacción", 'Ver <a href="#competencia">competencia institucional</a>'],
        ])}
        <div class="callout callout--warning"><strong>Restricción de independencia:</strong> vender simultáneamente software de gestión al fondo y verificación de existencias a su banco destruye el producto. La vía de fondos exige separación de roles —y probablemente de razón social— que la vía de feedlot no exige. Ver <a href="supuestos-mercado.html#m12">M12</a>.</div>
      </section>

      <section class="section" id="evidencia"><p class="eyebrow">Estándar de prueba</p><h2>Existencia y no duplicación, antes que kilos</h2>
        <div class="grid grid--2"><div class="card card--strong"><h3>Lo que debe probar</h3>${bullets([
          "Que cada animal existe y fue contado <strong>una sola vez</strong>.",
          "Que es <strong>ese</strong> animal: caravana SNIG individual leída en el mismo evento que la imagen.",
          "Que estaba en ese lugar y en esa fecha, con procedencia anclada al aparato.",
          "Qué proporción del rodeo declarado se observó, y con qué método.",
        ])}</div><div class="card card--warm"><h3>Lo que no necesita probar</h3>${bullets([
          "Exactitud de peso al kilo. Acá el peso sirve para valuar y para detectar incoherencias, no para dosificar ni para vender.",
          "Frecuencia alta. Un informe es un corte, no un monitoreo.",
          "Integración con el sistema de gestión del auditado —que además es parte interesada.",
        ])}</div></div>
        ${table(["Requisito propio de esta vía", "Por qué", "Qué lo hace fallar"], [
          ["No duplicación demostrable", "El fraude barato es mostrar el mismo lote dos veces, o prendar el mismo animal en dos contratos", "Animales sin caravana legible; sesiones que no se reconcilian entre sí; ausencia de comparación entre informes de fondos distintos"],
          ["Identidad individual, no sólo conteo", "“28.000 contratados contra nueve hallados” se detecta contando; “500 animales repartidos en cinco contratos” sólo se detecta identificando", "Un censo aéreo sin RFID resuelve el primer caso y es ciego al segundo"],
          ["Vínculo animal ↔ contrato", "El SNIG registra tenedor, no beneficiario económico. Éste es el hueco real y es institucional antes que técnico", "Que ese registro viva únicamente en planillas del fondo"],
          ["Fecha y lugar resistentes a repetición", "Un informe que pueda rehacerse con imágenes viejas no vale nada frente a un tercero", "GPS solo, hash aislado o reloj del operador"],
          ["Cobertura declarada: censo o muestra con margen", "El auditor debe poder decir qué vio y qué no", "Reportar un promedio sin denominador"],
          ["Cadena de custodia del operador", "El paquete debe decir quién operó, con qué equipo sellado y qué se verificó antes y después", "Que el flujo lo ejecute personal del propio fondo"],
          ["Re-derivación por un tercero", "Otro auditor debe poder reconstruir el resultado desde los originales conservados", "Guardar sólo resultados y no los archivos originales"],
        ])}
        <div class="callout"><strong>Consecuencia contraintuitiva:</strong> en esta vía una <em>estimación</em> visual conservada junto a su imagen original es más auditable que una <em>medición</em> de balanza. El número de la balanza no puede re-verificarse después; el frame sí. La balanza sigue ganando donde hay efecto legal —liquidación, dosificación—, y por eso el evento nunca mezcla método, según la decisión rectora 4 de <a href="tecnologia.html">Tecnología</a>.</div>
      </section>

      <section class="section" id="competencia"><p class="eyebrow">Competencia</p><h2>La mitad del mapa no compite acá</h2><p class="section-intro">Optiweigh, Vytelle, Tru‑Test, Cattler o Baqueano son rivales serios en el corral y casi irrelevantes en un informe de existencias. Los pesos relativos cambian tanto que justifican leer el <a href="mercado.html">mapa competitivo</a> dos veces, una por vía.</p>
        <div class="grid grid--2">
          <div class="card card--risk"><h3>El competidor institucional va primero</h3><p>Si la nueva supervisión del BCU se conforma con declaración jurada más extracto SNIG, este mercado no existe. Si exige verificación física por un tercero independiente, el mercado se crea de un plumazo. Llegar a esa conversación vale más que cualquier funcionalidad: es <a href="preguntas-mercado.html#mq25">MQ25</a>.</p></div>
          <div class="card card--warm"><h3>El statu quo</h3><p>Escribano o contador que va y mira, más el extracto SNIG. Barato, aceptado y exactamente lo que falló. Competir contra “gratis y aceptado” exige que alguien —regulador, banco o inversor— empiece a exigir más.</p></div>
        </div>
        ${table(["Ítem del mapa", "Amenaza en esta vía", "Por qué"], [
          ['<a href="items/ganaderia.html">GanaderIA</a>', "Alta — la más alta de la vía", "Un censo aéreo por lote resuelve “¿hay 28.000 o hay nueve?” más rápido y más barato que cualquier paso individual, y ValidAgro le midió 100% y 99,7% de conteo. Su debilidad es identidad individual y cadena de custodia, no cobertura. En feedlot es un competidor lateral; acá es frontal, y por eso mismo es el mejor candidato a alianza."],
          ['<a href="items/olho-do-dono.html">Olho do Dono</a>', "Alta", "Es el único que ya declara auditoría como caso de uso, con conteo, RFID, GPS y operación sin internet. La diferenciación tiene que ser demostrable, no narrativa."],
          ['<a href="items/cattleproof.html">CattleProof</a>', "Alta como modelo, media como producto", "Muestra que lo vendible es un <em>programa verificado por un tercero</em> —su aprobación PVP del USDA— y no un aparato. Es la plantilla del negocio antes que un rival local."],
          ['<a href="items/ceres-tag.html">Ceres Tag</a> y <a href="items/moovement.html">mOOvement</a>', "Media y creciente", "Si un fondo caravanea su rodeo con GPS satelital, “el ganado está donde se declaró” pasa a ser una suscripción y la visita periódica se adelgaza. Es sustitución estructural, no competencia frontal."],
          ['<a href="items/breedr.html">Breedr</a>', "Media", "Historia productiva más comercio y financiación: la ruta de “registro confiable para prestar”, que es la misma promesa por otro camino."],
          ['<a href="items/optiweigh.html">Optiweigh</a>, <a href="items/vytelle-sense.html">Vytelle</a>, <a href="items/tru-test-wow.html">Tru‑Test WOW</a>', "Baja", "Resuelven tendencia de peso en producción. No dicen nada sobre existencia, unicidad ni procedencia."],
          ['<a href="items/cattler.html">Cattler</a>, <a href="items/baqueano.html">Baqueano</a>, <a href="items/pgg.html">PGG</a>, <a href="items/agriwebb.html">AgriWebb</a>, <a href="items/finca.html">Finca</a>', "Nula como rival, alta como conflicto", "Son el sistema del auditado. Sus datos no reemplazan una verificación independiente, y venderles a ellos compromete la independencia que esta vía necesita."],
        ])}
      </section>

      <section class="section" id="comercial"><p class="eyebrow">Modelo comercial</p><h2>No es una suscripción por cabeza</h2><p class="section-intro">El costo está dominado por la movilización y por la responsabilidad asumida, no por el animal marginal. Eso cambia la unidad de cobro y el techo de precio.</p>
        ${table(["Formato", "Unidad de cobro", "Cuándo", "Nota"], [
          ["Inventario forense puntual", "Por movilización más por cabeza observada, con mínimo", "Concursos abiertos y denuncias", "Precio más alto y repetición baja, pero construye la referencia que habilita todo lo demás. Es la puerta de entrada."],
          ["Certificación periódica de existencias", "Abono por fideicomiso más por cabeza, atado al calendario de reporte", "Trimestral o semestral", "Es el ingreso recurrente real de la vía. Depende de que exista una exigencia —regulatoria o contractual— que lo obligue."],
          ["Verificación de garantía", "Por operación al alta, más revisiones", "Alta de crédito y seguimiento", "El banco tiene presupuesto de riesgo, no de insumos: otra conversación, otro precio, otro ciclo."],
          ["Instrumento para el auditor", "Licencia más honorario por informe emitido", "Continuo", "No firmamos la opinión: la firma el auditor. Baja la exposición profesional, preserva la independencia y escala mejor que operar cada visita."],
        ])}
        <div class="callout callout--warning"><strong>Contra qué anclar el precio:</strong> contra el honorario de auditoría y contra el costo de capital, no contra los US$272 millones perdidos. La pérdida prueba el problema; no es el presupuesto de nadie. Un informe se paga con una fracción del costo de verificar, no con una fracción del fraude evitado.</div>
        <div class="grid grid--2"><div class="card"><h3>La responsabilidad es un insumo de precio</h3><p>Un informe de existencias tiene exposición profesional que un panel de feedlot no tiene. Seguro, límites contractuales de uso y una definición explícita de qué afirma y qué no el paquete entran en el costo antes de fijar la tarifa.</p></div><div class="card"><h3>Efecto de red por el lado de la plataforma</h3><p>La alerta más valiosa que este producto puede emitir —la misma caravana apareciendo en el inventario de dos fondos distintos— sólo existe si varios fondos usan la misma plataforma. Es un argumento de precio y de secuencia de clientes, no sólo de arquitectura.</p></div></div>
      </section>

      <section class="section" id="tecnologia"><p class="eyebrow">Tecnología</p><h2>Transportable, sellada y re-derivable</h2><p class="section-intro">Corresponde a la “segunda configuración” de <a href="tecnologia.html">Tecnología</a>, pero deja de ser la variante tardía y pasa a ser la que se diseña primero.</p>
        <div class="grid grid--2"><div class="card card--strong"><h3>A usar e integrar</h3>${bullets([
          "Lector EID portátil compatible con ISO 11784/11785 en HDX y FDX‑B, con antena de paso armable.",
          "Cámara RGB de obturador global más profundidad ToF o estéreo sobre estructura plegable.",
          "GNSS, reloj en tiempo real y elemento seguro TPM 2.0 para firmar el manifiesto.",
          "Baterías, gabinete transportable y sellos físicos verificables.",
          "Dron propio o de tercero para el censo de cobertura previo al paso individual.",
          "Sin plataforma de pesaje en la configuración base.",
        ])}</div><div class="card card--warm"><h3>A desarrollar</h3>${bullets([
          "Reconciliación de no duplicación dentro de la sesión y entre sesiones.",
          "Comparación entre informes: detectar la misma caravana en dos inventarios distintos.",
          "Paquete probatorio firmado, con originales conservados y re-derivación determinística.",
          "Verificación previa y posterior del equipo, con sellos e inventario del conjunto.",
          "Detección de repetición de evento, salto de reloj y GNSS simulado.",
          "Informe con cobertura, descartes, incertidumbre y límites explícitos de uso del dato.",
        ])}</div></div>
        <h3>Estimación de peso en esta vía</h3>
        ${table(["Decisión", "Elección para fondos", "Fundamento"], [
          ["Método primario", "Estimación visual RGB más profundidad sobre el paso armable", "No hay plataforma que transportar ni cadena de calibración que sostener en campo, y el original queda conservado y re-procesable."],
          ["Balanza", "Opcional, sólo si el informe tiene efecto de liquidación", "Es patrón trazable, pero su número no puede re-verificarse después. Nunca se mezcla con la estimación en el mismo campo."],
          ["Tolerancia de error", "Mayor que en feedlot: alcanza con sesgo agregado declarado y acotado", "El uso es valuación y coherencia del rodeo declarado, no dosificación ni venta por kilo."],
          ["Requisito duro", "Reproducibilidad: versión de modelo, calibración e imágenes originales viajan con el evento", "Un tercero debe poder llegar al mismo número. Es la exigencia que el feedlot no impone."],
          ["Dato faltante", "Verdad de referencia por raza y categoría uruguayas", 'Y ese conjunto de datos sólo se genera con balanza sincronizada, es decir <a href="feedlot.html">en el feedlot</a>. Es la razón técnica por la que la vía 2 no se abandona.'],
        ])}
      </section>

      ${frontera("fondos")}

      <section class="section" id="pruebas"><p class="eyebrow">Próximo paso</p><h2>Qué probar y qué invalidaría la vía</h2>
        <div class="grid grid--2"><div class="card card--strong"><h3>Probar ahora</h3>${bullets([
          'Qué verificación de existencias exigirá la nueva supervisión del BCU y quién deberá firmarla — <a href="preguntas-mercado.html#mq25">MQ25</a>.',
          'Qué campos y controles mínimos vuelven aceptable un informe ante un financiador — <a href="preguntas-mercado.html#mq03">MQ03</a>.',
          'Qué control habría detectado el faltante y en qué momento del ciclo — <a href="preguntas-mercado.html#mq26">MQ26</a>.',
          "Cuántos fideicomisos ganaderos siguen operando en Uruguay y con cuántas cabezas: el tamaño del mercado después del colapso.",
          "Un inventario forense piloto en un concurso abierto, aunque sea a pérdida, para producir la primera referencia.",
        ])}</div><div class="card card--risk"><h3>Qué la invalidaría</h3>${bullets([
          "Que la normativa se conforme con declaración jurada más extracto SNIG.",
          "Que los auditores no acepten delegar el procedimiento de existencia en un instrumento de un tercero.",
          "Que el mercado de fondos haya quedado por debajo del tamaño que justifica un producto dedicado.",
          "Que un censo con dron más extracto SNIG se considere suficiente y nadie pague por identidad individual.",
        ])}</div></div>
        <p>Seguir por el <a href="mercado.html">mapa competitivo</a>, revisar los <a href="supuestos-mercado.html">supuestos de mercado</a> o pasar a <a href="feedlot.html">la vía de feedlot</a>.</p>
      </section>

    </article></div>
  </main>${footer}</body></html>`;
}

function feedlotPage() {
  return `${head("Vía 2 · Feedlot · Ganadería aumentada", "Enfoque separado para feedlot: ingreso recurrente y banco de pruebas donde se genera la verdad de referencia de peso que la vía de fondos necesita.")}${nav("feedlot")}
  <main>
    <section class="hero"><div><p class="eyebrow">Vía 2 · Feedlot</p><h1>Donde el sistema aprende a pesar.</h1><p class="lede">Cumple dos funciones concretas y defendibles: aporta el ingreso recurrente que sostiene la operación, y el único lugar donde se produce la verdad de referencia que vuelve creíble la estimación de peso de <a href="fondos.html">la vía de fondos</a>.</p></div><aside class="meta-card"><dl><dt>Prioridad</dt><dd>Vía de sostén</dd><dt>Comprador</dt><dd>Quien paga la comida</dd><dt>Unidad de cobro</dt><dd>Cabeza bajo monitoreo</dd><dt>Configuración</dt><dd>Corredor fijo o semipermanente</dd><dt>Corte</dt><dd>23 ago 2026</dd></dl></aside></section>
    <div class="layout"><aside class="toc"><strong>En esta vía</strong><a href="#posicion">Qué rol cumple</a><a href="#cliente">Cliente y quién paga</a><a href="#evidencia">Estándar de evidencia</a><a href="#competencia">Competencia</a><a href="#comercial">Modelo y precio</a><a href="#tecnologia">Tecnología y peso</a><a href="#frontera">Frontera con fondos</a><a href="#pruebas">Qué probar</a></aside><article class="content">

      <section class="section" id="posicion"><p class="eyebrow">Rol</p><h2>Banco de pruebas con ingreso propio</h2>
        <div class="callout callout--warning"><strong>Rol declarado:</strong> según <a href="supuestos.html#s21">S21</a>, el feedlot no es donde se juega la diferenciación del producto sino donde se sostiene el negocio y se prueba la tecnología. Son dos funciones que ninguna otra parte del proyecto puede cumplir.</div>
        <div class="grid grid--2">
          <div class="card card--strong"><h3>El piloto técnico vive acá</h3><p>Es el piloto de <a href="tecnologia.html">Tecnología</a>: pasos 0 a 4 de la hoja de ruta —banco de integración, paso instrumentado, peso de referencia, edge offline y piloto continuo— ocurren acá. Es donde se descubre si el paso individual funciona con barro, caudal y personal real.</p></div>
          <div class="card card--warm"><h3>Lo que no hace</h3><p>No sostiene solo la tesis de valor. El descubrimiento de campo ocurre acá, pero la conversación comercial que define el producto ocurre con fiduciarios, bancos y el regulador.</p></div>
          <div class="card card--risk"><h3>Por qué es indispensable</h3><p>Sin un conjunto de datos de peso con balanza sincronizada por raza y categoría uruguayas, la estimación visual del informe de auditoría no resiste la primera pregunta de un tercero. El feedlot es la fábrica de esa evidencia, y además la paga.</p></div>
          <div class="card"><h3>La incomodidad honesta</h3><p><a href="supuestos-mercado.html#m01">M01</a> sigue en pie: Optiweigh sola vuelve no diferenciable “tendencia de peso sin arreo”. Esta vía compite en un mercado ocupado y maduro, y conviene entrar sabiéndolo.</p></div>
        </div>
      </section>

      <section class="section" id="cliente"><p class="eyebrow">Cliente</p><h2>El que usa el dato es el que lo paga</h2><p class="section-intro">La simetría opuesta a la de fondos. Eso acorta el ciclo de venta, baja el discurso a kilos y sube muchísimo la sensibilidad al precio.</p>
        ${table(["Comprador", "De qué presupuesto sale", "Qué compra exactamente", "Ciclo", "Señal de que es real"], [
          ["Gerente o dueño de feedlot propio", "Costo de alimentación y días de encierro", "Tendencia individual sin sumar encierro ni manejo", "Corto, por campaña de encierro", "Que hoy pese poco y tarde justamente por el costo de manejo"],
          ["Corral que engorda a fasón o por capitalización", "Contrato con el dueño del ganado", "Evidencia para su cliente, no sólo información para sí mismo", "Por contrato", "Es el puente con la otra vía: un fasón es un fondo ganadero en miniatura, con el mismo problema de confianza a menor escala"],
          ["Nutricionista o asesor técnico", "Honorario profesional", "Datos por categoría para ajustar dieta y aparte", "Continuo", "Influye en la decisión, rara vez firma la compra"],
          ["Frigorífico o integrador", "Costo de abastecimiento", "Previsibilidad de terminación y de fecha de faena", "Largo", "Que ya imponga condiciones de entrega y quiera anticiparlas"],
        ])}
        <div class="callout"><strong>No comparten equipo comercial:</strong> la vía de feedlot vende ahorro operativo a un comprador técnico en semanas; la de fondos vende defensa ante un tercero a un comprador financiero en meses. Usar el mismo discurso en ambas debilita las dos.</div>
      </section>

      <section class="section" id="evidencia"><p class="eyebrow">Estándar de prueba</p><h2>Precisión, cobertura y acción</h2>
        <div class="grid grid--2"><div class="card card--strong"><h3>Lo que debe probar</h3>${bullets([
          "Que el error de peso es aceptable <strong>por subgrupo</strong>, no en promedio.",
          "Qué proporción del lote observa y a quién deja afuera.",
          "Que la tendencia cambia una decisión antes de la balanza siguiente.",
          "Que la correspondencia RFID–imagen no contamina la historia individual.",
        ])}</div><div class="card card--warm"><h3>Lo que no necesita probar</h3>${bullets([
          "Resistencia a un adversario deliberado: acá no hay quien quiera engañar al sistema —salvo en el fasón.",
          "Cadena de custodia con sellos y verificación previa y posterior del equipo.",
          "Re-derivación del resultado por un auditor externo.",
        ])}</div></div>
        ${table(["Requisito propio de esta vía", "Por qué", "Cómo se mide"], [
          ["Error y sesgo por subgrupo", "Una precisión media esconde fallas por raza, barro, postura y rango de peso", "Error, sesgo y repetibilidad reportados por categoría, no un porcentaje único"],
          ["Cobertura y sesgo de muestreo", "El paso voluntario puede sesgar hacia los animales dominantes", "Porcentaje del lote observado por ventana y descripción de quién queda afuera. Optiweigh declara 20–50 animales por día y entre un tercio y dos tercios del lote tras 3–5 días: ése es el número a superar"],
          ["Ventana de agregación declarada", "Una lectura aislada de peso al paso puede fallar, según Dickinson et al.", "Regla de agregación explícita para cada decisión, no un dato crudo por animal"],
          ["Correspondencia RFID–imagen", "Un error de identidad contamina la historia individual", 'Pureza y tasa de aceptación reportadas por separado — <a href="supuestos-mercado.html#m03">M03</a>'],
          ["Accionabilidad", "Frecuencia sin decisión sólo crea datos", 'Decisiones reales registradas sobre dieta, aparte, venta y sanidad — <a href="supuestos-mercado.html#m08">M08</a>'],
          ["Procedencia", "Deseable pero no exigida, salvo cuando el ganado es de un tercero", "En operaciones a fasón el estándar sube al de la vía de fondos: es el mismo problema en escala chica"],
        ])}
      </section>

      <section class="section" id="competencia"><p class="eyebrow">Competencia</p><h2>Mercado ocupado y maduro</h2>
        ${table(["Ítem del mapa", "Amenaza en esta vía", "Por qué"], [
          ['<a href="items/optiweigh.html">Optiweigh</a>', "Alta — la referencia obligada", "Uruguay figura entre sus países de operación en dos páginas propias, declara más de 500.000 animales monitoreados por mes y la prensa sectorial reportó la unidad 1.000. Es la línea base contra la que se mide todo lo demás."],
          ['<a href="items/vytelle-sense.html">Vytelle SENSE</a>', "Alta", "Peso parcial continuo con RFID en el agua y validación revisada por pares. Ocupa exactamente la promesa de tendencia sin manejo."],
          ['<a href="items/tru-test-wow.html">Tru‑Test WOW</a>', "Alta", "Peso al paso con EID y nube, con representación de marca en Uruguay a través de Muñoz y Arquero. Soporte local ya resuelto."],
          ['<a href="items/olho-do-dono.html">Olho do Dono</a>', "Alta", "Cubre casi todo el concepto funcional, también en el corral."],
          ['<a href="items/baqueano.html">Baqueano</a>, <a href="items/terko-tk3516l.html">Terko</a>, <a href="items/pgg.html">PGG</a>', "Media, como statu quo real", "Manga, balanza y lector con soporte uruguayo es lo que hoy se compra. El sustituto no es no medir: es medir de a poco y a mano."],
          ['<a href="items/cattler.html">Cattler</a>, <a href="items/agriwebb.html">AgriWebb</a>, <a href="items/finca.html">Finca</a>', "Nula como rival, alta como canal", "Son el receptor natural del evento. Construir otro sistema de gestión sería una distracción."],
          ['<a href="items/ganaderia.html">GanaderIA</a>', "Media", "Resuelve lote e inventario periódico, no continuidad individual dentro del corral. En la vía de fondos, en cambio, es la amenaza principal."],
          ['<a href="items/cattleeye.html">CattleEye</a>', "Media y creciente", "Visión continua e identificación visual: si madura hacia carne, entra por arriba."],
        ])}
        <div class="callout callout--risk"><strong>Conclusión incómoda:</strong> el diferencial defendible de esta vía es delgado. Antes de fabricar toda la medición conviene evaluar en serio integrar o revender —Optiweigh o Datamars como sensor de peso dentro del evento— y quedarse con la capa de evidencia, que es donde el proyecto sí tiene algo propio.</div>
      </section>

      <section class="section" id="comercial"><p class="eyebrow">Modelo comercial</p><h2>Recurrente, por cabeza, contra un techo ya fijado</h2>
        ${table(["Formato", "Unidad de cobro", "Cuándo", "Nota"], [
          ["Suscripción de monitoreo", "Por cabeza bajo monitoreo y por mes", "Continuo", "Es el formato que el mercado ya entiende y el que da previsibilidad de ingreso."],
          ["Abono por corral o por encierro", "Por ciclo de encierro", "Por campaña", "Se ajusta mejor a la rotación real del feedlot que un abono mensual plano."],
          ["Hardware", "Capex o alquiler mensual", "Al inicio", "El alquiler baja la barrera de entrada y mantiene la flota bajo control del proveedor, a costa de capital de trabajo."],
          ["Servicio de campaña puntual", "Por visita", "Estacional", "Puerta de entrada barata y forma de medir interés sin instalar nada."],
        ])}
        <div class="callout callout--warning"><strong>Contra qué anclar el precio:</strong> contra el costo real de una pesada manual —mano de obra, desbaste, pérdida de performance y coordinación— y contra la oferta local de Optiweigh, que sigue sin responderse en <a href="preguntas-mercado.html#mq07">MQ07</a>. El techo de precio de esta vía lo fija un competidor instalado; el de la vía de fondos lo fija un honorario de auditoría. Son dos economías distintas y no conviene promediarlas en un mismo modelo financiero.</div>
      </section>

      <section class="section" id="tecnologia"><p class="eyebrow">Tecnología</p><h2>Corredor fijo, balanza presente, modelo en entrenamiento</h2><p class="section-intro">Corresponde a la “primera configuración” de <a href="tecnologia.html">Tecnología</a>. La diferencia clave con la vía de fondos es que acá hay energía, estructura y permanencia: la balanza es asequible y se convierte en verdad de referencia.</p>
        <div class="grid grid--2"><div class="card card--strong"><h3>A usar e integrar</h3>${bullets([
          "Corredor fijo o semipermanente en un paso natural de agua o alimento.",
          "Celdas de carga con indicador comercial y salida digital documentada.",
          "Cámara RGB de obturador global con iluminación protegida; profundidad como rama comparativa.",
          "Barreras de presencia para detectar entrada, dirección, dos animales y atasco.",
          "Lector EID de paso en HDX y FDX‑B.",
          "Energía de red o solar dimensionada y conectividad LTE con recuperación automática.",
        ])}</div><div class="card card--warm"><h3>A desarrollar</h3>${bullets([
          "Máquina de estados del paso y reglas de ocupación y descarte.",
          "Conjunto de datos sincronizado balanza ↔ imagen, con metadatos de raza, categoría, luz y barro.",
          "Calibración de incertidumbre del modelo visual contra el peso medido.",
          "Reglas de agregación y detección de excepciones por decisión.",
          "Panel de cobertura y sesgo: qué proporción del lote se vio y quién falta.",
        ])}</div></div>
        <h3>Estimación de peso en esta vía</h3>
        ${table(["Decisión", "Elección para feedlot", "Fundamento"], [
          ["Método primario", "Peso medido con celdas de carga, al paso o estabilizado", "Hay energía, estructura fija y ningún costo de transporte: la balanza es asequible acá y es patrón trazable."],
          ["Estimación visual", "Corre en paralelo y siempre contra la balanza", "Su objetivo en esta vía no es reemplazarla sino calibrarse contra ella."],
          ["Tolerancia de error", "La más exigente del proyecto", "Alimenta dosificación, aparte y venta por kilo: un sesgo por subgrupo tiene costo inmediato."],
          ["Frecuencia y agregación", "Regla declarada por decisión, no dato crudo", "Una lectura aislada de peso al paso puede fallar; el valor está en la ventana, no en el evento."],
          ["Lo que produce para la otra vía", "El único conjunto de datos etiquetado con verdad de referencia sincronizada en razas y categorías uruguayas", 'Sin él, la estimación visual del <a href="fondos.html">informe de auditoría</a> no resiste una pregunta de un tercero.'],
        ])}
      </section>

      ${frontera("feedlot")}

      <section class="section" id="pruebas"><p class="eyebrow">Próximo paso</p><h2>Qué probar y qué invalidaría la vía</h2>
        <div class="grid grid--2"><div class="card card--strong"><h3>Probar ahora</h3>${bullets([
          "Observar un feedlot real: escala, recorridos, ritmo, errores y puntos de paso, antes de evaluar equipamiento.",
          "Medir la cobertura del paso instrumentado contra los 20–50 animales por día que declara Optiweigh.",
          "Levantar el conjunto de datos balanza ↔ imagen desde el primer día del piloto: es el activo que financia la otra vía.",
          'Cotizar la oferta local de Optiweigh, Datamars y Olho do Dono — <a href="preguntas-mercado.html#mq07">MQ07</a>.',
        ])}</div><div class="card card--risk"><h3>Qué la invalidaría</h3>${bullets([
          'Que no exista un paso de alta cobertura instrumentable a costo razonable — <a href="supuestos-mercado.html#m02">M02</a>.',
          "Que la oferta local instalada cubra la necesidad a un precio que no se pueda igualar.",
          'Que la frecuencia de pesaje no cambie ninguna decisión real — <a href="supuestos-mercado.html#m08">M08</a>.',
          "Que el volumen de encierro en Uruguay sea demasiado chico para sostener una suscripción por cabeza.",
        ])}</div></div>
        <p>Seguir por el <a href="mercado.html">mapa competitivo</a>, revisar la <a href="tecnologia.html">arquitectura</a> o pasar a <a href="fondos.html">la vía de fondos</a>.</p>
      </section>

    </article></div>
  </main>${footer}</body></html>`;
}

await Promise.all([
  writeFile(join(root, "fondos.html"), fondosPage(), "utf8"),
  writeFile(join(root, "feedlot.html"), feedlotPage(), "utf8"),
]);

console.log("Generados 2 documentos: fondos.html y feedlot.html");
