import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Persona } from "./types.ts";

type PersonSchema = Omit<Persona, "id"> & { _id: ObjectId };

const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

const db = client.database("MyDatabase");
export const PersonCollection = db.collection<PersonSchema>("Events");
