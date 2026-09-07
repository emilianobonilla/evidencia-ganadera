# Ganadería aumentada

Dossier de investigación sobre conteo, identificación, estimación de peso, ubicación y evidencia visual de ganado, con foco en Uruguay y la trazabilidad individual del SNIG.

El proyecto explora dos aplicaciones: la verificación de existencias para fondos y fideicomisos ganaderos, y el monitoreo productivo en feedlots. Este repositorio contiene el sitio estático de investigación, sus fuentes y scripts de generación de páginas.

## Sitio publicado

El dossier público está disponible en [GitHub Pages](https://emilianobonilla.github.io/evidencia-ganadera/).

## Contenido

- **Fondos y feedlot:** casos de uso, prioridades y preguntas de negocio.
- **Mercado:** comparación de soluciones y fichas de productos y proveedores.
- **Tecnología:** arquitectura propuesta y análisis técnico.
- **Supuestos y preguntas:** hipótesis pendientes y temas para validar en campo.
- **POC con DJI Mini 4K:** [lista de especificaciones](specs/README.md) para contar bovinos en corral o grupo reunido y validar el resultado, estructuradas siguiendo spec-kit. Electricidad e internet por Starlink garantizados (7 sep 2026); consultar [arquitectura en nube y Mac mini](specs/arquitectura-recomendada.md) y [revisión documental](specs/revision-documental.md).

## Estructura

```text
research/                  Sitio público HTML y CSS
  index.html               Página de inicio
  items/                   Fichas de productos y proveedores
  report-source.md         Informe de investigación en Markdown
  _generar-*.mjs           Generadores de páginas
  _validar-mercado.mjs     Validador del sitio público
research-tech/             Documentación técnica adicional
specs/                     Especificaciones del POC de conteo con DJI Mini 4K
.specify/memory/            Principios propuestos para el POC
.github/workflows/         Publicación en GitHub Pages
AGENTS.md                  Guía de contribución
```

## Ver el sitio localmente

Se necesita Python 3 para el servidor local y Node.js para los scripts. No hay dependencias npm ni un paso de compilación.

Desde la raíz de este repositorio:

```sh
python3 -m http.server 8000 --directory research
```

Abrir [localhost:8000](http://localhost:8000). Para consultar también `research-tech/`, servir la raíz con `python3 -m http.server 8000` y navegar a `/research/` o a un archivo HTML de `/research-tech/`.

## Validar y regenerar páginas

```sh
node research/_validar-mercado.mjs
```

El validador revisa metadatos HTML, IDs duplicados, enlaces locales, destinos de anclas y la cantidad esperada de fichas. Solo cubre `research/`; no comprueba enlaces externos ni el diseño visual.

Para regenerar las páginas correspondientes:

```sh
node research/_generar-mercado.mjs
node research/_generar-enfoques.mjs
```

Los generadores sobrescriben archivos HTML. Revisar sus destinos antes de ejecutarlos, inspeccionar los cambios y volver a validar. Comprobar manualmente la navegación y el diseño en pantallas de escritorio y móviles.

## Publicación

El workflow `deploy-pages.yml` publica el directorio `research/` en GitHub Pages al recibir cambios en `main` o mediante ejecución manual. `research-tech/` queda fuera de esa publicación.

## Contribuir

Consultar [AGENTS.md](AGENTS.md). Mantener el contenido en español, incluir fuentes para las afirmaciones y distinguir declaraciones comerciales de validación independiente. Actualizar los generadores cuando se modifique contenido generado y mantener fechas y versiones coherentes.
