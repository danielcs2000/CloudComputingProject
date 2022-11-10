# Deploy de la base de datos MongoDB

## 1. Usando un cluster en la nube

## 2. Usando docker

## 3. Usando Kubernetes

Para esta parte del deploy se utilizó el siguiente tutorial como referencia: https://www.youtube.com/watch?v=VqeTT0NvRR4

### Prerequisitos 
 
 - Tener `kubectl` instalado 
 - Tener un cluster kubernetes
 - Tener el repositorio oficial de MongoDB Community Kubernetes Operator

    `git clone https://github.com/mongodb/mongodb-kubernetes-operator.git`

Primero debemos instalar Kubernetes Operator

1. Nos movemos al directorio del repositorio

    `cd mongodb-kubernetes-operator/`

2. Instalar los [Custom Resource Definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)



Para deployar Replica Set 


Nos conectamos usando 

`db.runCommand({ createRole: "listDatabases", privileges: [{ resource: { cluster: true}, actions: ["listDatabases"]}], roles:[]});` 

Y creamos el usuario que usará nuestra aplicación

`db.createUser({ user : "cactus_user", pwd: "cactus_pass", roles: [{role: "readWrite", db: "cactus_db"}, {role: "listDatabases", db:"admin"}]});`




