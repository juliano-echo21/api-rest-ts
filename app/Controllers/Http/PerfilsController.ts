import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Perfil from "App/Models/Perfil";

export default class PerfilsController {
  async setRegistrarPerfil({ request, response }: HttpContextContract) {
    console.log("ha llegao");
    try {
      const dataPerfil = request.only([
        "codigo_perfil",
        "codigo_usuario",
        "nombre_perfil",
        "fecha_creacion",
      ]);
      const codigoPerfil = dataPerfil.codigo_perfil;
      const perfilExistente: Number = await this.getValidarPerfilExistente(
        codigoPerfil
      );
      if (perfilExistente === 0) {
        await Perfil.create(dataPerfil);
        response.status(200).json({ msg: "Registro hecho con éxito" });
      } else {
        response
          .status(400)
          .json({ msg: "Error, el codigo perfil ya se encuentra registrado" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Error en el servidor !!" });
    }
  }

  private async getValidarPerfilExistente(
    codigo_perfil: Number
  ): Promise<Number> {
    const total = await Perfil.query()
      .where({ codigo_perfil: codigo_perfil })
      .count("*")
      .from("perfils");
    return parseInt(total[0]["count(*)"]);
  }

  private async getListarPerfiles({
    response,
  }: HttpContextContract): Promise<Perfil[]> {
    try {
      const perfiles = await Perfil.all();
      return perfiles;
    } catch (error) {
      response.status(500).json({ msg: error });
      return [];
    }
  }
  private async buscarPorId({ request, response }: HttpContextContract) {
    const id = request.params().id;
    try {
      const perfil = await Perfil.find(id);
      if (perfil) {
        return perfil;
      } else {
        return "There is no profile with id : " + id;
      }
    } catch (error) {
      response.status(400).json({
        msg: error,
      });
    }
  }
  // private async actualizarPerfil({ request, response }: HttpContextContract) {}

  private async eliminarPerfil({ request, response }: HttpContextContract) {
    const id = request.params().id;
    try {
      await Perfil.query().where("codigo_perfil", id).delete();
      response.status(200).json({
        msg: "Se ha borrado el perfil con codigo: " + id,
      });
    } catch (error) {
      response.status(400).json({
        msg: error,
      });
    }
  }
}
