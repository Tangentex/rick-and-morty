# Rick and Morty App

Aplicación Angular para explorar personajes del universo de Rick and Morty usando la API oficial.

## Características

- ✅ Listado de personajes con paginación
- ✅ Filtros por nombre y estado
- ✅ Detalles completos del personaje (origen, localización, episodios)
- ✅ Sistema de favoritos con localStorage
- ✅ Estadísticas por especie y tipo
- ✅ Diseño responsive con Tailwind CSS
- ✅ Pruebas unitarias

## Tecnologías

- Angular 17
- Tailwind CSS
- RxJS
- TypeScript
- Jasmine/Karma para testing

## Instalación

```bash
npm install
```

## Ejecutar

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Testing

```bash
ng test
```

## API

Esta aplicación usa la API pública de Rick and Morty:
https://rickandmortyapi.com

## Requerimientos Implementados

### Requerimiento 1: Lista de personajes con filtros ✅
- Tabla con name, status, species, type, gender y created
- Filtro por nombre (búsqueda de texto)
- Filtro por estado (alive, dead, unknown)
- Optimización con debounceTime y distinctUntilChanged

### Requerimiento 2: Detalles del personaje ✅
- Imagen del personaje
- Información de origen con un residente
- Información de localización con un residente
- Información de un episodio

### Requerimiento 3: Sistema de favoritos ✅
- Marcar personajes como favoritos
- Mostrar nombres en la parte superior
- Ver información básica al hacer click

### Requerimiento 4: Totales ✅
- Totales por species
- Totales por type

## Características Técnicas

- Componentes standalone
- Comunicación entre componentes con @Input/@Output
- Gestión de subscripciones (unsubscribe en ngOnDestroy)
- Operadores RxJS para optimización (debounceTime, distinctUntilChanged, switchMap)
- LocalStorage para persistencia de favoritos
- Diseño responsive con Tailwind CSS

## Autor

Victor Ocampo
