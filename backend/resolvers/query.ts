import { PersonCollection } from "../db.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

export const Query = {
  personas: async () => {
    return (await PersonCollection.find().toArray()).map((persona: any) => {
      persona.id = persona._id.toString();
      delete persona._id;
      return { ...persona };
    });
  },

  persona: async (_: any, args: { id?: string; nombre?: string }) => {
    let persona;
    if (args.id) {
      persona = await PersonCollection.findOne({ _id: new ObjectId(args.id) });
    } else if (args.nombre) {
      persona = await PersonCollection.findOne({ nombre: args.nombre });
    }
    if (!persona) {
      throw new Error("Persona not found");
    }

    persona.id = persona._id.toString();
    delete persona._id;
    return { ...persona };
  },
};
