import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const QUERY_PERSON = gql`
  query Query($personaId: ID, $nombre: String) {
    persona(id: $personaId, nombre: $nombre) {
      id
      nombre
      telefono
      fecha
    }
  }
`;

function ShowPerson() {
  const [nombre, setNombre] = useState("");
  const [personaId, setPersonaId] = useState("");

  const { data, refetch } = useQuery(QUERY_PERSON, {
    variables: { personaId: personaId, nombre: nombre },
    skip: !nombre || !personaId,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const persona = data?.persona || [];

  return (
    <>
      <Container>
        <h1>Buscar Persona</h1>
        <Input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          type="text"
          placeholder="ID"
          onChange={(e) => setPersonaId(e.target.value)}
        />
        <Button onClick={() => refetch()}>Buscar</Button>

        <h1>Persona</h1>
        <Table>
          <thead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Telefono</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha</strong>
              </TableCell>
            </TableRow>
          </thead>
          <tbody>
            <TableRow key={persona.id}>
              <TableCell>{persona.nombre}</TableCell>
              <TableCell>{persona.telefono}</TableCell>
              <TableCell>{persona.fecha}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default ShowPerson;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
