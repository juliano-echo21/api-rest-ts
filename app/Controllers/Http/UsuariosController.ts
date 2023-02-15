import { HttpContext, Response } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";
// import PerfilsController from "App/Controllers/Http/PerfilsController";
// const PerfilsController = require("App/Controllers/Http/PerfilsController");
// import Perfil from "app/Models/Perfil";

export default class UsuariosController {
  public async getListarUsuarios(): Promise<Usuario[]> {
    const user = await Usuario.all();
    return user;
  }

  public async getListarUsuariosYPerfil(): Promise<Usuario[]> {
    //what does that mean?
    const user = await Usuario.query().preload("perfil");
    return user;
  }
  public async getListarUsuariosYPublicacion(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("publicaciones");

    return user;
  }

  public async getListarUsuariosGrupos(): Promise<Usuario[]> {
    const user = await Usuario.query().preload("usuario_grupos");

    return user;
  }

  async setRegistrarUsuarios({ request, response }: HttpContextContract) {
    const dataUsuario = request.only([
      "codigo_usuario",
      "nombre_usuario",
      "contrasena",
      "email",
      "telefono",
      "perfil",
    ]);
    try {
      const codigoUsuario = dataUsuario.codigo_usuario;
      const usuarioExistente: Number = await this.getValidarUsuarioExistente(
        codigoUsuario
      );

      if (usuarioExistente === 0) {
        await Usuario.create(dataUsuario);

        // const perfil = PerfilsController;
        // perfil.setRegistrarPerfil();
        // console.log(perfil);
        // console.log(PerfilsController);
        // console.log(request);
        response.status(200).json({ msg: "Registro completado con exito" });
      } else {
        response
          .status(400)
          .json({ msg: "Error, el usuario ya se encuentra registrado" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: error });
    }
  }

  public async buscarPorId({ request, response }: HttpContextContract) {
    const id = request.param("id");
    try {
      const user = await Usuario.find(id);
      if (user) {
        return user;
      } else {
        return "There is no user with id : " + id;
      }
    } catch (error) {
      response.status(400).json({
        msg: error,
      });
    }
  }

  public async actualizarUsuario({ request, response }: HttpContextContract) {
    const id = request.param("id");
    const user = request.all();

    try {
      await Usuario.query().where("codigo_usuario", id).update({
        nombre_usuario: user.nombre_usuario,
        contrasena: user.contrasena,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
      });

      response.status(200).json({ msg: "Se ha actualizado con exito" });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }

  public async eliminarUsuario({ request, response }: HttpContextContract) {
    const id = request.param("id");
    try {
      await Usuario.query().where("codigo_usuario", id).delete();
      response.status(200).json({
        msg: "Se ha borrado el usuario con codigo: " + id,
      });
    } catch (error) {
      response.status(400).json({
        msg: error,
      });
    }
  }

  private async getValidarUsuarioExistente(
    codigo_usuario: Number
  ): Promise<Number> {
    const total = await Usuario.query()
      .where({ codigo_usuario: codigo_usuario })
      .count("*")
      .from("usuarios");
    return parseInt(total[0]["count(*)"]);
  }
}
