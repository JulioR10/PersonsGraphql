import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { styled } from "styled-components";

export type Fecha = {
  day: number;
  month: number;
  year: number;
};

const UPDATE_PERSON = gql`
  mutation Mutation(
    $actualizarPersonaId: ID!
    $nombre: String!
    $telefono: String!
    $fecha: Date!
  ) {
    actualizarPersona(
      id: $actualizarPersonaId
      nombre: $nombre
      telefono: $telefono
      fecha: $fecha
    ) {
      id
      nombre
      telefono
      fecha
    }
  }
`;

function UpdatePerson() {
  const [name, setName] = useState<string>("");
  const [telefono, setTel] = useState<string>("");
  const [dateAdd, setDate] = useState<Fecha>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const dateString = `${dateAdd.year}-${(dateAdd.month + 1).toLocaleString(
    "es-ES",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  )}-${dateAdd.day.toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
  const [id, setId] = useState<string>("");

  const [updatePerson, { loading }] = useMutation(UPDATE_PERSON, {
    onCompleted: () => {
      //refecth();
    },
  });

  const handleUpdate = async () => {
    try {
      await updatePerson({
        variables: {
          actualizarPersonaId: id,
          nombre: name,
          telefono: telefono,
          fecha: dateString,
        },
      });
      setName("");
      setTel("");
      setDate({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
    } catch (error) {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :</p>;
    }
  };

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <h1>Actualizar persona</h1>
        <FormGroup>
          <Label>ID</Label>
          <Input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Teléfono</Label>
          <Input
            type="text"
            value={telefono}
            onChange={(e) => {
              setTel(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Fecha de nacimiento</Label>
          <Input
            type="date"
            onChange={(e) => {
              const date: string = e.target.value;
              let [year, month, day] = date.split("-");
              setDate((prevState: any) => ({
                ...prevState,
                day: parseInt(day),
                month: parseInt(month),
                year: parseInt(year),
              }));
            }}
          />
        </FormGroup>
        <Button type="submit">Actualizar</Button>
      </FormContainer>
    </>
  );
}
export default UpdatePerson;

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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background-color: #007bff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }
`;
