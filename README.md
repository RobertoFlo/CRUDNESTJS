<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
```
git clone Ruta  
```
2. Ejecutar 
```
yarn install 
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d 
```

5. Clonar el archivo __.env.template__  y renombrar la copia __.env__

6. llenar las variables definidas en el __.env__

7. Ejecutar la app con el comando:
```
yarn start:dev
```
8. Reconstruir la base de datos con la semilla
```
htpp://localhost:{puerto}/api/v1/seed
```
### Stack usado
* MongoDB
* Nest Js