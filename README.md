# Buda Spead API 📈

## Descripción 📖

API basada en Node.js y Express que permite calcular los spreads de diversos mercados de criptomonedas. Es posible configurar un valor de alerta para verificar si un spread es mayor o menor a un valor predeterminado.

## Tech stack 💻

Para el desarrollo de la API se utilizaron las siguientes herramientas/tecnologías:

- Node.js.
- Express.
- MongoDB.
- Swagger UI.

## Setup ⚙️

Para poder utilizar la aplicación basta con construir las imágenes e inicializar los contenedores con docker-compose:

```
docker-compose up --build
```

Esto permitirá acceder a la API mediante [http://localhost:3000/](http://localhost:3000/)

## Documentación

La documentación de la API se realizó con Swagger UI. Esta puede ser encontrada [http://localhost:3000/docs](http://localhost:3000/docs).
