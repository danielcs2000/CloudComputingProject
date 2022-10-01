# Proyecto Cloud Computing : Cactus Net
# Integrantes
|  **#** |  **Apellidos, Nombre** | **% Trabajo** |
| :---: | :---: | :---: |
|  1 | Rojas Cruz, Daniel Julian | 100% |
|  2 | Lazo Pampa, David Alejandro| 100% |
## Características de la aplicación
La web Cactus Net es un repositorio de especies especialmente para cactus, donde tendremos un mapa donde se pondrá la ubicación exacta, quien lo encontrado la especie del cactus.
Se puede hacer 3 tipos de filtros.
Subir, editar, eliminar y leer especies de cactus.
Administrar usuarios.
## Funcionalidad de la aplicación
Se obtendrá tres tipos de roles:
1- Lector: Buscar las especies de cactus, tiene un filtro para la busqueda de cactus, y no es necesario iniciar sección para el uso.
2- Editor: Puede subir más especies, editar los comentarios del cactus, y leer especies de cactus.
3- Administrador: Tiene la funcionalidad del editor, agregando la creación y eliminación de roles.
## Arquitectura de la aplicación
La figura muestra una aplicación un NextJS en el cual el frontend y el backend está contenido en bloque. Adicionalmente, la aplicación usa MongoDB, una base de datos no relacional que nos permite gestionar textos de manera rápida y flexible. 

![Arquitectura](https://user-images.githubusercontent.com/34191864/193142008-a9d61288-15ee-4937-aefd-fd27feaa8b93.jpg)

## Instanciar la aplicación
Para el desarrollo se utilizó la versión `16.17.1` de Node 

1. Clonar el repositorio
2. `cd web/`
3. `npm install`
4. `npm install prisma --save-dev`
5. `npx prisma generate`
6. Crear un archivo llamado `.env` y pedir al administrador las credenciales que deben ser copiadas en este archivo
7. `npm run dev`

Luego ir a `http://localhost:3000/`

## Imágenes de la aplicación

![image](https://user-images.githubusercontent.com/34191864/193143316-3499a914-b579-47e3-bee8-1bab4aeb8d27.png)

![image](https://user-images.githubusercontent.com/34191864/193143416-616d1c69-8c6b-45bd-8871-654031b5e9b5.png)

![image](https://user-images.githubusercontent.com/34191864/193143474-bb069273-82a8-4b47-98d4-79e24a91d6aa.png)


