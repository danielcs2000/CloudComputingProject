# Proyecto Cloud Computing : Cactus Net
# Integrantes
|  **#** |  **Apellidos, Nombre** | **% Trabajo** |
| :---: | :---: | :---: |
|  1 | Rojas Cruz, Daniel Julian | 100% |
|  2 | Lazo Pampa, David Alejandro| 100% |
## Características de la aplicación
La web Cactus Net es un repositorio de especies unicamente para cactus, donde el usuario podrá buscar especies de cactus. Dentro de la información de cada cactus, tenemos, morfología, descripción, familia, un mapa donde se pondrá las ubicaciones donde se puede encontrar dicha especie, etc. Ademas esta web es mantenible por los propios usuarios ya que de acuerdo a ciertos roles, los usuarios pueden leer, editar, actualizar y eliminar especies de cactus o información de sus registros. Además también permite una interfaz de administrador para que los usuarios administradores puedan gestionar a los usuarios registrados.
## Funcionalidad de la aplicación
La aplicacion admite 3 tipos de roles de usuarios:
1.	Lector: Puede acceder a la información de las especies de cactus, así como a sus registros asociados, además puede utilizar los filtros para una búsqueda más específica. Adicionalmente, si el usuario no tiene una cuenta en la plataforma puede igualmente acceder a la información.
2.	Editor: Puede editar la información relacionada a una especie o registro en específico. Además, también puede añadir y eliminar especies y/o registros en específico. 
3.	Administrador: Tiene los privilegios de un editor. Adicionalmente, tiene acceso a la información de usuarios registrados y puede cambiar de rol a usuarios registrados, así como, añadir y eliminar usuarios.

## Arquitectura de la aplicación
La figura muestra una aplicación un NextJS en el cual el frontend y el backend está contenido en bloque. Adicionalmente, la aplicación usa MongoDB, una base de datos no relacional que nos permite gestionar textos de manera rápida y flexible. 

![Arquitectura](https://user-images.githubusercontent.com/34191864/193142008-a9d61288-15ee-4937-aefd-fd27feaa8b93.jpg)

## Arquitectura con Kubernetes
![ArquitecturaV2](https://user-images.githubusercontent.com/40555746/201862263-7f9463a1-0a3f-43a8-9d16-5116cedd61ca.png)

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


Conclusiones:

- Se pudo containerizar las aplicaciones
- Se utilizó una arquitectura escalable y flexible
- Se deployó la aplicación con k8s en un servicio cloud

