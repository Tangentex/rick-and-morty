# Instrucciones de Ejecución

## Pasos para ejecutar el proyecto

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en modo desarrollo:**
```bash
ng serve
```
Luego abrir el navegador en: http://localhost:4200

3. **Ejecutar las pruebas:**
```bash
ng test
```

4. **Compilar para producción:**
```bash
ng build
```

## Estructura del Proyecto

```
src/app/
├── components/           # Componentes de la aplicación
│   ├── character-list/   # Lista de personajes con filtros
│   ├── character-detail/ # Detalles del personaje
│   ├── character-stats/  # Estadísticas por species y type
│   └── favorites/        # Sistema de favoritos
├── models/              # Interfaces y modelos
│   ├── character.model.ts
│   ├── location.model.ts
│   └── episode.model.ts
├── services/            # Servicios
│   ├── rick-morty.service.ts    # Servicio API
│   └── favorites.service.ts     # Servicio favoritos
└── app.component.*      # Componente principal
```

## Funcionalidades Implementadas

✅ Listado de personajes con paginación
✅ Filtro por nombre (búsqueda con texto)
✅ Filtro por estado (alive, dead, unknown)
✅ Vista de detalles completos
✅ Sistema de favoritos con persistencia
✅ Estadísticas por especie y tipo
✅ Diseño responsive
✅ Pruebas unitarias

## Tecnologías Usadas

- Angular 17
- Tailwind CSS
- RxJS
- TypeScript
- Jasmine/Karma

## Commits realizados

Todos los commits fueron hechos en español simulando el trabajo de un desarrollador junior:

1. inicializar proyecto angular
2. agregar tailwind css
3. crear modelos y servicio para la api
4. implementar componente de lista de personajes con filtros
5. agregar componente de detalles del personaje
6. crear componente de favoritos y servicio
7. agregar componente de estadisticas
8. integrar todos los componentes en la aplicacion principal
9. agregar pruebas unitarias para servicios
10. agregar pruebas unitarias para componente de estadisticas
11. actualizar readme con documentacion del proyecto
12. corregir tests del app component

