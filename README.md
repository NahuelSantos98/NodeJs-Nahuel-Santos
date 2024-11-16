# Proyecto Node.js

Este es un proyecto de Node.js. Sigue estos pasos para instalar y ejecutar la aplicación.

## Requisitos previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/NahuelSantos98/NodeJs-Nahuel-Santos.git
2. **Accede al directorio del proyecto**:

   ```bash
   cd NodeJs-Nahuel-Santos
3. **Instalar el proyecto**:
   ```bash
   npm install
5. **Ir a la ruta src**:
   ```bash
   cd src
7. **Ejecutar el siguiente comando**:
   ```bash
   node --watch main.js
8. **En el navegador o postman va a poder acceder al servidor en esta ruta**:
   ```bash
   http://localhost:8080/

# Rutas del API - Productos

A continuación se describen las rutas disponibles para gestionar productos a través de la API.

## 1. **GET api/products**

Obtiene una lista de productos con un límite opcional.

### Descripción:
- Permite obtener una lista de productos.
- Se puede limitar la cantidad de productos devueltos mediante un parámetro `limit` en la query string (por defecto es 10).

### Ejemplo de solicitud:
(HTTP)
GET api/products?limit=5



## 2. **GET api/products/:pid**

Obtiene un producto por su ID.

### Descripción:
- Permite obtener un producto individual usando su ID (pasado como parámetro pid).\
- Si no se encuentra el producto con el ID proporcionado, retorna un error.

### Ejemplo de solicitud:
(HTTP) 
GET api/products/123


### Respuesta:
- Si el producto es encontrado, retorna el producto con el `id` especificado.
- Si no se encuentra, devuelve un error 404.

---

## 3. **POST api/products**

Crea un nuevo producto.

### Descripción:
- Permite crear un nuevo producto en la base de datos.
- El cuerpo de la solicitud debe incluir todos los campos requeridos: `title`, `description`, `code`, `price`, `stock`, y `category`.
- Si falta algún campo, retorna un error.

### Ejemplo de solicitud:
(HTTP)
POST /products
Content-Type: application/json
{
  "title": "Nuevo Producto",
  "description": "Descripción del producto",
  "code": "12345",
  "price": 100,
  "stock": 50,
  "category": "Electronics"
}

### Respuesta:
- Si el producto se crea correctamente, retorna el producto creado junto con un mensaje de éxito.
- Si falta algún campo, retorna un error 400.

---

## 4. ** PUT api/products/:pid**

Actualiza un producto existente.

### Descripción:
- Permite modificar un producto existente usando su id (pasado como parámetro pid).
- Los campos del producto que no se incluyan en la solicitud no se modificarán.

### Ejemplo de solicitud:
(HTTP) 
PUT api/products/123 Content-Type: application/json { "title": "Producto Modificado", "price": 120 }


### Respuesta:
- Si el producto es encontrado y actualizado, retorna el producto actualizado.
- Si el producto no existe, retorna un error 404.

---

## 5. **DELETE api/products/:pid**

Elimina un producto por su ID.

### Descripción:
- Permite eliminar un producto usando su `id` (pasado como parámetro `pid`).
- Si no se encuentra el producto, retorna un error 404.

### Ejemplo de solicitud:
(HTTP)
DELETE api/products/123

### Respuesta:
- Si el producto se elimina correctamente, retorna un mensaje de éxito.
- Si no se encuentra el producto, retorna un error 404.

# Rutas del API - Carrito de Compra

A continuación se describen las rutas disponibles para gestionar carritos de compra a través de la API.

## 1. **POST api/carts**

Crea un nuevo carrito de compra.

### Descripción:
- Permite crear un nuevo carrito de compras.
- El cuerpo de la solicitud debe incluir todos los campos requeridos para crear un carrito.

### Ejemplo de solicitud:
(HTTP)
POST /carts
Content-Type: application/json
{
  "someField": "someValue"
}

### Respuesta:
- Si el carrito se crea correctamente, retorna el carrito creado junto con un mensaje de éxito.
- Si faltan datos en el cuerpo de la solicitud, retorna un error 400.

---

## 2. **GET api/carts/:cid**

Obtiene un carrito de compra por su ID.

### Descripción:
- Permite obtener un carrito de compra usando su ID (pasado como parámetro `cid`).
- Si no se encuentra el carrito con el ID proporcionado, retorna un error.

### Ejemplo de solicitud:
(HTTP)
GET /carts/123

### Respuesta:
- Si el carrito es encontrado, retorna el carrito con el `id` especificado.
- Si no se encuentra, devuelve un error 404.

---

## 3. **POST api/carts/:cid/product/:pid**

Agrega o actualiza un producto en el carrito de compra.

### Descripción:
- Permite agregar un producto a un carrito de compra, o actualizar la cantidad de un producto ya existente.
- Se debe proporcionar el `cid` del carrito y el `pid` del producto, así como la cantidad del producto en el cuerpo de la solicitud.

### Ejemplo de solicitud:
(HTTP)
POST /carts/123/product/456
Content-Type: application/json
{
  "quantity": 3
}

### Respuesta:
- Si el carrito y el producto son encontrados, retorna el carrito actualizado con el producto agregado o la cantidad actualizada.
- Si no se encuentra el carrito o el producto, retorna un error 404.

