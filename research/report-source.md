# Mapa competitivo para Ganadería aumentada

**Audiencia:** equipo fundador y de producto  
**Versión:** 0.7 — actualización operativa del POC, 7 sep 2026; se conserva el corte de investigación de mercado
**Fecha de corte:** 23 de agosto de 2026  
**Geografía primaria:** Uruguay  
**Geografía secundaria:** América Latina y soluciones globales aplicables a bovinos de carne/feedlot  
**Decisión que apoya:** qué construir, integrar, comprar, asociar o vigilar.

## Alcance tomado del proyecto

Este informe usa como fuente de verdad interna `index.html`, `analisis.html`, `tecnologia.html`, `supuestos.html` y `preguntas.html`. El producto investigado no es una balanza aislada: busca unir conteo, identificación oficial, tendencia de peso, ubicación y evidencia visual en un evento auditable. El proyecto se organiza en dos vías documentadas por separado en `fondos.html` y `feedlot.html`: la verificación de existencias para fondos y fideicomisos es la prioridad comercial, y el feedlot aporta ingreso recurrente y el banco de pruebas técnico. Para el POC de conteo con Mini 4K, el usuario garantiza electricidad mediante baterías, generador o red e internet mediante Starlink (7 sep 2026): se recomienda procesamiento en nube y no se exige operación offline. Los escenarios de baja conectividad se conservan como alternativas para otros despliegues. La investigación de procedencia ligada al dispositivo corresponde al producto más amplio; el POC no certifica existencias ni autentica el origen mediante un hash.

## Supuestos de investigación

1. El primer mercado es bovino uruguayo y la caravana SNIG es la clave primaria de identidad.
2. El peso estimado sirve primero para tendencia y excepciones; no se presume aptitud legal para liquidación o dosificación.
3. Una solución es “competidor directo” si resuelve automáticamente al menos identidad + peso o conteo + peso en un flujo de campo.
4. Un “sustituto” resuelve hoy la decisión con más manejo, trabajo o carga manual.
5. Un producto “evolutivo” posee una pieza escasa del sistema futuro —visión, ubicación, procedencia, plataforma o financiación— y podría entrar por expansión o alianza.
6. “No publicado” significa que no se encontró evidencia pública suficiente; no equivale a que la función no exista.
7. Las afirmaciones de exactitud de proveedores se mantienen como declaraciones comerciales salvo validación independiente explícita.

## El colapso de los fondos ganaderos

Conexión Ganadera, República Ganadera y el Grupo Larrarte son la validación de demanda más fuerte disponible para la vía de fondos, y el hecho que ordena la prioridad comercial del proyecto.

Los hechos públicos: un déficit de unos **US$272 millones** (pasivos por US$387 millones contra activos por US$115 millones), unas **7.000 personas afectadas** entre los distintos fondos, y un hallazgo central que coincide exactamente con el problema que este producto ataca: **ganado declarado que no existía físicamente**. En un caso documentado, contratos por aproximadamente 28.000 animales valuados en US$6,5 millones frente a **nueve vacunos** hallados por el MGAP en el lugar declarado. El BCU había advertido públicamente desde 2022 que estos esquemas operaban sin supervisión y en 2025 redactó cambios regulatorios para ampliar el control sobre la captación masiva de recursos; el MGAP debió salir a verificar existencias físicamente ante las denuncias.

Tres consecuencias para el proyecto:

- **El supuesto M04 deja de ser una hipótesis abstracta.** El mercado ya conoce el costo de no tener verificación independiente de existencias. Esto es evidencia de problema, no todavía de disposición a pagar: sigue siendo necesario preguntar quién compra el informe y a qué precio.
- **Define la prioridad comercial.** La ventana está abierta ahora: hay urgencia regulatoria, damnificados organizados y un regulador rediseñando la supervisión. MQ01–MQ03 y MQ25 son el descubrimiento principal del proyecto, no un anexo del piloto de feedlot.
- **El competidor de esta vía puede ser institucional antes que tecnológico.** Si el estándar probatorio lo termina fijando la regulación, participar temprano en esa definición vale más que cualquier funcionalidad.

## Los dos enfoques

Fondos y feedlot comparten el evento técnico y casi nada más. Tratarlos como una sola secuencia escondía diferencias que cambian decisiones de producto, así que cada uno tiene su documento —`fondos.html` y `feedlot.html`— y su propia economía.

| Dimensión | Fondos y fideicomisos | Feedlot |
|---|---|---|
| Quién paga | Quien absorbe la pérdida: fiduciario, banco con prenda, síndico, auditor, aseguradora | Quien paga la comida: el propio feedlot, o el corral que engorda a fasón |
| Presupuesto de origen | Auditoría, legal y riesgo | Costo operativo de alimentación |
| Qué debe probar | Existencia, no duplicación, identidad individual, lugar y fecha resistentes a repetición | Error por subgrupo, cobertura, sesgo de muestreo y una decisión que cambie |
| Rol del peso | Valuación y coherencia; tolerancia mayor, reproducibilidad obligatoria | Dosificación, aparte y venta; la exigencia de precisión más alta del proyecto |
| Método de peso | Estimación visual conservada con su original; balanza sólo si hay efecto de liquidación | Celdas de carga como verdad de referencia, con estimación visual calibrándose contra ella |
| Competencia principal | El regulador y el statu quo (escribano más extracto SNIG); GanaderIA por censo aéreo; Olho do Dono; CattleProof como modelo | Optiweigh, Vytelle, Tru‑Test WOW, Olho do Dono; Baqueano y Terko como statu quo |
| Unidad de cobro | Informe más cabeza observada, con mínimo por movilización | Cabeza bajo monitoreo por mes, o abono por encierro |
| Techo de precio | Honorario de auditoría y costo de capital | Oferta local instalada de Optiweigh y costo de una pesada manual |
| Independencia | Exigida: no se puede vender al auditado y al que audita | No exigida, salvo en operaciones a fasón |
| Hardware | Estructura transportable, sellada, con verificación previa y posterior | Corredor fijo o semipermanente con energía y balanza |

Tres consecuencias que la separación deja a la vista:

1. **La prioridad comercial es la vía de fondos.** La ventana regulatoria está abierta ahora y el estándar probatorio se está escribiendo. S21 y S02 quedaron reescritos en `supuestos.html` para reflejarlo.
2. **El feedlot no se abandona: cambia de función.** Es el único lugar donde se genera, con balanza sincronizada, el conjunto de datos por raza y categoría uruguayas que vuelve defendible la estimación visual de peso ante un tercero. Sin ese dataset, el informe de auditoría no resiste la primera repregunta. Además financia el desarrollo con ingreso recurrente.
3. **La primera medición de la vía de fondos es de mercado, no técnica.** El colapso creó la necesidad y al mismo tiempo destruyó parte de la clientela. Antes de diseñar hardware transportable hay que saber cuántos fideicomisos ganaderos siguen operando en Uruguay y con cuántas cabezas. Es la pregunta que puede cancelar la vía entera y todavía no está respondida.

Un cambio de énfasis que surge de mirar la vía de fondos sola: **GanaderIA sube de competidor lateral a amenaza frontal.** Un censo aéreo por lote responde “¿hay 28.000 o hay nueve?” más rápido y más barato que cualquier paso individual. Lo que no responde es “¿son estos animales y están en un solo contrato?”. Esa es la frontera exacta del producto en esta vía, y también el mejor argumento para explorar una alianza en vez de una competencia.

## Respuesta ejecutiva

El competidor más cercano al concepto completo es **Olho do Dono**: publica cámara 3D portátil, conteo, peso, RFID, filmación, GPS, operación sin internet y uso remoto para auditoría. La brecha estratégica del proyecto no puede ser simplemente “pesar por imagen”; debe ser correspondencia RFID–foto demostrable, procedencia resistente a manipulación, reglas de descarte y adaptación SNIG verificable.

En feedlot, la amenaza más madura no necesariamente viene de visión. **Optiweigh**, **Vytelle SENSE** y **Tru‑Test WOW** ya capturan RFID + peso frecuente con baja intervención. Optiweigh confirma a Uruguay entre sus países de operación y declara más de 500.000 animales monitoreados por mes a nivel global. Estos productos vuelven débil una propuesta basada sólo en tendencia de peso; la diferenciación debe sumar evidencia visual, conteo/existencia y cadena de custodia.

El entorno regional también acelera: Argentina aprobó en 2025 su marco de identificación electrónica obligatoria y lo hizo exigible para terneros y terneras desde el **1 de enero de 2026**. La norma admite FDX‑B y HDX bajo ISO 11784/11785. Esto amplía el mercado cercano de dispositivos, lectores e integraciones, pero también reduce la ventaja temporal de cualquier proveedor que trate la interoperabilidad EID como diferencial aislado.

**GanaderIA** domina el trabajo por lote desde dron y tiene una validación de campo mucho más transparente que la mayoría: conteo fuerte, pesaje sensible al protocolo y flujo comercial aún no validado de forma independiente. Es un posible socio o competidor para inventario periódico, pero no demuestra identidad SNIG individual. Es una startup uruguaya en operación local: el contacto es temprano, y en la vía de fondos pasa a ser la amenaza frontal, porque un censo aéreo responde la pregunta de existencia más barato que cualquier paso individual.

El ecosistema uruguayo **Baqueano / balanza / RFID**, junto con **Terko** y plataformas como **PGG**, ya resuelve buena parte del registro productivo. Construir otro sistema de gestión general sería una distracción. La oportunidad está en producir un evento probatorio que esas plataformas puedan consumir.

Las rutas de convergencia más relevantes son: **CattleEye** desde visión continua, **mOOvement** desde ubicación individual, **CattleProof** desde certificación y procedencia digital, y **Breedr** desde historia productiva + comercio/financiación. Ninguna demuestra hoy el paquete específico SNIG–foto–peso–ubicación para Uruguay.

## Recomendación de posicionamiento

- Definir el producto como **capa de captura y evidencia**, no como ERP ganadero.
- Hacer que el evento exportable sea el producto: RFID leído, imagen/video original, peso y método, tiempo, ubicación, identidad de dispositivo, confianza, excepciones y firma/hash.
- Evaluar integración o piloto comparativo antes de fabricar toda la medición: Olho do Dono, Optiweigh, Baqueano/Datamars y GanaderIA cubren piezas complementarias.
- Competir por **integridad y cobertura verificable**, no por un único porcentaje promedio de precisión.
- Separar los dos modos comerciales en documentos, presupuestos y discurso propios: auditoría de existencias para fondos y monitoreo continuo para feedlot. Comparten el contrato de evento y la plataforma; no comparten comprador, hardware, unidad de cobro ni estándar de prueba.

## Selección de ítems

### Competidores directos o cercanos

1. Olho do Dono — visión 3D, peso, conteo, RFID, GPS y auditoría declarada.
2. GanaderIA — dron, conteo y peso por lote con validación de campo 2025–2026; startup uruguaya.
3. Ganaderos (Uruguay) — estimación individual de peso desde celular; emprendimiento en ejecución.
4. Optiweigh — plataforma móvil de peso parcial + EID; presencia declarada en Uruguay.
5. Vytelle SENSE — peso parcial continuo + RFID en agua, con publicación revisada por pares.
6. Datamars Tru‑Test WOW — peso al paso + EID + nube; ecosistema con representación local de marca.

### Sustitutos actuales

7. Ecosistema Baqueano — lector RFID, balanza, app e informes con soporte uruguayo.
8. Terko TK3516L — balanza estática con RFID y memoria local; referencia concreta del manejo tradicional digitalizado.

### Productos similares / plataformas adyacentes

9. PGG — gestión uruguaya con lotes, pesaje e integración RFID.
10. Finca — plataforma regional offline y trazabilidad; validación operativa documentó beneficios y fallas de digitalización.
11. AgriWebb — gestión offline, EID, balanzas e historia individual; posible sistema receptor.
17. Cattler — gestión especializada de feedlot; receptor natural del evento en el primer segmento elegido.

### Productos que pueden evolucionar o converger

12. CattleEye — cámara continua, identificación visual, movilidad y condición corporal.
13. mOOvement — caravanas GPS solares, ubicación y alertas en ganadería extensiva.
14. CattleProof — EID, registros resistentes a alteración y programa USDA verificado.
15. Breedr — historia de peso/sanidad, EID, comercio y financiación de ganado.
16. Ceres Tag — caravana GPS solar directa a satélite con resistencia a manipulación declarada en el propio dispositivo.

## Brechas de evidencia

| Afirmación material | Evidencia | Confianza | Brecha / próxima consulta |
|---|---|---|---|
| Olho do Dono cubre la mayor parte del concepto | Sitio oficial + entrevista FDC 2025/actualizada 2026 | Media-alta | Pedir demo con caravana SNIG, archivos originales y prueba de replay. |
| Optiweigh opera en Uruguay | Páginas oficiales “Our Story” e “International”, más prensa sectorial (unidad 1.000) | Alta | Confirmar número de unidades **en el país**, clientes, soporte, lectura de tags HDX y FDX‑B y conectividad local. |
| GanaderIA logra buen conteo y pesaje condicionado | ValidAgro 2025–2026 | Alta para la prueba, no para generalización | Repetir con flujo comercial autónomo y razas/condiciones uruguayas. |
| GanaderIA es una startup uruguaya en operación local | Infonegocios 31-07-2026 y Radio Carve | Alta | Confirmar establecimientos uruguayos activos, frecuencia de uso y si buscan enlace con RFID terrestre. |
| Uruguay habilita HDX y FDX‑B, no sólo HDX | Documento técnico de INIA sobre identificación electrónica | Alta | Verificar la mezcla real de tecnologías en el rodeo objetivo y la tasa de lectura por cada una. |
| El fraude de los fondos ganaderos evidencia la demanda de verificación de existencias | Prensa nacional e internacional 2025–2026; verificaciones del MGAP | Alta para los hechos; **nula para disposición a pagar** | Entrevistar fiduciarios, bancos, síndicos y al BCU: qué evidencia aceptarían, quién la paga y qué exigirá la nueva normativa. |
| Vytelle pesa con buen acuerdo | Applied Animal Science 2021, 88 novillos | Alta en contexto del estudio | Confirmar costo, throughput, compatibilidad con HDX y FDX‑B, red y servicio regional. |
| WoW es útil para tendencia pero una lectura aislada puede fallar | JDS 2013 + estudios 2020/2021 | Alta | Definir ventana y reglas de agregación para cada decisión. |
| CattleProof aporta procedencia auditable | Listado oficial USDA PVP 2026 + proveedor | Alta para aprobación PVP; media para tecnología interna | Separar lo certificado por USDA de afirmaciones de blockchain y evaluar adaptación jurídica uruguaya. |
| Ganaderos UY estima peso con 95% de precisión | Fundación Ricaldoni/ANDE, afirmación del proyecto | Media-baja | Solicitar método, muestra, error por subgrupo, disponibilidad y retención de imágenes. |
| PGG tiene adopción e integración RFID/balanza | Sitio del proveedor | Baja-media | Verificar clientes, producto en operación, exportaciones, offline y API. |

## Historial de correcciones

Se conservan para no perder la trazabilidad del razonamiento; describen versiones anteriores del mapa, no su estado actual.

**Revisión externa (0.5).** Una verificación contra fuentes independientes cambió cinco cosas:

1. **GanaderIA es uruguaya, no argentina.** La v0.4 la clasificaba como jugador regional con despliegue local no confirmado. Es una startup uruguaya fundada por egresados de la ORT, con apoyo de ANII, que opera en Uruguay y Argentina y prueba en Australia, Nueva Zelanda y Estados Unidos. La confusión provino de que su validación pública (ValidAgro) es argentina. Consecuencia: compite en casa, por los mismos clientes, talento y apoyos institucionales.
2. **“HDX SNIG” es una simplificación incorrecta.** Uruguay habilita tanto HDX como FDX‑B bajo ISO 11784/11785. Un rodeo real puede mezclar ambas según año y proveedor de caravana, de modo que el lector propio debe soportar las dos y la diligencia con proveedores debe preguntar por ambas.
3. **La presencia de Optiweigh en Uruguay está mejor respaldada de lo que suponíamos.** Su página internacional lista a Uruguay entre los países de operación y declara más de 500.000 animales monitoreados por mes; la prensa sectorial reportó la unidad número 1.000. La confianza sube de media a alta y refuerza la tesis de que la tendencia de peso por sí sola no es diferenciable.
4. **Faltaban dos ítems en familias que el propio mapa considera estratégicas.** Ceres Tag trata la resistencia a manipulación como atributo del dispositivo —la columna donde detectamos el hueco— y Cattler es la plataforma de gestión especializada justamente en el segmento elegido primero, el feedlot.
5. **El contexto de mercado más importante estaba ausente:** el colapso de los fondos ganaderos uruguayos, hoy tratado en su propia sección.

**Separación de enfoques (0.6).** Los dos negocios dejaron de tratarse como una sola secuencia y pasaron a documentos propios, con la prioridad comercial en la vía de fondos. S21 y S02 se reescribieron en consecuencia.

## Limitaciones

El mapa verificó sus afirmaciones materiales contra fuentes independientes, pero eso no sustituye el contacto directo: no se solicitaron demos, cotizaciones, contratos, APIs ni referencias de clientes. La disponibilidad, precios, términos, precisión por raza y compatibilidad con caravanas SNIG deben verificarse directamente. Algunas cifras provienen de proveedores y se identifican como tales. La taxonomía no pretende ser un censo exhaustivo del software ganadero mundial; se detuvo la búsqueda cuando las cuatro familias estratégicas tuvieron alternativas suficientemente diferenciadas y nuevas búsquedas devolvían productos redundantes o sin evidencia verificable.

## Ledger de fuentes

| Fuente | Publicador / fecha | URL | Uso |
|---|---|---|---|
| Trazabilidad individual | SNIG, consultado 23-08-2026 | https://www.snig.gub.uy/principal/snig-principal-trazabilidad-trazabilidad-individual-prueba | Identidad oficial, 12 dígitos y contenido del RFID. |
| Olho do Dono | Proveedor, consultado 23-08-2026 | https://olhododono.agr.br/ | Producto y beneficios declarados. |
| Olho do Dono ayuda productores… | Fundação Dom Cabral, Rafael Maia, 03-04-2025; página actualizada 20-08-2026 | https://sejarelevante.fdc.org.br/olho-do-dono-ajuda-produtores-na-gestao-e-manejo-do-gado/ | Operación, RFID, GPS, offline, países y auditoría declarada. |
| GanaderIA | Proveedor, consultado 23-08-2026 | https://www.ganader-ia.com/ | Flujo, drones y métricas declaradas. |
| ValidAgro edición 2025 | ValidAgro, resultados 2025–2026 | https://www.validagro.com.ar/convocatoria2025/ | Validación de GanaderIA y Finca, límites incluidos. |
| Ganaderos | ANDE, proyecto 2023 en seguimiento | https://www.ande.org.uy/proyectos-apoyados/item/ganaderos.html | Descripción y etapa del proyecto uruguayo. |
| Emprendedores natos | Fundación Julio Ricaldoni, 02-04-2025 | https://www.ricaldoni.org.uy/noticias/845-ganaderos-inteligencia-artificial-para-pesaje-bovino.html | Equipo y precisión declarada de Ganaderos. |
| Optiweigh overview / FAQ / story | Optiweigh, consultado 23-08-2026 | https://www.optiweigh.com.au/overview/ ; https://www.optiweigh.com.au/overview/faqs/ ; https://www.optiweigh.com.au/our-story/ | Flujo, cobertura y presencia en Uruguay. |
| Vytelle SENSE | Vytelle, consultado 23-08-2026 | https://vytelle.com/vytelle-sense | Producto y caso de uso. |
| Accuracy of Vytelle SENSE IPW | Wells et al., Applied Animal Science 37(5), 2021 | https://www.sciencedirect.com/science/article/pii/S2590286521001312 | Validación independiente del peso parcial. |
| What is WOW? | Datamars, 25-09-2024 | https://support.livestock.datamars.com/en/articles/9918979-what-is-walk-over-weighing-wow | Componentes y flujo Tru-Test WOW. |
| Automated walk-over weighing | Dickinson et al., Journal of Dairy Science 96(7), 2013 | https://www.sciencedirect.com/science/article/pii/S0022030213003639 | Límites de lecturas aisladas y agregación. |
| Muñoz y Arquero | Distribuidor uruguayo, consultado 23-08-2026 | https://mya.com.uy/ | Representación local de Tru-Test/Datamars. |
| Baqueano | Proveedor uruguayo, consultado 23-08-2026 | https://www.baqueano.com.uy/ ; https://baqueano.com.uy/balanzas | Ecosistema RFID, balanza y app. |
| Terko TK3516L | Terko Uruguay, consultado 23-08-2026 | https://terko.com.uy/producto/balanza-electronica-para-ganado-tk3516l/ | Sustituto estático, funciones y precio publicado. |
| PGG | Proveedor uruguayo, consultado 23-08-2026 | https://pgg.uy/ | Funciones y adopción declarada. |
| Finca | Proveedor argentino, consultado 23-08-2026 | https://finca.com.ar/solucion-ganadera-integral/ ; https://finca.com.ar/quienes-somos/ | Offline y presencia regional. |
| AgriWebb product / mobile | AgriWebb, consultado 23-08-2026 | https://www.agriwebb.com/us/our-product/ ; https://www.agriwebb.com/mobile-app/ | Offline, EID, balanzas e historia individual. |
| CattleEye | Proveedor, consultado 23-08-2026 | https://cattleeye.com/en-gb | Cámara, IA, movilidad y condición corporal. |
| mOOvement | Proveedor, consultado 23-08-2026 | https://moovement.com/home-us | GPS, ubicación, alertas y presencia regional. |
| CattleProof | Proveedor, consultado 23-08-2026 | https://www.cattleproof.com/ | EID, ledger, auditoría y casos financieros declarados. |
| PVP Service Providers Official Listing | USDA AMS, rev. 27-02-2026 | https://www.ams.usda.gov/sites/default/files/media/Official%20Listing%20of%20Approved%20Process%20Verified%20Programs%20for%20Sevice%20Providers.pdf | Confirmación independiente de CattleProof PVP. |
| Breedr livestock app / market | Breedr, consultado 23-08-2026 | https://www.breedr.co/en/livestock-app ; https://www.breedr.co/livestock-market | EID, peso, historia, comercio y financiación. |
| Optiweigh International | Optiweigh, consultado 23-08-2026 | https://www.optiweigh.com.au/our-story/optiweigh-around-the-world/ | Países de operación, incluido Uruguay, y volumen mensual declarado. |
| Optiweigh entrega su unidad 1.000 | Beef Central | https://www.beefcentral.com/ag-tech/agtech-success-story-as-optiweigh-delivers-1000th-in-paddock-weighing-unit/ | Señal independiente de la escala del despliegue. |
| GanaderIA, startup uruguaya | Infonegocios, 31-07-2026 | https://infonegocios.biz/infoagro/ganaderia-la-startup-uruguaya-que-pesa-ganado-con-ia-prueba-su-tecnologia-en-australia-y-ee-uu | Origen, fundadores, apoyo ANII y países de operación. |
| GanaderIA, emprendimiento uruguayo | Radio Carve | https://radiocarve.uy/ganaderia-el-emprendimiento-uruguayo-que-lleva-la-balanza-al-campo-con-drones-e-inteligencia-artificial/ | Confirmación secundaria del origen. |
| Identificación electrónica en Uruguay | INIA | https://ainfo.inia.uy/digital/bitstream/item/11293/1/Brito-G..pdf | Uruguay habilita HDX y FDX‑B bajo ISO 11784/11785. |
| Advertencia sobre inversiones ganaderas no supervisadas | BCU, Comunicación 2022/025 del 03-02-2022; referencia oficial en resolución de 2025 | https://www.bcu.gub.uy/Servicios-Financieros-SSF/Resoluciones_SSF/RR-SSF-2025-38.pdf | Confirma la advertencia pública de 2022 y que Conexión Ganadera no estaba registrada ni supervisada por el BCU. |
| Anteproyecto para regular captación de ahorro por empresas productivas | BCU, 13-08-2025 | https://www.bcu.gub.uy/Comunicaciones/Paginas/Detalle-Noticia.aspx?noticia=449&title=El-BCU-present%C3%B3-el-anteproyecto-para-regular-a-las-empresas-de-giro-productivo-que-ofertan-rentabilidad-financiera | Propuesta oficial para ampliar la regulación y el control sobre la captación masiva de recursos del público. |
| Comunicado sobre inspecciones vinculadas al Grupo Larrarte | MGAP, 20-09-2024 | https://www.gub.uy/ministerio-ganaderia-agricultura-pesca/comunicacion/noticias/comunicado-mgap-grupo-larrarte | Confirma que el MGAP inspeccionó campos para constatar existencias, aclarando que no auditaba el negocio financiero. |
| La estafa ganadera de US$272 millones | Prensa Mercosur, 17-08-2026 | https://prensamercosur.org/2026/08/17/uruguay-la-estafa-ganadera-que-dejo-un-agujero-de-us272-millones-y-expuso-las-fallas-de-un-modelo-que-durante-anos-opero-fuera-del-control-financiero/ | Déficit, ganado inexistente, advertencias del BCU y reforma regulatoria. |
| Crisis de los fondos de inversión ganadera | Infobae, 27-01-2025 | https://www.infobae.com/america/america-latina/2025/01/27/crisis-de-los-fondos-de-inversion-ganadera-en-uruguay-hay-7-mil-personas-afectadas/ | Escala de damnificados. |
| El MGAP verificará existencias del Grupo Larrarte | Búsqueda | https://www.busqueda.com.uy/economia/ministerio-ganaderia-verificara-existencias-vacunos-del-grupo-larrarte-denunciado-estafa-n5393274 | El Estado debió contar ganado físicamente ante la denuncia. |
| Ceres Tag | Proveedor, consultado 23-08-2026 | https://cerestag.com/ | Caravana GPS satelital y resistencia a manipulación declarada. |
| Cattler | Proveedor, consultado 23-08-2026 | https://www.cattler.farm/en/ | Gestión operativa de feedlot. |
| Cattler en operaciones de EE.UU. | PR Newswire | https://www.prnewswire.com/news-releases/argentine-agtech-startup-cattler-is-gaining-ground-among-us-beef-cattle-operators-301966306.html | Cobertura sectorial sobre adopción. |
| Sistema Nacional de Identificación Electrónica de Animales | SENASA Argentina, Resoluciones 530/2025 y 841/2025; vigencia desde 01-01-2026 | https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-841-2025-419696/texto | Identificación electrónica obligatoria para terneros y terneras desde 2026; tecnologías y dispositivos admitidos. |
