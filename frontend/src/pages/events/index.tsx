import { gql, useQuery } from "@apollo/client";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  startHour: number;
  endHour: number;
};

const GET_EVENTS = gql`
  query Events {
    events {
      id
      title
      description
      date
      startHour
      endHour
    }
  }
`;

const Index: React.FC = () => {
  const { data, refetch } = useQuery(GET_EVENTS, {
    skip: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const events = data?.events || [];

  return (
    <>
      <h1>Events</h1>
      {events.map((event: any) => (
        <>
          <p>Title: {event.title}</p>
          <p>Description: {event.description}</p>
          <p>Date: {event.date}</p>
          <p>Start: {event.startHour}</p>
          <p>End: {event.endHour}</p>
          {/* aqui deberia estar un link que te permitiese updatear */}
          {/* aqui deberia estar un boton para eliminar el evento */}
        </>
      ))}
      {/* <SearchInput value={search} onChange={setSearch} />*/}
    </>
  );
};

export default Index;
