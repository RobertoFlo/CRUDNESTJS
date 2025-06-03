<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
```
git clone Ruta  
```
2. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
3. Clonar el archivo __.env.template__  y renombrar la copia __.env__ y otro con el nombre de __.env.prod__ 

4. llenar las variables definidas en el __.env__ y __.env.prod__

5. Ejecutar para crear los dos contenedores base de datos y el proyecto
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build 
```

6. Si ya lo tienes creado y los has detenido para levantarlo de nuevo usa 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

6. Reconstruir la base de datos con la semilla
```
http://localhost:{puerto}/api/v1/seed
```
### Stack usado
* MongoDB
* Nest Js