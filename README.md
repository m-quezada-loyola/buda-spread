# Buda Spead API 📈

## Descripción 📖

API basada en Node.js y Express que permite calcular los spreads de diversos mercados de criptomonedas utilizando la API de Buda. Es posible configurar un valor de alerta para verificar si un spread es mayor o menor a un valor predeterminado.

## Tech stack 💻

Para el desarrollo de la API se utilizaron las siguientes herramientas/tecnologías:

- Node.js.
- Express.
- MongoDB.
- Swagger UI.

## Supuestos 💭

El principal supuesto que se realizó fue que la alerta de spread se requiere individualmente por cada mercado disponible. Lo anterior se debe a que la diferencia numérica entre oferta y demanda entre distintos pares de monedas pueden diferir en varios ordenes de magnitud, por lo que un valor de spread único para todos los mercados no haría sentido.

## Setup 🐋

Para poder utilizar la aplicación primero es necesario clonar el repositorio:

```
git clone https://github.com/m-quezada-loyola/buda-spread.git
```
Luego, es necesario entrar al directorio del repositorio:

```
cd buda-spread
```

Finalmente, se deben construir las imágenes requeridas e inicializar los contenedores:

```
docker-compose up --build
```

Esto permitirá acceder a la API mediante [http://localhost:3000/](http://localhost:3000/)

## Testing 🧪

Para realizar los test es necesario ejecutar el siguiente comando:

```
docker-compose run backend npm test
```

## Posibles mejoras 🔨

A continuación se listan posibles mejoras a implementar:

- Agregar operación de UPDATE para las alertas de spread con el fin de actualizar sus valores dadas distintas condiciones de mercado.
- Implementación de tests unitarios para las funciones relacionadas a los servicios de cálculo de spread y de consumo de la API de Buda.

## Documentación 📃

La documentación de la API se realizó con Swagger UI. Esta puede ser encontrada [http://localhost:3000/docs](http://localhost:3000/docs).
