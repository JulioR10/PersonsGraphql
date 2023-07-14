export const typeDefs = `
  scalar Date

  type Persona {
    id: ID!
    nombre: String!
    telefono: String!
    fecha: Date!
  }

  type Query {
    personas: [Persona]
    persona(id: ID, nombre: String): Persona
  }

  type Mutation {
    crearPersona(nombre: String!, telefono: String!, fecha: Date!): Persona
    actualizarPersona(
      id: ID!
      nombre: String!
      telefono: String!
      fecha: Date!
    ): Persona
    eliminarPersona(id: ID!): Persona
  }
  `;
