import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { styled } from "styled-components";

export type Fecha = {
  day: number;
  month: number;
  year: number;
};

const ADD_PERSON = gql`
  mutation Mutation($nombre: String!, $telefono: String!, $fecha: Date!) {
    crearPersona(nombre: $nombre, telefono: $telefono, fecha: $fecha) {
      id
      nombre
      telefono
      fecha
    }
  }
`;

function AddPerson() {
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

  const [addPerson, { loading }] = useMutation(ADD_PERSON, {
    onCompleted: () => {
      //refecth();
    },
  });

  const handleAdd = async () => {
    try {
      await addPerson({
        variables: {
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
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <h1>Agregar persona</h1>
        <FormContainer>
          <label>Nombre</label>
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormContainer>
        <FormContainer>
          <label>Teléfono</label>
          <StyledInput
            type="text"
            value={telefono}
            onChange={(e) => {
              setTel(e.target.value);
            }}
          />
        </FormContainer>
        <FormContainer>
          <label>Fecha de nacimiento</label>
          <StyledInput
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
        </FormContainer>
        <StyledButton type="submit">Agregar</StyledButton>
      </StyledForm>
    </>
  );
}
export default AddPerson;

const StyledForm = styled.form`
  display: grid;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid black; // Agregado para visualizar la cuadrícula
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin-bottom: 15px;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
