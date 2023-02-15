/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
// import PerfilsController from 'App/Controllers/Http/PerfilsController'
// import UsuariosController from 'App/Controllers/Http/UsuariosController'

Route.group(() => {
  Route.get("/listar-perfil", "UsuariosController.getListarUsuariosYPerfil");
  Route.get(
    "/listar-publicaciones",
    "UsuariosController.getListarUsuariosYPublicacion"
  );
  Route.get(
    "/listar-usuarios-grupos",
    "UsuariosController.getListarUsuariosGrupos"
  );
  Route.post("/registro-usuarios", "UsuariosController.setRegistrarUsuarios");
  Route.get("/buscar-id/:id", "UsuariosController.buscarPorId");
  // Route.get("/listar-usuarios", "UsuariosController.getListarUsuarios");
  // Route.get("/listar-todo", "UsuariosController.getListarUsuariosTodos");

  Route.post(
    "/registro-publicacion",
    "PublicacionesController.setRegistroPublicacion"
  );
  Route.get("/listar-usuarios", "UsuariosController.getListarUsuarios");
  Route.post("/registro-grupo", "GruposController.setRegistrarGrupo");
  Route.post(
    "/registro-usuario-grupo",
    "GrupoUsuariosController.setRegistrarUsuarioGrupo"
  );
}).prefix("/alcaldia");

Route.group(() => {
  Route.group(() => {
    Route.get("/listar-usuarios", "UsuariosController.getListarUsuarios");
    Route.post("/registro-usuarios", "UsuariosController.setRegistrarUsuarios");
    Route.get("/buscar-id/:id", "UsuariosController.buscarPorId");
    Route.put("/actualizar/:id", "UsuariosController.actualizarUsuario");
    Route.delete("/eliminar-usuario/:id", "UsuariosController.eliminarUsuario");
  }).prefix("/usuario");

  Route.group(() => {
    Route.get("/listar-perfiles", "PerfilsController.getListarPerfiles");
    Route.post("/registro-perfil", "PerfilsController.setRegistrarPerfil");
    Route.get("/buscar-id/:id", "PerfilsController.buscarPorId");
    Route.put("/actualizar/:id", "PerfilsController.actualizarPerfil");
    Route.delete("/eliminar-perfil/:id", "PerfilsController.eliminarPerfil");
  }).prefix("/perfil");
}).prefix("/api");

// workshop
