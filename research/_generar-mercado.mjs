import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const itemsDir = join(root, "items");

const dimensions = [
  ["count", "Conteo"],
  ["identity", "Identidad individual"],
  ["weight", "Peso / tendencia"],
  ["location", "Ubicación"],
  ["visual", "Evidencia visual"],
  ["provenance", "Procedencia resistente a cambios"],
  ["offline", "Captura offline"],
  ["uruguay", "Ajuste / presencia Uruguay"],
];

const sources = {
  fielddata: ["FieldData · sitio oficial", "https://www.fielddata.ag/", "Funciones comerciales de gestión; consultado el 6 de septiembre de 2026."],
  fielddataLanding: ["FieldData · presentación regional", "https://landing.fielddata.ag/home", "Registro por texto/audio, oferta y testimonio de Uruguay; consultado el 6 de septiembre de 2026."],
  fielddataTerms: ["FieldData · términos y condiciones", "https://www.fielddata.ag/terms", "Responsabilidad por los datos y exportación; consultado el 6 de septiembre de 2026."],
  snig: ["SNIG · Trazabilidad individual", "https://www.snig.gub.uy/principal/snig-principal-trazabilidad-trazabilidad-individual-prueba", "Fuente oficial para identidad bovina uruguaya y contenido del RFID."],
  olho: ["Olho do Dono · sitio oficial", "https://olhododono.agr.br/", "Descripción comercial del producto."],
  olhoFdc: ["Fundação Dom Cabral · entrevista a Olho do Dono", "https://sejarelevante.fdc.org.br/olho-do-dono-ajuda-produtores-na-gestao-e-manejo-do-gado/", "Entrevista publicada en 2025 y actualizada en agosto de 2026."],
  ganader: ["GanaderIA · sitio oficial", "https://www.ganader-ia.com/", "Flujo de dron, conteo y pesaje declarado."],
  validagro: ["ValidAgro · resultados 2025–2026", "https://www.validagro.com.ar/convocatoria2025/", "Prueba de campo de GanaderIA y Finca, con limitaciones explícitas."],
  ganaderosAnde: ["ANDE · proyecto Ganaderos", "https://www.ande.org.uy/proyectos-apoyados/item/ganaderos.html", "Descripción oficial del proyecto uruguayo y estado de seguimiento."],
  ganaderosFjr: ["Fundación Julio Ricaldoni · Ganaderos", "https://www.ricaldoni.org.uy/noticias/845-ganaderos-inteligencia-artificial-para-pesaje-bovino.html", "Perfil del equipo y desempeño declarado."],
  opti: ["Optiweigh · cómo funciona", "https://www.optiweigh.com.au/overview/", "Funcionamiento y características publicadas."],
  optiFaq: ["Optiweigh · preguntas frecuentes", "https://www.optiweigh.com.au/overview/faqs/", "Cobertura, muestreo y operación del sistema."],
  optiStory: ["Optiweigh · historia y despliegue", "https://www.optiweigh.com.au/our-story/", "El proveedor declara unidades en Uruguay."],
  vytelle: ["Vytelle SENSE · producto", "https://vytelle.com/vytelle-sense", "Descripción de captura individual de peso e ingesta."],
  vytellePaper: ["Wells et al. · Accuracy of Vytelle SENSE", "https://www.sciencedirect.com/science/article/pii/S2590286521001312", "Applied Animal Science 37(5), 2021; estudio revisado por pares."],
  wow: ["Datamars · What is Walk Over Weighing?", "https://support.livestock.datamars.com/en/articles/9918979-what-is-walk-over-weighing-wow", "Componentes y flujo oficial Tru-Test WOW."],
  wowPaper: ["Dickinson et al. · automated walk-over weighing", "https://www.sciencedirect.com/science/article/pii/S0022030213003639", "Journal of Dairy Science 96(7), 2013; acuerdo y límites de lecturas aisladas."],
  mya: ["Muñoz y Arquero · Datamars/Tru-Test Uruguay", "https://mya.com.uy/", "Representación y soporte de marca en Uruguay; no confirma stock de WOW."],
  baqueano: ["Baqueano · ecosistema", "https://www.baqueano.com.uy/", "Lector, app, informes y soporte uruguayo."],
  baqueanoScale: ["Baqueano · balanzas", "https://baqueano.com.uy/balanzas", "Integración de balanza, RFID e historial."],
  terko: ["Terko · balanza TK3516L", "https://terko.com.uy/producto/balanza-electronica-para-ganado-tk3516l/", "Ficha y precio publicados en Uruguay."],
  pgg: ["PGG · Plataforma de Gestión Ganadera", "https://pgg.uy/", "Funciones, adopción e integraciones declaradas."],
  finca: ["Finca · solución ganadera", "https://finca.com.ar/solucion-ganadera-integral/", "Producto offline y módulos de gestión."],
  fincaAbout: ["Finca · quiénes somos", "https://finca.com.ar/quienes-somos/", "Presencia regional declarada, incluido Uruguay."],
  agriwebb: ["AgriWebb · producto", "https://www.agriwebb.com/us/our-product/", "Gestión, integraciones y trabajo offline."],
  agriwebbMobile: ["AgriWebb · aplicación móvil", "https://www.agriwebb.com/mobile-app/", "Eventos individuales, pesajes y sincronización."],
  cattleeye: ["CattleEye · producto", "https://cattleeye.com/en-gb", "Cámara, IA, movilidad y condición corporal."],
  moovement: ["mOOvement · GPS Ear Tags", "https://moovement.com/home-us", "Ubicación, alertas y despliegue regional declarado."],
  cattleproof: ["CattleProof · producto", "https://www.cattleproof.com/", "EID, registros digitales y auditoría declarados."],
  cattleproofUsda: ["USDA AMS · listado oficial PVP", "https://www.ams.usda.gov/sites/default/files/media/Official%20Listing%20of%20Approved%20Process%20Verified%20Programs%20for%20Sevice%20Providers.pdf", "Listado revisado 27-02-2026; confirma aprobación de CattleProof como proveedor PVP."],
  breedr: ["Breedr · livestock app", "https://www.breedr.co/en/livestock-app", "EID, balanzas, historia individual y trabajo offline."],
  breedrMarket: ["Breedr · livestock market", "https://www.breedr.co/livestock-market", "Comercio con historia productiva y oferta de financiación."],
  optiIntl: ["Optiweigh · International", "https://www.optiweigh.com.au/our-story/optiweigh-around-the-world/", "Declara operación en Nueva Zelanda, Uruguay, EE.UU., Canadá y Reino Unido."],
  optiBeef: ["Beef Central · unidad 1.000 de Optiweigh", "https://www.beefcentral.com/ag-tech/agtech-success-story-as-optiweigh-delivers-1000th-in-paddock-weighing-unit/", "Prensa sectorial independiente sobre la escala del despliegue."],
  ganaderUy: ["Infonegocios · GanaderIA startup uruguaya", "https://infonegocios.biz/infoagro/ganaderia-la-startup-uruguaya-que-pesa-ganado-con-ia-prueba-su-tecnologia-en-australia-y-ee-uu", "Origen uruguayo, fundadores ORT, apoyo ANII y países de operación (31-07-2026)."],
  ganaderCarve: ["Radio Carve · GanaderIA", "https://radiocarve.uy/ganaderia-el-emprendimiento-uruguayo-que-lleva-la-balanza-al-campo-con-drones-e-inteligencia-artificial/", "Confirma el carácter uruguayo del emprendimiento."],
  inia: ["INIA · trazabilidad e identificación electrónica en Uruguay", "https://ainfo.inia.uy/digital/bitstream/item/11293/1/Brito-G..pdf", "Uruguay habilita HDX y FDX‑B bajo ISO 11784/11785."],
  conexion: ["Prensa Mercosur · la estafa ganadera de US$272 millones", "https://prensamercosur.org/2026/08/17/uruguay-la-estafa-ganadera-que-dejo-un-agujero-de-us272-millones-y-expuso-las-fallas-de-un-modelo-que-durante-anos-opero-fuera-del-control-financiero/", "Déficit, ganado inexistente y advertencias previas del BCU (17-08-2026)."],
  conexionAfectados: ["Infobae · 7.000 personas afectadas por los fondos ganaderos", "https://www.infobae.com/america/america-latina/2025/01/27/crisis-de-los-fondos-de-inversion-ganadera-en-uruguay-hay-7-mil-personas-afectadas/", "Escala de damnificados en Conexión Ganadera y República Ganadera."],
  larrarte: ["Búsqueda · el MGAP verificará existencias del Grupo Larrarte", "https://www.busqueda.com.uy/economia/ministerio-ganaderia-verificara-existencias-vacunos-del-grupo-larrarte-denunciado-estafa-n5393274", "El Estado debió salir a contar ganado físicamente ante la denuncia."],
  cerestag: ["Ceres Tag · sitio oficial", "https://cerestag.com/", "Caravana GPS solar directa a satélite, resistencia a manipulación declarada."],
  cattler: ["Cattler · plataforma de feedlot", "https://www.cattler.farm/en/", "Gestión operativa de corrales de encierro."],
  cattlerPr: ["PR Newswire · Cattler en operaciones de EE.UU.", "https://www.prnewswire.com/news-releases/argentine-agtech-startup-cattler-is-gaining-ground-among-us-beef-cattle-operators-301966306.html", "Cobertura sectorial sobre adopción en feedlots estadounidenses."],
};

const items = [
  {
    n: "01", slug: "olho-do-dono", name: "Olho do Dono", group: "direct", groupLabel: "Competidor directo", origin: "Brasil · expansión LatAm", maturity: "Comercial", action: "Comparar y abrir conversación",
    thesis: "Es el referente público más cercano al producto completo: visión 3D, conteo, peso, RFID, GPS y una narrativa explícita de auditoría.",
    evidence: [
      ["Proveedor", "Publica una cámara 3D portátil que pesa y cuenta en puntos de paso, con pocos minutos de trabajo activo.", "olho"],
      ["Entrevista", "La FDC describe operación sin energía ni internet en campo; con lector de brinco electrónico, el sistema controla animal por animal.", "olhoFdc"],
      ["Entrevista", "La misma fuente menciona filmación, ubicación GPS, control remoto y uso para auditoría; no equivale a una validación antifraude independiente.", "olhoFdc"],
    ],
    caps: {count:["yes","Sí"], identity:["yes","RFID declarado"], weight:["yes","3D individual"], location:["partial","GPS declarado"], visual:["yes","Filmación"], provenance:["unknown","No demostrada"], offline:["yes","Captura declarada"], uruguay:["partial","Paraguay/Argentina; UY no confirmado"]},
    overlap: "Coincide con casi toda la propuesta funcional y hasta con el uso de auditoría. La superposición es alta tanto en feedlot como en el futuro servicio financiero.",
    gap: "No hay evidencia pública de firma del dispositivo, protección contra replay, manejo de archivos originales ni prueba inequívoca RFID–imagen cuando hay varios animales. Tampoco se verificó compatibilidad operativa con caravanas SNIG.",
    strategy: "No competir con el mensaje genérico “pesar sin balanza”. Ejecutar una prueba ciega con caravanas SNIG y ataques deliberados; si supera el umbral, evaluar alianza o integración antes de replicar su hardware.",
    risks: ["Las afirmaciones de identificación, GPS y auditoría provienen de entrevista/proveedor.", "Presencia comercial y soporte en Uruguay no publicados.", "Exactitud por raza, postura y ambiente no publicada con distribución de error."],
    questions: ["¿Entrega RFID, frames originales, video continuo, GPS y sello de dispositivo por evento?", "¿Cómo evita doble lectura, lectura vecina o reutilización de un video?", "¿Acepta una comparación ciega con caravanas SNIG reales —HDX y FDX‑B— y balanza calibrada en Uruguay?"],
    refs: ["olho","olhoFdc","inia","snig"],
  },
  {
    n: "02", slug: "ganaderia", name: "GanaderIA", group: "direct", groupLabel: "Competidor directo por lote", origin: "Uruguay · opera también en Argentina", maturity: "Comercial con validación de campo", action: "Contactar temprano y explorar complementariedad",
    thesis: "Reduce mucho el costo de inventario y estimación de peso por lote desde dron, pero no demuestra identidad individual SNIG ni cadena de custodia. Es competencia local, no regional.",
    evidence: [
      ["Proveedor", "Publica filmación 4K con drones DJI, conteo y peso estimado individual/promedio en una plataforma web.", "ganader"],
      ["Prensa", "Es una startup uruguaya fundada por egresados de la ORT (Porras, Navarrete y Sosa), con apoyo de ANII; opera en Uruguay y Argentina y realiza pruebas en Australia, Nueva Zelanda y EE.UU.", "ganaderUy"],
      ["Validación", "ValidAgro probó 315 Hereford durante seis meses: 100% de conteo en condiciones óptimas y 99,7% en subóptimas.", "validagro"],
      ["Validación", "El pesaje varió de −1,8% a +2,1% en condiciones óptimas y −6,17% en subóptimas; el procesamiento fue asistido, no el flujo comercial autónomo.", "validagro"],
    ],
    caps: {count:["yes","Fuerte"], identity:["unknown","RFID no publicado"], weight:["yes","Estimado por dron"], location:["partial","Operación geográfica, no prueba"], visual:["yes","Video aéreo"], provenance:["unknown","No publicada"], offline:["unknown","Procesamiento/plataforma"], uruguay:["yes","Startup uruguaya en operación"]},
    overlap: "Compite en conteo, inventario periódico y tendencia de peso por lote, especialmente fuera del feedlot. Puede satisfacer buena parte de una auditoría de existencia a menor manejo. Al ser uruguaya, comparte además ecosistema, financiamiento público y acceso a los mismos productores.",
    gap: "No publica enlace entre animal y caravana SNIG, continuidad longitudinal individual ni evidencia resistente a edición. El pesaje requiere protocolo más estricto que el conteo.",
    strategy: "Competidor local activo y, en la vía de fondos, la amenaza frontal: un censo aéreo responde “¿hay 28.000 o hay nueve?” más rápido y más barato que cualquier paso individual, y lo que no responde es identidad individual. Tratarlo como módulo de cobertura de lote y candidato preferente a alianza; comparar costo/tiempo y explorar si sus videos y resultados pueden incorporarse a un paquete de evidencia con RFID terrestre.",
    risks: ["El estudio es una prueba de concepto descriptiva, no validación estadística concluyente.", "La calidad cae con aglomeración, viento y protocolo subóptimo.", "La app comercial autónoma no fue la que produjo los resultados publicados.", "Compite por los mismos clientes, talento y apoyos institucionales uruguayos."],
    questions: ["¿Puede conservar video original, telemetría del dron y hash de carga?", "¿Existe API para resultados por animal y máscaras/frames?", "¿Cómo se enlaza un resultado aéreo con un RFID leído en tierra?", "¿Qué establecimientos uruguayos usa hoy y con qué frecuencia?"],
    refs: ["ganader","ganaderUy","ganaderCarve","validagro"],
  },
  {
    n: "03", slug: "ganaderos-uy", name: "Ganaderos", group: "direct", groupLabel: "Competidor emergente", origin: "Uruguay", maturity: "Emprendimiento en ejecución", action: "Contactar temprano",
    thesis: "Es la señal local más directa de estimación individual de peso con celular y sin infraestructura adicional.",
    evidence: [
      ["Institucional", "ANDE describe un servicio con app móvil para digitalizar y obtener peso individual, con seguimiento desde 2023.", "ganaderosAnde"],
      ["Institucional", "Fundación Ricaldoni identifica a Santiago e Ignacio Taruselli y comunica 95% de precisión frente a balanza digital como afirmación del proyecto.", "ganaderosFjr"],
      ["Incubación", "La propuesta busca evitar corrales e infraestructura, y está dirigida a productores uruguayos.", "ganaderosAnde"],
    ],
    caps: {count:["unknown","No publicado"], identity:["unknown","Método no publicado"], weight:["yes","Individual por celular"], location:["unknown","No publicado"], visual:["partial","Captura móvil; retención desconocida"], provenance:["unknown","No publicada"], offline:["unknown","No publicado"], uruguay:["yes","Nativo"]},
    overlap: "Compite en la promesa de peso individual sin mover ganado y tiene ventaja de contexto, acceso y soporte local.",
    gap: "La evidencia pública no explica captura, muestra, error por subgrupo, identidad RFID, madurez comercial ni retención de imágenes.",
    strategy: "Solicitar demo y documentación antes de asumir que es sólo un proyecto temprano. Puede ser competidor, socio de modelo o fuente de aprendizaje local.",
    risks: ["La precisión publicada no incluye tamaño de muestra ni distribución de error.", "Estado comercial y disponibilidad no verificados.", "No hay evidencia pública sobre RFID o auditoría."],
    questions: ["¿Qué imágenes exige y qué razas/categorías cubre?", "¿Cómo se asocia cada peso al identificador SNIG?", "¿Cuál es el estado actual: piloto, servicio o producto disponible?"],
    refs: ["ganaderosAnde","ganaderosFjr","snig"],
  },
  {
    n: "04", slug: "optiweigh", name: "Optiweigh", group: "direct", groupLabel: "Competidor directo de peso continuo", origin: "Australia · unidades declaradas en Uruguay", maturity: "Comercial madura", action: "Benchmark obligatorio",
    thesis: "Hace que “tendencia de peso sin arreo” deje de ser diferenciador: combina EID, peso parcial, energía solar y conectividad remota en una unidad móvil.",
    evidence: [
      ["Proveedor", "El animal coloca las patas delanteras en la plataforma; se registra EID y peso parcial y el algoritmo estima peso completo.", "opti"],
      ["Proveedor", "La FAQ reconoce cobertura incompleta: normalmente 20–50 animales por día y entre un tercio y dos tercios del lote tras 3–5 días.", "optiFaq"],
      ["Proveedor", "La página de historia declara más de 400 unidades y presencia en Australia, Nueva Zelanda, Uruguay y Canadá.", "optiStory"],
      ["Proveedor", "La página internacional confirma operación en Nueva Zelanda, Uruguay, EE.UU., Canadá y Reino Unido, y declara más de 500.000 animales monitoreados por mes.", "optiIntl"],
      ["Prensa", "Beef Central reportó la entrega de la unidad número 1.000, señal independiente de escala del despliegue.", "optiBeef"],
    ],
    caps: {count:["partial","Muestra de visitas"], identity:["yes","EID"], weight:["yes","Parcial → total"], location:["partial","Unidad en potrero; GPS no publicado"], visual:["no","No es parte del flujo"], provenance:["unknown","Registro cloud ordinario"], offline:["partial","Unidad autónoma; resultado remoto"], uruguay:["yes","Uruguay entre los países de operación"]},
    overlap: "Superposición alta con monitoreo frecuente de peso individual en feedlot/pastoreo. No cubre foto, existencia visual ni auditoría antifraude.",
    gap: "El muestreo es voluntario y puede estar sesgado por atrayente. La identidad depende de EID compatible y no hay prueba visual del animal/evento.",
    strategy: "Probarlo como línea base o incluso como sensor de peso dentro del sistema de evidencia. Validar lectura de caravanas SNIG reales —HDX y FDX‑B—, soporte local, tasa de cobertura y acceso a datos crudos/API.",
    risks: ["No pesa a todo el lote en cada ventana.", "Datos y cálculo dependen de nube/conectividad declarada.", "La presencia en Uruguay está confirmada por el proveedor en dos páginas, pero el número de unidades, clientes y soporte local sigue sin verificarse.", "Compatibilidad concreta con caravanas SNIG debe confirmarse para ambas tecnologías, HDX y FDX‑B."],
    questions: ["¿Qué unidades y clientes existen en Uruguay?", "¿Lee las caravanas SNIG reales en sus dos tecnologías habilitadas, HDX y FDX‑B?", "¿Exporta lecturas crudas, rechazos, ID de equipo y timestamps firmados?"],
    refs: ["opti","optiFaq","optiStory","optiIntl","optiBeef","inia","snig"],
  },
  {
    n: "05", slug: "vytelle-sense", name: "Vytelle SENSE", group: "direct", groupLabel: "Competidor directo de feedlot", origin: "Global", maturity: "Comercial y validada", action: "Benchmark técnico",
    thesis: "Es la referencia de mayor madurez para peso individual continuo asociado a RFID en un punto natural de bebida.",
    evidence: [
      ["Proveedor", "Las posiciones de pesaje capturan peso parcial e identificación individual; la plataforma también puede medir ingesta.", "vytelle"],
      ["Investigación", "Wells et al. evaluaron 88 novillos: fuerte acuerdo del peso estimado con walk-over weighing usado como proxy de balanza estática.", "vytellePaper"],
      ["Investigación", "El estudio permite defender tendencia y monitoreo, pero no convierte cada lectura aislada en peso comercial ni prueba de existencia visual.", "vytellePaper"],
    ],
    caps: {count:["partial","Visitas al punto"], identity:["yes","RFID HDX declarado"], weight:["yes","Continuo individual"], location:["partial","Punto fijo"], visual:["no","No publicada"], provenance:["unknown","No antifraude publicada"], offline:["unknown","No publicado"], uruguay:["unknown","Disponibilidad no encontrada"]},
    overlap: "Compite directamente con el primer caso feedlot: identidad y tendencia individual sin encierre adicional.",
    gap: "No cubre evidencia visual, geolocalización probatoria ni firma de dispositivo. Su foco es desempeño/eficiencia, no auditoría financiera.",
    strategy: "Usarlo como estándar de comparación de precisión/cobertura. Investigar integración o aprendizaje del algoritmo de agregación antes de construir una balanza parcial propia.",
    risks: ["Disponibilidad, costo y soporte regional no publicados.", "La validación es sólida pero contextual; requiere prueba con razas y manejo local.", "Declarar HDX no garantiza compatibilidad plug-and-play con SNIG: Uruguay habilita HDX y FDX‑B, de modo que un rodeo real puede mezclar ambas tecnologías."],
    questions: ["¿Puede operar sólo con módulo de peso y qué costo por corral?", "¿Qué cobertura diaria y reglas de descarte entrega?", "¿Hay API y acceso a observaciones parciales crudas?"],
    refs: ["vytelle","vytellePaper","inia","snig"],
  },
  {
    n: "06", slug: "tru-test-wow", name: "Datamars Tru‑Test WOW", group: "direct", groupLabel: "Competidor directo de peso al paso", origin: "Global · marca con soporte en Uruguay", maturity: "Comercial madura", action: "Verificar disponibilidad local",
    thesis: "Une plataforma de paso, EID, módem y nube; es una alternativa industrial a capturar peso frecuente con cámaras.",
    evidence: [
      ["Proveedor", "Datamars describe plataforma con celdas, unidad de control, lector/antena EID y envío a su software cloud.", "wow"],
      ["Investigación", "La literatura sobre WoW muestra utilidad para tendencia, pero advierte que lecturas aisladas y conductas anómalas generan valores espurios.", "wowPaper"],
      ["Local", "Muñoz y Arquero representa Tru‑Test/Datamars en Uruguay; no se verificó públicamente que comercialice el módulo WOW concreto.", "mya"],
    ],
    caps: {count:["partial","Pasajes"], identity:["yes","EID"], weight:["yes","Cuerpo completo al paso"], location:["partial","Punto fijo"], visual:["no","No"], provenance:["unknown","No antifraude publicada"], offline:["partial","Captura local + módem"], uruguay:["partial","Marca local; WOW por confirmar"]},
    overlap: "Resuelve identidad + peso frecuente y podría integrarse rápidamente en corredores existentes. No cubre imagen ni procedencia fuerte.",
    gap: "La cobertura depende de que los animales crucen el punto y el algoritmo filtre conductas/pesos espurios. El flujo público permite editar datos en la nube.",
    strategy: "Consultar al distribuidor local y cotizar una configuración real. Puede ser referencia, componente de un piloto o sustituto inmediato del sensor de peso.",
    risks: ["Disponibilidad del producto WOW en Uruguay no confirmada.", "Necesita infraestructura de paso y conectividad para el flujo cloud.", "La precisión debe evaluarse sobre promedios/ventanas, no una lectura aislada."],
    questions: ["¿Qué modelos WOW, antenas y servicio están disponibles en Uruguay?", "¿Cómo trata vueltas atrás, dos animales y EID faltante?", "¿Se pueden firmar/exportar lecturas crudas y descartes?"],
    refs: ["wow","wowPaper","mya","snig"],
  },
  {
    n: "07", slug: "baqueano", name: "Baqueano", group: "substitute", groupLabel: "Sustituto y socio local", origin: "Uruguay", maturity: "Comercial", action: "Integrar antes que reemplazar",
    thesis: "Es el ecosistema local más obvio para RFID + balanza + app; sustituye buena parte del registro y puede ser canal/receptor de eventos.",
    evidence: [
      ["Proveedor", "Lector PRO/PRO S, app, tareas, informes y exportación de lecturas para SNIG.", "baqueano"],
      ["Proveedor", "Las balanzas se conectan con RFID y consolidan historial individual o por lote en la app.", "baqueanoScale"],
      ["Proveedor", "Publica soporte local y validación en el programa Converge de INIA; el informe independiente no fue inspeccionado en esta investigación.", "baqueano"],
    ],
    caps: {count:["yes","Lecturas RFID"], identity:["yes","SNIG/RFID"], weight:["yes","Balanza estática"], location:["unknown","No automática"], visual:["no","No central"], provenance:["unknown","Registro editable/exportable"], offline:["yes","Equipo y app"], uruguay:["yes","Nativo y soportado"]},
    overlap: "Resuelve el flujo de manga y la historia productiva básica con tecnología disponible y conocida localmente. Sustituye el MVP si éste sólo digitaliza RFID + peso.",
    gap: "Requiere manejo/balanza, no captura automáticamente foto, ubicación ni evidencia resistente a manipulación.",
    strategy: "Definir conectores e interoperabilidad. El producto debería producir eventos verificables que Baqueano pueda importar, no competir como otro gestor general.",
    risks: ["Protocolos y API no publicados de forma suficiente.", "La procedencia del evento no está diseñada públicamente para auditoría financiera.", "Una alianza puede generar dependencia de hardware/formato."],
    questions: ["¿Qué interfaces permiten inyectar RFID, peso, foto y metadatos?", "¿Qué parte funciona sin señal y cómo resuelve conflictos?", "¿Aceptaría un piloto conjunto en feedlot con evento firmado?"],
    refs: ["baqueano","baqueanoScale","snig"],
  },
  {
    n: "08", slug: "terko-tk3516l", name: "Terko TK3516L", group: "substitute", groupLabel: "Sustituto de balanza estática", origin: "Uruguay", maturity: "Comercial", action: "Usar como verdad de referencia",
    thesis: "Representa una respuesta concreta, disponible y relativamente económica: balanza robusta con RFID, memoria y conectividad local.",
    evidence: [
      ["Proveedor", "Capacidad de 3.000 kg, lector RFID integrado, Bluetooth y almacenamiento de 10.000 eventos con fecha, hora, animal, lote y peso.", "terko"],
      ["Proveedor", "Publica autonomía de batería de 12 horas y un precio de lista de USD 2.520,52 al corte; precio sujeto a cambio.", "terko"],
      ["Proveedor", "Permite estadísticas y ganancia de peso por ID, y exporta a PC mediante interfaces estándar del equipo.", "terko"],
    ],
    caps: {count:["partial","Eventos pesados"], identity:["yes","RFID"], weight:["yes","Balanza directa"], location:["no","No"], visual:["no","No"], provenance:["unknown","Memoria, no firma"], offline:["yes","Batería y memoria"], uruguay:["yes","Venta local"]},
    overlap: "Satisface el trabajo clásico de peso individual confiable y reduce errores de transcripción. Es sustituto fuerte cuando mover animales no es un problema decisivo.",
    gap: "No evita el manejo ni agrega imagen, geolocalización o prueba de originalidad. El operador controla el contexto del evento.",
    strategy: "Usarla —u otra balanza calibrada equivalente— como referencia del piloto. La propuesta debe justificar su prima con ahorro de manejo, frecuencia o fuerza probatoria.",
    risks: ["El precio publicado puede cambiar y no incluye necesariamente brete/instalación.", "La compatibilidad real con cada lector/tag debe probarse.", "Un dato con fecha/hora no es por sí mismo evidencia inalterable."],
    questions: ["¿Cuál es el costo total instalado y calibrado?", "¿Cómo exporta eventos y qué campos conserva?", "¿Qué frecuencia de pesaje real logra hoy el feedlot objetivo?"],
    refs: ["terko","snig"],
  },
  {
    n: "09", slug: "pgg", name: "PGG", group: "similar", groupLabel: "Plataforma similar local", origin: "Uruguay", maturity: "Comercial declarada", action: "Validar y mapear integración",
    thesis: "Compite por el sistema de registro y decisión, no por el sensor; su cercanía local puede volverlo socio, canal o sustituto del software general.",
    evidence: [
      ["Proveedor", "Publica lotes, pesaje automatizado, integración con balanza/lector RFID, reportes y alertas.", "pgg"],
      ["Proveedor", "Declara más de 50 productores y apoyo institucional; esas cifras no se corroboraron con otra fuente.", "pgg"],
      ["Proveedor", "No publica suficiente detalle sobre offline, API, archivos originales o auditoría de cambios.", "pgg"],
    ],
    caps: {count:["partial","Inventario/lotes"], identity:["yes","RFID integrado"], weight:["yes","Desde balanza"], location:["partial","Lotes, no automática"], visual:["unknown","No publicada"], provenance:["unknown","No publicada"], offline:["unknown","No publicado"], uruguay:["yes","Nativo"]},
    overlap: "Se superpone con consulta, historia, reportes y alertas. No evidencia captura automática ni cadena de custodia.",
    gap: "El sitio público deja abiertos producto real, integraciones concretas, portabilidad y controles de evidencia.",
    strategy: "No construir un ERP para competir frontalmente. Solicitar demo y evaluar un conector de eventos; si no hay API/portabilidad, conservar independencia.",
    risks: ["Métricas de adopción son declaraciones del proveedor.", "Madurez y soporte no verificados con clientes.", "La plataforma puede ampliar captura de imágenes/RFID y acercarse al producto."],
    questions: ["¿Qué hardware está homologado y cómo se conectan las lecturas?", "¿Funciona offline y exporta historia completa con auditoría?", "¿Acepta datos de sensores externos por API?"],
    refs: ["pgg","snig"],
  },
  {
    n: "10", slug: "finca", name: "Finca", group: "similar", groupLabel: "Plataforma similar regional", origin: "Argentina · presencia declarada en Uruguay", maturity: "Comercial", action: "Vigilar y considerar integración",
    thesis: "Es una plataforma regional offline con trazabilidad; una validación real mostró tanto su valor analítico como el costo de mantener identidad completa.",
    evidence: [
      ["Proveedor", "Finca publica gestión desde el celular sin internet y presencia en varios países, incluido Uruguay.", "finca"],
      ["Validación", "ValidAgro cargó ~7.352 animales (73,5% de un stock de ~10.000) y construyó indicadores productivos.", "validagro"],
      ["Validación", "No se alcanzó 100% por pérdida de caravanas, reasignaciones y movimientos; la prueba recomienda lógica híbrida lote/individual.", "validagro"],
    ],
    caps: {count:["yes","Inventario"], identity:["yes","Caravana electrónica"], weight:["partial","Registro/indicadores"], location:["partial","Gestión de campo"], visual:["unknown","No central"], provenance:["unknown","No antifraude publicada"], offline:["yes","Declarado y probado"], uruguay:["yes","Presencia declarada"]},
    overlap: "Compite en historia, trazabilidad y analítica. La prueba de campo confirma que la calidad del registro, no sólo el software, es el cuello de botella.",
    gap: "No genera automáticamente el evento sensor–imagen ni demuestra procedencia digital fuerte.",
    strategy: "Usarlo como posible sistema receptor. Diseñar desde el inicio manejo de tag perdido, reidentificación, altas/bajas y cobertura incompleta.",
    risks: ["Presencia en Uruguay es declaración del proveedor.", "La digitalización completa falló en la validación observada.", "Una integración puede duplicar reglas de identidad si no hay modelo común."],
    questions: ["¿Qué API/importaciones soporta para eventos firmados?", "¿Cómo reconcilia pérdida y reemplazo de caravanas?", "¿Qué permisos y trazas de edición conserva?"],
    refs: ["finca","fincaAbout","validagro"],
  },
  {
    n: "11", slug: "agriwebb", name: "AgriWebb", group: "similar", groupLabel: "Plataforma similar global", origin: "Australia / global", maturity: "Comercial madura", action: "Referente de integración y UX offline",
    thesis: "Demuestra cómo una plataforma ganadera puede absorber EID, balanzas, mapas y eventos offline; no conviene replicar esa amplitud.",
    evidence: [
      ["Proveedor", "Integra EID, balanzas y otros hardware; permite trabajar online u offline.", "agriwebb"],
      ["Proveedor", "La app registra pesos, movimientos, tratamientos, tags y reportes individuales, y sincroniza al volver la conectividad.", "agriwebbMobile"],
      ["Proveedor", "Su foco es gestión productiva; no publica captura visual probatoria ni evidencia resistente a manipulación.", "agriwebb"],
    ],
    caps: {count:["yes","Inventario"], identity:["yes","EID"], weight:["yes","Balanza/registro"], location:["partial","Mapa y potreros manuales"], visual:["unknown","No central"], provenance:["unknown","Roles, no firma publicada"], offline:["yes","Explícito"], uruguay:["unknown","Disponibilidad no verificada"]},
    overlap: "Se superpone con la capa de consulta, historial y operación offline. Su cobertura funcional vuelve poco atractivo construir otro gestor completo.",
    gap: "No resuelve el enlace físico RFID–foto–peso ni la cadena probatoria para terceros financieros.",
    strategy: "Tomarlo como patrón de integración y experiencia offline. Mantener Ganadería aumentada como fuente de eventos especializados y exportables.",
    risks: ["Compatibilidad de hardware varía por plataforma y modelo.", "No se verificó oferta comercial en Uruguay.", "Su escala le permitiría agregar sensores o alianzas rápidamente."],
    questions: ["¿Existe API para eventos y adjuntos con metadatos?", "¿Cómo audita correcciones offline y conflictos?", "¿Aceptaría integrar un dispositivo de evidencia para LatAm?"],
    refs: ["agriwebb","agriwebbMobile"],
  },
  {
    n: "12", slug: "cattleeye", name: "CattleEye", group: "evolution", groupLabel: "Puede converger desde visión", origin: "Reino Unido / lechería", maturity: "Comercial", action: "Vigilar capacidad de expansión",
    thesis: "Ya convierte video fijo en identidad y métricas individuales diarias; agregar peso o evidencia exportable sería una expansión técnicamente plausible.",
    evidence: [
      ["Proveedor", "Instala una cámara sobre la salida de la sala de ordeñe y analiza movilidad y condición corporal con IA.", "cattleeye"],
      ["Proveedor", "Publica integración con software de gestión y resultados individuales frecuentes.", "cattleeye"],
      ["Proveedor", "El contexto actual es lechería con paso controlado; no publica peso vivo, RFID SNIG ni auditoría financiera.", "cattleeye"],
    ],
    caps: {count:["partial","Flujo de animales"], identity:["partial","Identidad visual / integración"], weight:["no","BCS, no peso vivo"], location:["partial","Punto fijo"], visual:["yes","Video continuo"], provenance:["unknown","No publicada"], offline:["unknown","No publicado"], uruguay:["unknown","No verificado"]},
    overlap: "Comparte cámara fija, procesamiento individual y métricas longitudinales. Es adyacente hoy, pero tiene una ruta clara hacia peso/identidad.",
    gap: "Depende de infraestructura de ordeñe y su producto no está orientado a bovinos de carne/feedlot.",
    strategy: "Vigilar patentes, APIs y expansión a carne. Aprender de su captura pasiva y su integración con sistemas existentes.",
    risks: ["Identificación visual no sustituye la identidad oficial uruguaya.", "Transferir modelos de lechería a feedlot exige datos y validación nuevos.", "La disponibilidad regional no está publicada."],
    questions: ["¿Cómo resuelve identidad y animales no reconocidos?", "¿Conserva video original o sólo scores?", "¿Tiene roadmap de peso vivo o bovinos de carne?"],
    refs: ["cattleeye","snig"],
  },
  {
    n: "13", slug: "moovement", name: "mOOvement", group: "evolution", groupLabel: "Puede converger desde ubicación", origin: "Australia · presencia regional", maturity: "Comercial", action: "Explorar como sensor complementario",
    thesis: "Resuelve la pieza más difícil de obtener de forma continua: ubicación individual, con caravana GPS solar y alertas.",
    evidence: [
      ["Proveedor", "Publica caravanas GPS reutilizables y solares, app, portal y alertas de salida/actividad.", "moovement"],
      ["Proveedor", "Declara operación en cinco continentes y 23 países, con contactos en Paraguay y Argentina.", "moovement"],
      ["Proveedor", "Es una segunda caravana activa; no es la caravana oficial SNIG y no aporta peso ni imagen.", "moovement"],
    ],
    caps: {count:["partial","Sólo animales equipados"], identity:["partial","ID del tag propio"], weight:["no","No"], location:["yes","GPS individual"], visual:["no","No"], provenance:["partial","Telemetría de dispositivo"], offline:["partial","Red propia; nube para consulta"], uruguay:["partial","Región cercana; UY no verificado"]},
    overlap: "Aporta ubicación y convivencia/proximidad, dos trabajos secundarios del dossier. Podría complementar la captura de peso/foto.",
    gap: "Costo, mantenimiento, pérdida y doble dispositivo por animal chocan con el supuesto de no añadir wearables a todo el rodeo.",
    strategy: "No replicar GPS en el núcleo del producto. Probar una muestra centinela o usarlo para validar inferencias de ubicación y relación.",
    risks: ["Requiere dispositivo adicional y mantenimiento.", "Ubicación GPS no prueba por sí sola identidad visual ni peso.", "Frecuencia, batería y cobertura real deben validarse por paisaje."],
    questions: ["¿Puede enlazar su ID al SNIG y exportar telemetría cruda?", "¿Qué costo total y tasa de pérdida tiene por animal/año?", "¿Qué cobertura y precisión ofrece en Uruguay?"],
    refs: ["moovement","snig"],
  },
  {
    n: "14", slug: "cattleproof", name: "CattleProof", group: "evolution", groupLabel: "Puede converger desde auditoría", origin: "Estados Unidos", maturity: "Comercial / programa verificado", action: "Estudiar patrón de confianza",
    thesis: "No mide animales, pero muestra cómo convertir EID e historia en documentación aceptada por un tercero; es la referencia más útil para la vía de fondos ganaderos.",
    evidence: [
      ["Proveedor", "Combina EID con registros digitales, timestamps y control de acceso; menciona usos de colateral, seguros y mercados.", "cattleproof"],
      ["Oficial", "USDA AMS lista a CattleProof Verified como proveedor PVP aprobado para Source & Age y Born in the USA, con aprobación original en 2024.", "cattleproofUsda"],
      ["Límite", "La aprobación confirma procesos específicos; no valida automáticamente toda afirmación técnica del ledger ni lo hace aplicable a Uruguay.", "cattleproofUsda"],
    ],
    caps: {count:["yes","Inventario EID"], identity:["yes","EID"], weight:["unknown","No central"], location:["partial","Origen/movimiento registrado"], visual:["no","No central"], provenance:["yes","Ledger + auditoría de proceso"], offline:["unknown","No publicado"], uruguay:["no","Programa estadounidense"]},
    overlap: "Se superpone con cadena de custodia, certificados, permisos y confianza de terceros; no con captura de peso/foto.",
    gap: "Los datos ingresan por scanner, software, planilla o carga manual: la inmutabilidad posterior no garantiza que la observación original sea verdadera.",
    strategy: "Copiar el principio, no la jurisdicción: separar captura confiable, registro inalterable y verificación independiente. Consultar auditores/bancos uruguayos antes de elegir tecnología ledger.",
    risks: ["Blockchain no resuelve falsedad en el origen del dato.", "La certificación USDA tiene alcance y reglas propios.", "Adaptación legal/contractual uruguaya no investigada aún."],
    questions: ["¿Qué controles verifican el dato antes de registrarlo?", "¿Cómo maneja correcciones sin borrar el pasado?", "¿Qué evidencia aceptan bancos y fiduciarios uruguayos?"],
    refs: ["cattleproof","cattleproofUsda","snig"],
  },
  {
    n: "15", slug: "breedr", name: "Breedr", group: "evolution", groupLabel: "Puede converger desde datos y financiación", origin: "Reino Unido / Norteamérica", maturity: "Comercial", action: "Vigilar modelo de negocio",
    thesis: "Une historia individual, pesaje/EID, comercio y financiación: muestra cómo el dato productivo puede terminar respaldando transacciones.",
    evidence: [
      ["Proveedor", "Conecta balanzas y lectores EID por Bluetooth, trabaja offline y calcula crecimiento/valor individual.", "breedr"],
      ["Proveedor", "Su mercado permite vender animales con historia de peso y sanidad; también publica un servicio de cashflow/financiación.", "breedrMarket"],
      ["Proveedor", "La evidencia depende de datos capturados/cargados; no publica vínculo foto–RFID ni procedencia resistente a manipulación.", "breedr"],
    ],
    caps: {count:["yes","Inventario"], identity:["yes","EID"], weight:["yes","Balanza/registro"], location:["partial","Establecimiento/lote"], visual:["unknown","No central"], provenance:["unknown","Historia, no firma publicada"], offline:["yes","App"], uruguay:["unknown","No verificado"]},
    overlap: "No compite hoy en sensor automático, pero sí en convertir historia productiva en valor, comercio y financiación.",
    gap: "El sistema no demuestra que el animal, peso y ubicación fueron observados por un dispositivo independiente en el mismo evento.",
    strategy: "Usarlo como referencia de propuesta de valor futura: la captura sólo importa si reduce riesgo o mejora una transacción. Vigilar expansión regional y alianzas de hardware.",
    risks: ["Funciones y disponibilidad varían por país.", "Las afirmaciones de valor son del proveedor.", "La historia cargada no es equivalente a evidencia auditable independiente."],
    questions: ["¿Qué controles exige para otorgar financiación sobre ganado?", "¿Quién responde por datos incorrectos?", "¿Acepta adjuntos y eventos firmados de hardware externo?"],
    refs: ["breedr","breedrMarket"],
  },
  {
    n: "16", slug: "ceres-tag", name: "Ceres Tag", group: "evolution", groupLabel: "Puede converger desde procedencia del dispositivo", origin: "Australia · más de 30 países declarados", maturity: "Comercial", action: "Estudiar como referente de procedencia en hardware",
    thesis: "Es el único ítem del mapa que trata la resistencia a manipulación como atributo del dispositivo y no del software: caravana GPS solar, directa a satélite y sin infraestructura intermedia.",
    evidence: [
      ["Proveedor", "Publica caravanas con GPS, energía solar y conectividad directa a satélite, sin torres, baterías ni mantenimiento declarados.", "cerestag"],
      ["Proveedor", "Describe la identificación GPS como resistente a manipulación (“tamper-resistant”) y declara presencia en más de 30 países.", "cerestag"],
      ["Límite", "El material comercial apunta a productividad, trazabilidad y reportes de sostenibilidad; no publica productos de verificación de colateral para bancos ni presencia en Uruguay.", "cerestag"],
    ],
    caps: {count:["partial","Sólo animales equipados"], identity:["partial","ID del tag propio"], weight:["no","No"], location:["yes","GPS individual satelital"], visual:["no","No"], provenance:["partial","Resistencia a manipulación declarada en el dispositivo"], offline:["partial","Enlace satelital directo"], uruguay:["unknown","No verificado"]},
    overlap: "Se superpone con mOOvement en ubicación individual, pero aporta algo que ningún otro ítem publica: procedencia anclada en el hardware, que es exactamente la columna donde el mapa detecta el hueco.",
    gap: "No mide peso ni captura imagen, no reemplaza la caravana oficial SNIG y su resistencia a manipulación es una afirmación comercial sin auditoría independiente publicada.",
    strategy: "Estudiar cómo define y defiende “tamper-resistant” antes de diseñar la procedencia propia; evaluar la caravana satelital como sensor de ubicación de una muestra centinela.",
    risks: ["Segundo dispositivo por animal, con costo y pérdidas.", "Sin evidencia de disponibilidad ni soporte en Uruguay.", "La resistencia a manipulación declarada no equivale a una cadena de custodia verificada por un tercero."],
    questions: ["¿Qué significa exactamente “tamper-resistant” y cómo se detecta un tag removido o reubicado?", "¿Puede firmar telemetría y exportarla en crudo?", "¿Existe canal, costo y cobertura satelital para Uruguay?"],
    refs: ["cerestag","snig"],
  },
  {
    n: "17", slug: "cattler", name: "Cattler", group: "similar", groupLabel: "Plataforma similar de feedlot", origin: "Argentina · expansión en EE.UU.", maturity: "Comercial", action: "Mapear como sistema receptor del primer segmento",
    thesis: "Es la plataforma de gestión especializada en el segmento que el proyecto eligió primero: el corral de encierro. El resto de las plataformas del mapa son generalistas.",
    evidence: [
      ["Proveedor", "Publica gestión operativa de feedlot: lotes, alimentación, sanidad, movimientos y seguimiento de desempeño.", "cattler"],
      ["Prensa", "Cobertura sectorial reporta adopción creciente entre operadores de ganado de carne en Estados Unidos.", "cattlerPr"],
      ["Límite", "No publica captura automática de peso e imagen ni evidencia resistente a manipulación; su valor está en la operación diaria del corral.", "cattler"],
    ],
    caps: {count:["yes","Inventario por corral"], identity:["partial","Lote e individual según configuración"], weight:["partial","Registro de pesadas"], location:["partial","Corral declarado"], visual:["unknown","No central"], provenance:["unknown","No publicada"], offline:["unknown","No publicado"], uruguay:["unknown","No verificado"]},
    overlap: "Compite por el software del feedlot, no por el sensor. Si el primer producto es un evento de evidencia en encierro, Cattler es el tipo de sistema que debería consumirlo.",
    gap: "No genera el evento RFID–foto–peso–ubicación ni resuelve procedencia; depende de lo que el operador cargue o conecte.",
    strategy: "Evaluarlo como receptor natural del evento en la vía de feedlot, junto a Baqueano en Uruguay; verificar API y disposición a integrar eventos firmados de terceros.",
    risks: ["Presencia y soporte en Uruguay no verificados.", "Podría incorporar captura automática y acercarse al producto.", "Integrar con una plataforma extranjera agrega dependencia y reglas de identidad ajenas al SNIG."],
    questions: ["¿Qué API acepta eventos de sensores externos con adjuntos y metadatos?", "¿Opera hoy en feedlots uruguayos?", "¿Cómo modela identidad individual frente a manejo por corral?"],
    refs: ["cattler","cattlerPr"],
  },
  {
    n: "18", slug: "fielddata", name: "FieldData", group: "similar", groupLabel: "Plataforma similar de gestión", origin: "Regional · Uruguay incluido en su oferta", maturity: "Comercial", action: "Evaluar integración y adopción por WhatsApp", date: "6 sep 2026", sourceDate: "6 de septiembre de 2026",
    thesis: "Compite por el registro cotidiano del productor mediante WhatsApp; puede ser un canal receptor de eventos verificados.",
    evidence: [
      ["Proveedor", "Ofrece gestión agropecuaria por WhatsApp y web, mapas por potrero, exportación Excel y resúmenes semanales.", "fielddata"],
      ["Proveedor", "La presentación regional admite texto y audio, incluye Uruguay y publica un testimonio de un veterinario de Cerro Largo. Anuncia planes desde USD 35/mes y prueba de 15 días; falta cotizar el alcance para cada operación.", "fielddataLanding"],
      ["Proveedor", "El sitio anuncia registro sin conexión; no detalla qué funciona sin señal ni cuándo se procesa y sincroniza el mensaje.", "fielddata"],
      ["Términos", "El usuario responde por exactitud, calidad e integridad de los datos ingresados. Los términos contemplan exportación Excel al cancelar.", "fielddataTerms"],
    ],
    caps: {count:["partial","Inventario declarado, no censo físico"], identity:["unknown","RFID/SNIG no verificado"], weight:["unknown","Captura de peso no verificada"], location:["partial","Mapa por potrero, no GPS individual probado"], visual:["unknown","Evidencia del animal no verificada"], provenance:["unknown","No demostrada"], offline:["partial","Anunciado; alcance por verificar"], uruguay:["partial","Oferta y testimonio del proveedor"]},
    overlap: "En feedlot puede disputar el presupuesto de gestión y la adopción del equipo. En fondos podría organizar declaraciones operativas; inferimos que esas declaraciones, por sí solas, no acreditan existencias.",
    gap: "Las fuentes revisadas no demuestran un evento físico simultáneo RFID–foto–peso–ubicación ni controles contra reutilización o edición. No se verificó integración con SNIG, lectores o balanzas.",
    strategy: "Probar con operarios el registro conversacional y la corrección de errores. Explorar una integración que preserve el evento original y separe datos declarados de observaciones verificadas; la disponibilidad de API sigue abierta.",
    risks: ["La evidencia consultada es del proveedor; no se encontró validación independiente en estas fuentes.", "El testimonio local no acredita escala instalada ni soporte contratado en Uruguay.", "Precio inicial y funcionamiento sin conexión requieren confirmación comercial y prueba operativa."],
    questions: ["¿Gestiona animales individuales por caravana SNIG o sólo lotes, y puede importar lecturas y pesajes?", "¿Ofrece API o webhooks para adjuntar eventos originales sin perder identificadores y procedencia?", "¿Qué puede hacer el operario sin señal y cómo se resuelven duplicados, errores de interpretación y correcciones?", "¿Conserva autor, hora original e historial de cambios de cada registro?", "¿Cuál es el costo para el establecimiento objetivo, incluidos usuarios, soporte e integraciones en Uruguay?"],
    refs: ["fielddata","fielddataLanding","fielddataTerms"],
  },
];

const groupInfo = {
  direct: { order: 1, label: "Competidores directos o cercanos", short: "Directos", desc: "Ya resuelven peso/conteo automático en campo y reducen el manejo." },
  substitute: { order: 2, label: "Sustitutos actuales", short: "Sustitutos", desc: "Resuelven hoy identidad y peso con manga, balanza y operación local." },
  similar: { order: 3, label: "Productos y servicios similares", short: "Similares", desc: "Gestionan identidad, historia, lotes y decisiones; pueden recibir o absorber el evento." },
  evolution: { order: 4, label: "Productos que pueden evolucionar", short: "Evolutivos", desc: "Poseen visión, ubicación, procedencia o financiación y pueden converger." },
};

function esc(value) {
  return String(value).replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
}

function sourceLink(key) {
  const [label, url] = sources[key];
  return `<a href="${url}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

function nav(active = "mercado", prefix = "") {
  const links = [
    ["fondos", "fondos.html", "Fondos"],
    ["feedlot", "feedlot.html", "Feedlot"],
    ["mercado", "mercado.html", "Mercado"],
    ["analisis", "analisis.html", "Análisis"],
    ["tecnologia", "tecnologia.html", "Tecnología"],
    ["supuestos", "supuestos.html", "Supuestos"],
    ["preguntas", "preguntas.html", "Preguntas"],
  ];
  return `<header class="topbar"><div class="topbar__inner"><a class="brand" href="${prefix}index.html"><span class="brand__mark">UY</span><span class="brand__text">Ganadería aumentada</span></a><nav class="nav" aria-label="Documentos">${links.map(([id, href, label]) => `<a href="${prefix}${href}"${id === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav></div></header>`;
}

function footer(prefix = "", updated = false) {
  return `<footer class="footer">Dossier vivo · versión ${updated ? "0.7 · actualización parcial 6 sep 2026" : "0.6 · corte 23 ago 2026"} · dos vías separadas · <a href="${prefix}supuestos-mercado.html">supuestos de mercado</a> · <a href="${prefix}preguntas-mercado.html">preguntas de diligencia</a></footer>`;
}

function head(title, description, css = "styles.css") {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(description)}"><title>${esc(title)}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="${css}"></head><body>`;
}

function capCell(cap) {
  const [grade, text] = cap;
  const symbol = grade === "yes" ? "●" : grade === "partial" ? "◐" : grade === "no" ? "○" : "?";
  return `<span class="cap cap--${grade}" title="${esc(text)}"><span aria-hidden="true">${symbol}</span><span>${esc(text)}</span></span>`;
}

function itemPage(item) {
  const sourceList = item.refs.map(key => {
    const [label, url, note] = sources[key];
    return `<li><a href="${url}" target="_blank" rel="noopener">${esc(label)}</a><span>${esc(note)}</span></li>`;
  }).join("");
  return `${head(`${item.name} · Mapa competitivo`, item.thesis, "../styles.css")}${nav("mercado", "../")}
  <main>
    <section class="hero hero--compact">
      <div><p class="breadcrumbs"><a href="../mercado.html">Mapa competitivo</a> / ${esc(item.groupLabel)}</p><p class="eyebrow">Ficha ${item.n} · ${esc(item.groupLabel)}</p><h1>${esc(item.name)}</h1><p class="lede">${esc(item.thesis)}</p></div>
      <aside class="meta-card"><dl><dt>Origen</dt><dd>${esc(item.origin)}</dd><dt>Madurez</dt><dd>${esc(item.maturity)}</dd><dt>Acción</dt><dd>${esc(item.action)}</dd><dt>Corte</dt><dd>${esc(item.date || "23 ago 2026")}</dd></dl></aside>
    </section>
    <div class="layout">
      <aside class="toc"><strong>En esta ficha</strong><a href="#lectura">Lectura</a><a href="#evidencia">Evidencia</a><a href="#capacidades">Capacidades</a><a href="#estrategia">Estrategia</a><a href="#diligencia">Diligencia</a><a href="#fuentes">Fuentes</a></aside>
      <article class="content">
        <section class="section" id="lectura"><p class="eyebrow">Lectura ejecutiva</p><h2>Por qué importa</h2><div class="grid grid--2"><div class="card card--strong"><h3>Superposición</h3><p>${esc(item.overlap)}</p></div><div class="card card--warm"><h3>Brecha frente al producto</h3><p>${esc(item.gap)}</p></div></div></section>
        <section class="section" id="evidencia"><p class="eyebrow">Hechos antes que puntajes</p><h2>Qué está públicamente respaldado</h2><div class="evidence-list">${item.evidence.map(([level, claim, ref]) => `<div class="evidence"><span class="tag ${level === "Investigación" || level === "Oficial" || level === "Validación" ? "tag--verified" : "tag--vendor"}">${esc(level)}</span><p>${esc(claim)} <span class="source-inline">${sourceLink(ref)}</span></p></div>`).join("")}</div><div class="callout"><strong>Regla de lectura:</strong> “no publicado” no significa inexistente. Señala una función que debe verificarse en demo, contrato o prueba local antes de decidir.</div></section>
        <section class="section" id="capacidades"><p class="eyebrow">Comparación con el norte del proyecto</p><h2>Capacidades observables</h2><div class="cap-grid">${dimensions.map(([key,label]) => `<div class="cap-row"><span>${esc(label)}</span>${capCell(item.caps[key])}</div>`).join("")}</div></section>
        <section class="section" id="estrategia"><p class="eyebrow">Implicación</p><h2>Qué haría ahora</h2><div class="callout callout--warning"><strong>${esc(item.action)}.</strong> ${esc(item.strategy)}</div><h3>Riesgos y límites</h3><ul>${item.risks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>
        <section class="section" id="diligencia"><p class="eyebrow">Próximo contacto o prueba</p><h2>Preguntas que pueden cambiar la conclusión</h2><ol>${item.questions.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><p><a class="button-link" href="../preguntas-mercado.html">Ver guion completo de diligencia →</a></p></section>
        <section class="section" id="fuentes"><p class="eyebrow">Trazabilidad del análisis</p><h2>Fuentes consultadas</h2><ul class="source-list">${sourceList}</ul><p class="muted">Las fuentes fueron consultadas al ${esc(item.sourceDate || "23 de agosto de 2026")}. Las páginas de proveedor respaldan lo que el proveedor publica; no se tratan como validación independiente.</p></section>
        <nav class="prev-next" aria-label="Fichas adyacentes">${item.n !== "01" ? `<a href="${items[Number(item.n)-2].slug}.html">← ${esc(items[Number(item.n)-2].name)}</a>` : "<span></span>"}${item.n !== String(items.length).padStart(2,"0") ? `<a href="${items[Number(item.n)].slug}.html">${esc(items[Number(item.n)].name)} →</a>` : `<a href="../mercado.html">Volver al mapa →</a>`}</nav>
      </article>
    </div>
  </main>${footer("../", Boolean(item.date))}</body></html>`;
}

function marketPage() {
  const score = grade => grade === "yes" ? "●" : grade === "partial" ? "◐" : grade === "no" ? "○" : "?";
  const rows = items.map(item => `<tr><td><a href="items/${item.slug}.html"><strong>${esc(item.name)}</strong></a><br><span class="muted small">${esc(groupInfo[item.group].short)}</span></td>${["count","identity","weight","location","visual","provenance","offline","uruguay"].map(k=>`<td class="matrix matrix--${item.caps[k][0]}" title="${esc(item.caps[k][1])}">${score(item.caps[k][0])}</td>`).join("")}<td>${esc(item.action)}</td></tr>`).join("");
  const groups = Object.entries(groupInfo).sort((a,b)=>a[1].order-b[1].order).map(([key,g]) => `<section class="section" id="${key}"><p class="eyebrow">0${g.order} · ${esc(g.short)}</p><h2>${esc(g.label)}</h2><p class="section-intro">${esc(g.desc)}</p><div class="grid grid--3 dossier-grid">${items.filter(i=>i.group===key).map(i=>`<a class="doc-link" href="items/${i.slug}.html"><span class="number">${i.n}</span><span class="tag ${key === "direct" ? "tag--open" : key === "substitute" ? "tag--vendor" : key === "evolution" ? "tag--inference" : "tag--verified"}">${esc(i.groupLabel)}</span><h3>${esc(i.name)}</h3><p>${esc(i.thesis)}</p><span>${esc(i.action)} →</span></a>`).join("")}</div></section>`).join("");
  return `${head("Mapa competitivo · Ganadería aumentada", "Competidores, sustitutos, similares y candidatos de convergencia para Ganadería aumentada.")}${nav("mercado")}
  <main><div class="callout"><strong>POC Mini 4K · 7 sep 2026:</strong> electricidad permanente e internet por Starlink garantizados. Se recomienda procesamiento en nube; las alternativas offline de este dossier corresponden a otros despliegues. <a href="supuestos.html#s06">Ver supuesto actualizado</a>.</div>
    <section class="hero"><div><p class="eyebrow">Documento 04 · Mercado</p><h1>La competencia viene por piezas.</h1><p class="lede">Dieciocho fichas separan captura de peso, gestión, ubicación y confianza. El hueco no es “otra balanza”: es un evento RFID–foto–peso–ubicación cuya procedencia pueda defenderse. Los pesos relativos cambian según la vía: leer en paralelo <a href="fondos.html">fondos</a> y <a href="feedlot.html">feedlot</a>.</p></div><aside class="meta-card"><dl><dt>Versión</dt><dd>0.7</dd><dt>Ítems</dt><dd>${items.length}</dd><dt>Geografía</dt><dd>Uruguay + comparables</dd><dt>Actualización parcial</dt><dd>6 sep 2026</dd><dt>Orientación</dt><dd>Construir / integrar / aliar</dd></dl></aside></section>
    <div class="layout"><aside class="toc"><strong>Contenido</strong><a href="#respuesta">Respuesta ejecutiva</a><a href="#matriz">Matriz</a><a href="#direct">Directos</a><a href="#substitute">Sustitutos</a><a href="#similar">Similares</a><a href="#evolution">Evolutivos</a><a href="#metodo">Método</a></aside><article class="content">
      <section class="section" id="respuesta"><p class="eyebrow">Respuesta ejecutiva</p><h2>Seis decisiones que deja el mapa</h2><div class="grid grid--2">
        <div class="card card--risk"><span class="number">1</span><h3>Olho do Dono es el referente más cercano</h3><p>Publica visión 3D, conteo, peso, RFID, GPS, offline y auditoría. La diferenciación debe estar en correspondencia física y procedencia demostrables.</p></div>
        <div class="card card--warm"><span class="number">2</span><h3>El peso frecuente ya tiene mercado</h3><p>Optiweigh, Vytelle y Tru‑Test WOW resuelven RFID + tendencia con baja intervención. Optiweigh confirma a Uruguay entre sus países de operación y declara más de 500.000 animales monitoreados por mes.</p></div>
        <div class="card"><span class="number">3</span><h3>El dron domina cobertura, no identidad</h3><p>GanaderIA ofrece una ruta potente para conteo/lote, con límites de pesaje transparentes y sin enlace SNIG público. Es una startup uruguaya: compite en casa por los mismos clientes y apoyos, y en la vía de fondos es la amenaza principal.</p></div>
        <div class="card"><span class="number">4</span><h3>No construir otro ERP ganadero</h3><p>Baqueano, PGG, Finca, AgriWebb y Cattler ya cubren registro e historia. Ganadería aumentada debe ser una fuente de evidencia integrable.</p></div>
        <div class="card card--strong"><span class="number">5</span><h3>La ventaja puede estar en la prueba</h3><p>CattleProof muestra que captura, registro inalterable y verificación independiente son capas distintas; Ceres Tag muestra que la procedencia también puede anclarse en el hardware. Esa separación es clave para la vía de fondos.</p></div>
        <div class="card card--risk"><span class="number">6</span><h3>La demanda de la vía de fondos ya se manifestó</h3><p>El colapso de los fondos ganaderos uruguayos dejó un déficit de US$272 millones y ganado declarado que no existía: en un caso, contratos por ~28.000 animales frente a nueve vacunos hallados por el MGAP. Es la validación más fuerte —y más urgente— del producto de auditoría.</p></div>
      </div><div class="callout"><strong>Posicionamiento sugerido:</strong> “captura verificable de existencia, identidad, tendencia de peso y ubicación”, que cada vía lee distinto. El diferencial defendible —evidencia con procedencia— pesa sobre todo en <a href="fondos.html">fondos</a>; en <a href="feedlot.html">feedlot</a> el valor es la tendencia individual y el conjunto de datos que la respalda.</div>
      <div class="grid grid--2 companion-links"><a class="doc-link" href="supuestos-mercado.html"><span class="number">A</span><h3>Supuestos de mercado</h3><p>Qué debe ser cierto para sostener el posicionamiento.</p><span>Abrir →</span></a><a class="doc-link" href="preguntas-mercado.html"><span class="number">Q</span><h3>Preguntas de diligencia</h3><p>Guion para clientes, proveedores, bancos y pilotos.</p><span>Abrir →</span></a></div></section>
      <section class="section" id="matriz"><p class="eyebrow">Vista comparativa</p><h2>Capacidades publicadas, no promesas inferidas</h2><p class="section-intro"><span class="matrix matrix--yes">●</span> publicada · <span class="matrix matrix--partial">◐</span> parcial/indirecta · <span class="matrix matrix--no">○</span> no forma parte del producto · <span class="matrix matrix--unknown">?</span> sin evidencia pública suficiente.</p><div class="table-wrap"><table class="market-table"><thead><tr><th>Ítem</th><th>Contar</th><th>ID</th><th>Peso</th><th>Ubic.</th><th>Visual</th><th>Proced.</th><th>Offline</th><th>UY</th><th>Acción</th></tr></thead><tbody>${rows}</tbody></table></div><p class="muted small">La matriz no es un ranking de calidad. Cada símbolo abre una nota más precisa en la ficha del ítem.</p></section>
      ${groups}
      <section class="section" id="metodo"><p class="eyebrow">Método y límites</p><h2>Cómo se construyó el mapa</h2><div class="grid grid--2"><div><h3>Incluido</h3><ul><li>Documentos existentes del proyecto como input rector.</li><li>Fuentes oficiales y sitios de producto.</li><li>Validaciones independientes cuando estuvieron disponibles.</li><li>Uruguay como mercado principal y LatAm/global como señal competitiva.</li></ul></div><div><h3>No demostrado aún</h3><ul><li>Cotizaciones y contratos.</li><li>Compatibilidad real con caravanas SNIG.</li><li>Exactitud por raza/ambiente en Uruguay.</li><li>APIs, archivos crudos y controles antifraude.</li></ul></div></div><div class="callout callout--warning"><strong>Criterio de corte:</strong> se detuvo la búsqueda cuando cada familia estratégica tuvo opciones diferenciadas y las nuevas búsquedas devolvían productos redundantes o con evidencia demasiado débil. El mapa es amplio, no un censo exhaustivo.</div><div class="callout"><strong>Contexto regional:</strong> Argentina aprobó en 2025 la identificación electrónica obligatoria y la hizo exigible para terneros y terneras desde el 1 de enero de 2026. El marco admite HDX y FDX‑B bajo ISO 11784/11785. Esto acelera el ecosistema regional de dispositivos, lectores e integraciones. <a href="https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-841-2025-419696/texto" target="_blank" rel="noopener">Ver Resolución SENASA 841/2025 ↗</a></div><div class="callout"><strong>Historial del mapa:</strong> el 6 de septiembre de 2026 se incorporó FieldData como plataforma similar de gestión, con fuentes del proveedor y diligencia pendiente sobre integraciones. Las otras fichas conservan su corte del 23 de agosto de 2026. una revisión externa verificó las afirmaciones materiales contra fuentes independientes —origen uruguayo de GanaderIA, las dos tecnologías de caravana que Uruguay habilita, la presencia de Optiweigh en el país— e incorporó las fichas de Ceres Tag y Cattler. El reencuadre posterior separó el mapa en dos vías con competencias distintas: <a href="fondos.html">fondos ganaderos</a> y <a href="feedlot.html">feedlot</a>.</div><p>Volver al <a href="analisis.html">análisis técnico</a>, revisar los <a href="supuestos.html">supuestos originales</a> o responder las <a href="preguntas.html">preguntas del producto</a>.</p></section>
    </article></div>
  </main>${footer("", true)}</body></html>`;
}

const marketAssumptions = [
  ["M01","Crítico","El diferencial defendible no será la estimación de peso por sí sola.","Olho do Dono, Optiweigh, Vytelle, Tru‑Test WOW y GanaderIA ya ocupan esa promesa desde tecnologías distintas.","Entrevistas donde el comprador elija integridad/ahorro de manejo sobre precio o exactitud media.","Si el mercado sólo paga por kg estimados, conviene integrar o revender antes que construir una plataforma probatoria."],
  ["M02","Crítico","Un feedlot aceptará instrumentar al menos un punto natural de paso.","Los competidores continuos dependen de agua, atrayente o corredor.","Mapa de flujo y cobertura de RFID durante 14–30 días.","Si no existe paso de alta cobertura, migrar a captura dirigida o dron periódico."],
  ["M03","Crítico","La correspondencia RFID–imagen se mide con dos números separados: pureza de los eventos aceptados y tasa de aceptación.","Un error de identidad contamina historia y auditoría. Son dos métricas distintas y no deben colapsarse en un único umbral: la pureza puede acercarse a 99,9% justamente porque el sistema se abstiene, pero esa abstención tiene un costo de cobertura que debe medirse y declararse por separado; ningún proveedor del mapa publica hoy las dos métricas.","Prueba deliberada con animales juntos, doble lectura, vueltas atrás y tag ausente, reportando por separado cuántos eventos se aceptan y qué proporción de los aceptados corresponde al animal correcto.","Si la pureza no alcanza el umbral, separar peso visual de historia individual. Si la aceptación es demasiado baja, el problema ya no es de identidad sino de cobertura y costo por animal observado."],
  ["M04","Crítico","La evidencia anclada al dispositivo tiene valor económico para un tercero.","La vía de fondos sólo se justifica si reduce inspección, fraude o costo de capital. El colapso de los fondos ganaderos uruguayos —déficit de US$272 millones, unas 7.000 personas afectadas y ganado declarado que no existía— muestra que el mercado ya pagó el precio de no tener verificación independiente de existencias. Es evidencia de problema, todavía no de disposición a pagar.","Entrevistas con bancos, fondos, fiduciarios, auditores y damnificados usando un paquete de muestra, más el seguimiento de la nueva regulación del BCU.","Si no cambia ninguna decisión, mantener el producto sólo como herramienta productiva."],
  ["M05","Alto","Los sistemas de gestión existentes aceptarán eventos externos o exportaciones interoperables.","Baqueano, Finca, PGG y AgriWebb ya ocupan la ficha del animal.","Prueba de importación/API con al menos dos plataformas.","Si son cerrados, priorizar exportación estándar y una consulta mínima propia."],
  ["M06","Alto","La captura y el procesamiento conservan orden e integridad con la infraestructura acordada.","El POC tiene electricidad e internet por Starlink; offline queda como capacidad para otros despliegues.","Medir subida, tiempo total, costo y reanudación sin duplicados ni pérdida de evidencia.","Si el costo o la latencia no cumplen, ajustar tamaño de entrada, cómputo o evaluar procesamiento local."],
  ["M07","Medio","La mayoría de caravanas SNIG objetivo es legible en el punto de captura, en las dos tecnologías habilitadas.","Todas las rutas individuales dependen de identidad electrónica útil. Uruguay habilita HDX y FDX‑B bajo ISO 11784/11785, de modo que un rodeo real puede mezclar ambas y el lector debe soportar las dos; preguntar sólo por HDX es insuficiente.","Medir tasa de lectura por categoría, dispositivo, tecnología del tag y geometría.","Diseñar excepción visual/manual y costo explícito de reidentificación."],
  ["M08","Medio","El peso frecuente cambia al menos una decisión antes de la balanza siguiente.","Frecuencia sin acción sólo crea datos.","Registrar decisiones reales sobre alimentación, venta, apartes y sanidad.","Reducir frecuencia o vender servicio de campaña en vez de monitoreo continuo."],
  ["M09","Alto","Los proveedores globales no ofrecen ya el paquete completo y soportado en Uruguay.","Optiweigh confirma a Uruguay entre sus países de operación en dos páginas propias y la prensa sectorial reporta más de 1.000 unidades entregadas; Datamars tiene representación de marca. La presencia extranjera es firme, aunque ninguno publica el paquete con evidencia visual y procedencia.","Diligencia comercial con Olho do Dono, Optiweigh, Datamars y Vytelle, pidiendo unidades instaladas, clientes y soporte reales en el país.","Si existe oferta completa, diferenciar por servicio/auditoría o asociarse."],
  ["M10","Medio","Es posible conservar archivos originales sin costo/latencia prohibitiva.","La prueba visual pierde fuerza si sólo quedan scores o imágenes comprimidas sin origen.","Dimensionar almacenamiento, conectividad y retención por 5.000 cabezas.","Definir muestreo, compresión verificable o almacenamiento por excepción."],
  ["M11","Medio","Un mismo modelo de evento sirve a feedlot y auditoría aunque cambie el hardware.","Las dos vías comparten plataforma y contrato de evento; si divergieran, cada una debería pagar su propio desarrollo.","Mapear campos obligatorios y decisiones de ambos contextos.","Separar productos y contratos si los estándares probatorios divergen demasiado."],
  ["M12","Bajo","El mercado preferirá un proveedor independiente al software del establecimiento.","La confianza financiera puede requerir separación de roles.","Comparar aceptación de dato del productor, del dispositivo y de un auditor externo.","Ofrecer infraestructura al productor y certificación por tercero en vez de operar todo."],
  ["M13","Crítico","La ventana de la vía de fondos está abierta ahora y puede cerrarse sola.","El BCU advirtió desde 2022 sobre estos esquemas, redactó cambios regulatorios en 2025 para ampliar la supervisión sobre la captación masiva de recursos y hoy hay fiscalías, fiduciarios y damnificados buscando cómo verificar existencias. Si el estándar probatorio lo termina fijando el regulador o un competidor, llegar después vale mucho menos que llegar temprano a esa conversación. Es la razón por la que la vía de fondos es hoy la prioridad comercial.","Entrevistar al regulador, a fiduciarios y a auditores mientras se ejecuta el descubrimiento de feedlot, no después; seguir el texto de la nueva normativa.","Si la regulación fija un mínimo que no requiere evidencia técnica, o si la ventana se cierra, la vía de fondos vuelve a ser una apuesta de largo plazo y el feedlot debe sostener el negocio por sí solo."],
];

function assumptionsPage() {
  const rows = marketAssumptions.map(([id,pri,title,why,test,ifFalse])=>`<article class="assumption" id="${id.toLowerCase()}"><div class="assumption__head"><div><span class="assumption__id">${id} · ${esc(pri)}</span><h3>${esc(title)}</h3></div><span class="tag ${pri === "Crítico" ? "tag--open" : pri === "Alto" ? "tag--vendor" : "tag--inference"}">${esc(pri)}</span></div><p>${esc(why)}</p><dl class="detail-grid"><div><dt>Cómo probar</dt><dd>${esc(test)}</dd></div><div><dt>Si es falso</dt><dd>${esc(ifFalse)}</dd></div><div><dt>Vínculo</dt><dd><a href="mercado.html">Mapa competitivo</a> · <a href="supuestos.html">registro original</a></dd></div></dl></article>`).join("");
  return `${head("Supuestos de mercado · Ganadería aumentada", "Supuestos que sostienen el mapa competitivo y su posicionamiento.")}${nav("mercado")}<main><div class="callout"><strong>POC Mini 4K · 7 sep 2026:</strong> electricidad permanente e internet por Starlink garantizados. Se recomienda procesamiento en nube; las alternativas offline de este dossier corresponden a otros despliegues. <a href="supuestos.html#s06">Ver supuesto actualizado</a>.</div><section class="hero hero--compact"><div><p class="breadcrumbs"><a href="mercado.html">Mapa competitivo</a> / Supuestos</p><p class="eyebrow">Documento M‑A · Supuestos</p><h1>El posicionamiento también es una hipótesis.</h1><p class="lede">Trece afirmaciones que conectan el mapa competitivo con decisiones de producto. Cada una declara cómo probarla y qué cambiar si resulta falsa.</p></div><aside class="meta-card"><dl><dt>Supuestos</dt><dd>13</dd><dt>Críticos</dt><dd>5</dd><dt>Versión</dt><dd>0.7</dd><dt>Actualización operativa</dt><dd>7 sep 2026</dd><dt>Documento base</dt><dd><a href="supuestos.html">S01–S28</a></dd></dl></aside></section><div class="layout"><aside class="toc"><strong>Prioridad</strong><a href="#m01">M01 · Diferencial</a><a href="#m02">M02 · Paso</a><a href="#m03">M03 · Correspondencia</a><a href="#m04">M04 · Valor probatorio</a><a href="#m09">M09 · Oferta local</a><a href="#m13">M13 · Ventana</a></aside><article class="content"><section class="section"><div class="callout"><strong>Uso:</strong> no aprobar un roadmap porque “parece razonable”. Convertir cada supuesto crítico en entrevista, dato o prueba y registrar la respuesta en esta misma colección.</div>${rows}</section></article></div></main>${footer().replace("Dossier vivo · versión 0.6 · corte 23 ago 2026", "Supuestos de mercado v0.7 · revisión operativa 7 sep 2026 · corte de mercado 23 ago 2026")}</body></html>`;
}

const marketQuestions = [
  ["MQ01","P0 · Comprador","¿Qué decisión cambia si recibe RFID, imagen, peso, ubicación y procedencia en un mismo evento?","Productor, gerente de feedlot, fondo, banco","Evita vender evidencia que nadie usa."],
  ["MQ02","P0 · Disposición a pagar","¿Cuánto cuesta hoy pesar, contar y auditar, incluida la pérdida de performance y coordinación?","Feedlot y auditor","Fija un techo económico real."],
  ["MQ03","P0 · Evidencia","¿Qué campos y controles mínimos vuelven aceptable un informe ante un financiador?","Riesgo, legal, fiduciario","Define el producto de auditoría."],
  ["MQ04","P0 · Cobertura","¿Qué porcentaje del rodeo debe observarse y en qué ventana para tomar cada decisión?","Usuario de la decisión","Separa tendencia, inventario y auditoría."],
  ["MQ05","P0 · Error","¿Qué error de peso y qué tasa de identidad incorrecta tolera cada uso?","Productor, nutricionista, auditor","Evita una precisión promedio sin contexto."],
  ["MQ06","P0 · Flujo","¿Dónde pasan los animales y cuál es la tasa de lectura RFID real?","Personal de campo","Decide cámara fija, WoW, captura dirigida o dron."],
  ["MQ07","P0 · Mercado","¿Qué oferta concreta, soporte y precio tienen Optiweigh, Olho do Dono y Datamars en Uruguay?","Proveedores","Puede cambiar construir por integrar."],
  ["MQ08","P0 · Integración","¿Qué plataformas ya usa el establecimiento y qué formatos/API aceptan?","Administrador y proveedores","Evita duplicar el ERP."],
  ["MQ09","P1 · Procedencia","¿Cómo demuestra el dispositivo que el archivo es reciente, original y capturado allí?","Seguridad, auditor","Define firmware, firma y almacenamiento."],
  ["MQ10","P1 · Ataques","¿Qué ocurre ante replay, edición, reloj falso, GPS simulado o sustitución de animal?","Equipo técnico y auditor","Convierte antifraude en casos de prueba."],
  ["MQ11","P1 · Excepciones","¿Cómo trata dos animales, dos RFID, tag ausente, vuelta atrás y captura incompleta?","Proveedor y piloto","Mide abstención y recuperación."],
  ["MQ12","P1 · Datos","¿Se exportan lecturas crudas, descartes, imágenes originales, modelos y confianza?","Proveedor","Mide portabilidad y auditabilidad."],
  ["MQ13","P1 · Operación","¿Quién limpia, calibra, carga, repara y responde cuando el sistema no observa?","Encargado","Hace visible el costo total."],
  ["MQ14","P1 · Offline","¿Qué pasa con duplicados y conflictos después de días sin red?","Proveedor y usuario","Valida la realidad rural."],
  ["MQ15","P1 · Sesgo","¿Qué animales quedan fuera de la muestra y por qué?","Analista y encargado","Evita confundir observación con inventario."],
  ["MQ16","P1 · Contrato","¿Quién responde si un dato incorrecto genera pérdida productiva o financiera?","Legal y proveedor","Alinea garantías y usos permitidos."],
  ["MQ17","Proveedor","¿Acepta una prueba ciega, preacordada y con resultados por subgrupo en Uruguay?","Todos los proveedores","Separa demo de evidencia."],
  ["MQ18","Proveedor","¿Qué compatibilidad certifica con ISO 11784/11785 en HDX y en FDX‑B, y con caravanas SNIG reales de ambas tecnologías?","Proveedor de hardware","Uruguay habilita las dos tecnologías: preguntar sólo por HDX deja fuera parte del rodeo y hace inferir compatibilidad por frecuencia."],
  ["MQ19","Proveedor","¿Cuál es el costo total a 3 años por 1.000 y 5.000 cabezas?","Ventas y soporte","Permite comparar hardware, servicio y nube."],
  ["MQ20","Proveedor","¿Qué parte del sistema depende del proveedor para seguir funcionando y auditar el pasado?","Producto/IT","Mide lock-in y continuidad."],
  ["MQ21","Piloto","¿Qué resultado obliga a avanzar, integrar, repetir o detener?","Equipo del proyecto","Evita pilotos sin decisión."],
  ["MQ22","Piloto","¿Cuál es la verdad de referencia y cuán cerca en tiempo debe capturarse?","Técnico y analista","Evita comparar magnitudes distintas."],
  ["MQ23","Piloto","¿Qué razas, pesos, barro, luz y densidades deben estar representados?","Veterinario y analista","Expone fallas por subgrupo."],
  ["MQ24","Piloto","¿Puede el personal ejecutar el flujo sin el equipo desarrollador?","Encargado","Valida producto, no prototipo asistido."],
  ["MQ25","P0 · Regulación","¿Qué verificación de existencias exigirá la nueva supervisión del BCU sobre la captación de fondos ganaderos, y quién deberá firmarla?","BCU, asesores legales, fiduciarios y auditores","Si el estándar probatorio lo fija la regulación, conviene estar en esa conversación antes de que se cierre; también define si el comprador del informe es el fondo, el fiduciario o el propio regulador."],
  ["MQ26","P1 · Caso real","En el colapso de los fondos ganaderos, ¿qué control habría detectado el faltante y en qué momento del ciclo?","Síndicos, fiduciarios, auditores y damnificados","Convierte un fraude documentado —contratos por miles de animales frente a un puñado hallado en el lugar declarado— en casos de prueba concretos para el paquete de evidencia."],
];

function questionsPage() {
  const rows = marketQuestions.map(([id,pri,q,who,why])=>`<article class="question" id="${id.toLowerCase()}"><div class="question__head"><div><span class="question__id">${id} · ${esc(pri)}</span><h3>${esc(q)}</h3></div><span class="tag ${pri.startsWith("P0") ? "tag--open" : pri === "Proveedor" ? "tag--vendor" : "tag--inference"}">${esc(pri.split(" · ")[0])}</span></div><dl class="detail-grid"><div><dt>Preguntar a</dt><dd>${esc(who)}</dd></div><div><dt>Por qué importa</dt><dd>${esc(why)}</dd></div><div><dt>Registrar</dt><dd>Respuesta, evidencia, responsable y fecha.</dd></div></dl></article>`).join("");
  return `${head("Preguntas de mercado · Ganadería aumentada", "Preguntas para mejorar el análisis competitivo y diseñar diligencia y pilotos.")}${nav("mercado")}<main><div class="callout"><strong>POC Mini 4K · 7 sep 2026:</strong> electricidad permanente e internet por Starlink garantizados. Se recomienda procesamiento en nube; las alternativas offline de este dossier corresponden a otros despliegues. <a href="supuestos.html#s06">Ver supuesto actualizado</a>.</div><section class="hero hero--compact"><div><p class="breadcrumbs"><a href="mercado.html">Mapa competitivo</a> / Preguntas</p><p class="eyebrow">Documento M‑Q · Preguntas</p><h1>Preguntar lo que cambia la decisión.</h1><p class="lede">Veintiséis preguntas para clientes, proveedores, financiadores, reguladores y pilotos. Priorizan evidencia, interoperabilidad y costo total por encima de la demo.</p></div><aside class="meta-card"><dl><dt>Preguntas</dt><dd>26</dd><dt>P0</dt><dd>9</dd><dt>Proveedor</dt><dd>4</dd><dt>Versión</dt><dd>0.6</dd><dt>Fecha</dt><dd>23 ago 2026</dd></dl></aside></section><div class="layout"><aside class="toc"><strong>Bloques</strong><a href="#mq01">Comprador y mercado</a><a href="#mq09">Procedencia</a><a href="#mq17">Proveedor</a><a href="#mq21">Piloto</a><a href="#mq25">Regulación y caso real</a><a href="preguntas.html">Preguntas originales</a></aside><article class="content"><section class="section"><div class="callout"><strong>Regla de diligencia:</strong> pedir archivos, muestras, contratos o una prueba observable. Una respuesta comercial sin evidencia queda marcada como hipótesis.</div>${rows}</section></article></div></main>${footer()}</body></html>`;
}

await mkdir(itemsDir, { recursive: true });
await Promise.all(items.map(item => writeFile(join(itemsDir, `${item.slug}.html`), itemPage(item), "utf8")));
await Promise.all([
  writeFile(join(root, "mercado.html"), marketPage(), "utf8"),
  writeFile(join(root, "supuestos-mercado.html"), assumptionsPage(), "utf8"),
  writeFile(join(root, "preguntas-mercado.html"), questionsPage(), "utf8"),
]);

console.log(`Generados ${items.length + 3} documentos HTML.`);
