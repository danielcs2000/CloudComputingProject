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

    `kubectl apply -f config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml`

3. Instalar los roles y role-bindings

    `kubectl create ns mongodb`

    `kubectl apply -k config/rbac/ --namespace mongodb`

4. Instalar el operator

    `kubectl create -f config/manager/manager.yaml --namespace mongodb`

Para deployar Replica Set 

1. Editamos el archivo

2. Hacemos el deploy básico de mongodb

    `kubectl apply -f config/samples/mongodb.com_v1_mongodbcommunity_cr.yaml --namespace mongodb`

3. Get

    ```
    kubectl get secret example-mongodb-admin-my-user -n mongodb  -o json | jq -r '.data | with_entries(.value |= @base64d)'
    ```

Port forwarding

1. Obtenemos los servicios en el namespace mongodb

    `kubectl get svc -n mongodb`

2. Ejecutamos un proxy que apunte a la base de datos

    `kubectl port-forward service/example-mongodb-svc -n mongodb 30001:27017`

3. Nos conectamos utilizando `mongosh` desde nuestro local

    `mongosh "mongodb://my-user:123456@127.0.0.1:30001/?directConnection=true"`

Nos conectamos usando 

`use admin;`

`db.runCommand({ createRole: "listDatabases", privileges: [{ resource: { cluster: true}, actions: ["listDatabases"]}], roles:[]});` 

Y creamos el usuario que usará nuestra aplicación

`db.createUser({ user : "cactus_user", pwd: "cactus_pass", roles: [{role: "readWrite", db: "cactus_db"}, {role: "listDatabases", db:"admin"}]});`


Finalmente

`mongosh "mongodb://cactus_user:cactus_pass@127.0.0.1:30001/?directConnection=true"`

