# Proyecto Cloud Computing


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


