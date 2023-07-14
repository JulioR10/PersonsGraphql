import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { PersonCollection } from "../db.ts";

export const Mutation = {
  crearPersona: async (
    _: any,
    args: {
      nombre: string;
      telefono: string;
      fecha: Date;
    }
  ) => {
    const { nombre, telefono, fecha } = args;

    const id = await PersonCollection.insertOne({
      nombre,
      telefono,
      fecha: new Date(fecha),
    });

    return {
      id: id.toString(),
      nombre,
      telefono,
      fecha: new Date(fecha),
    };
  },

  actualizarPersona: async (
    _: any,
    args: {
      id: string;
      nombre?: string;
      telefono?: string;
      fecha?: Date;
    }
  ) => {
    const { id, nombre, telefono, fecha } = args;
    // Check if person exists
    const persona = await PersonCollection.findOne({ _id: new ObjectId(id) });
    // If not exists throw an error
    if (!persona) {
      throw new Error("Persona not found");
    }

    // Update person
    await PersonCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(nombre && { nombre }),
          ...(telefono && { telefono }),
          ...(fecha && { fecha: new Date(fecha) }),
        },
      }
    );

    return {
      id,
      nombre: nombre || persona.nombre,
      telefono: telefono || persona.telefono,
      fecha: fecha ? new Date(fecha) : persona.fecha,
    };
  },
  eliminarPersona: async (_: any, args: { id: string }) => {
    // Check if person exists
    const persona = await PersonCollection.findOne({
      _id: new ObjectId(args.id),
    });
    // If not exists throw an error
    if (!persona) {
      throw new Error("Persona not found");
    }
    // delete person
    await PersonCollection.deleteOne({ _id: new ObjectId(args.id) });

    return {
      id: args.id,
      nombre: persona.nombre,
      telefono: persona.telefono,
      fecha: persona.fecha,
    };
  },
};
