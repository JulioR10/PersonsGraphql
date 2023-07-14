import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";

const QUERY_PERSONS = gql`
  query Query {
    personas {
      id
      nombre
      telefono
      fecha
    }
  }
`;

function ShowPersons() {
  const { data } = useQuery(QUERY_PERSONS);

  const personas = data?.personas || [];

  return (
    <>
      <PageContainer>
        <Title>Personas</Title>
        <StyledTable>
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
              <TableCell>
                <strong>ID</strong>
              </TableCell>
            </TableRow>
          </thead>
          <tbody>
            {personas?.map((persona: any) => (
              <TableRow key={persona.id}>
                <TableCell>{persona.nombre}</TableCell>
                <TableCell>{persona.telefono}</TableCell>
                <TableCell>{persona.fecha}</TableCell>
                <TableCell>{persona.id}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </PageContainer>
      {/* <PageContainer>
        <Title>Personas</Title>
        <StyledTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Fecha</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {personas?.map((persona: any) => (
              <tr key={persona.id}>
                <TableCell>{persona.nombre}</TableCell>
                <TableCell>{persona.telefono}</TableCell>
                <TableCell>{persona.fecha}</TableCell>
                <TableCell>{persona.id}</TableCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </PageContainer> */}
    </>
  );
}
export default ShowPersons;

const PageContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 800px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 1em;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  padding: 1em;
  border: 1px solid #ddd;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

// const PageContainer = styled.div`
//   padding: 10px;
//   border: 1px solid black;

//   display: flex;
//   flex-direction: column;
//   align-items: center; // Centra los elementos horizontalmente
//   justify-content: center; // Centra los elementos verticalmente
// `;

// const Title = styled.h1`
//   align-self: center; // Alinea el título al inicio del contenedor
// `;

// const StyledTable = styled.table`
//   border-spacing: 0;
//   border-collapse: collapse;
// `;

// const TableCell = styled.td`
//   padding: 10px;
//   border: 1px solid black;
//   text-align: center;
// `;

// En este caso Grid no es necesario, se ve mejor en el codigo con api de libros
// const PageContainer = styled.div`
//   padding: 10px;
//   border: 1px solid black;

//   display: grid;
//   place-items: center; // Centra los elementos tanto vertical como horizontalmente
// `;

// const Title = styled.h1`
//   grid-column: 1; // Ubica el título en la primera columna
//   justify-self: center; // Alinea el título al inicio de su celda en el grid
// `;

// const StyledTable = styled.table`
//   border-spacing: 0;
//   border-collapse: collapse;
// `;

// const TableCell = styled.td`
//   padding: 10px;
//   border: 1px solid black;
//   text-align: center;
// `;
