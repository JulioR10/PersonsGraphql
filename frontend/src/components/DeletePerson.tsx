import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { styled } from "styled-components";

export type Fecha = {
  day: number;
  month: number;
  year: number;
};

const DELETE_PERSON = gql`
  mutation Mutation($eliminarPersonaId: ID!) {
    eliminarPersona(id: $eliminarPersonaId) {
      id
      nombre
      telefono
      fecha
    }
  }
`;

function DeletePerson() {
  const [id, setId] = useState<string>("");

  const [deletePerson, { loading }] = useMutation(DELETE_PERSON, {
    onCompleted: () => {
      //refecth();
    },
  });

  const handleDelete = async () => {
    try {
      await deletePerson({
        variables: {
          eliminarPersonaId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormContainer
        onSubmit={async (e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <h2>Eliminar persona</h2>
        <Label htmlFor="id">Id</Label>
        <Input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Button type="submit">Eliminar</Button>
      </FormContainer>
    </>
  );
}
export default DeletePerson;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  max-width: 400px; // Limitamos el ancho del formulario
  margin: 0 auto; // Centramos el formulario
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Añadimos un poco de sombra para un efecto 3D
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: #dc3545; // Cambiamos el color para que se ajuste a la funcionalidad de eliminar
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #c82333;
  }
`;
