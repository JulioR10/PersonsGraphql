import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ApolloError } from "@apollo/client";

// USO EN PARTE 1
export type Fecha = {
  day: number;
  month: number;
  year: number;
};

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $date: Date!
    $startHour: Int!
    $endHour: Int!
  ) {
    createEvent(
      title: $title
      description: $description
      date: $date
      startHour: $startHour
      endHour: $endHour
    ) {
      title
      description
      date
      startHour
      endHour
    }
  }
`;

// USO EN PARTE 2
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

// USO EN PARTE 3
const DELETE_EVENTS = gql`
  mutation DeleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      id
    }
  }
`;

// USO EN PARTE 4
const UPDATE_EVENTS = gql`
  mutation UpdateEvent(
    $updateEventId: ID!
    $title: String!
    $description: String!
    $date: Date!
    $startHour: Int!
    $endHour: Int!
  ) {
    updateEvent(
      id: $updateEventId
      title: $title
      description: $description
      date: $date
      startHour: $startHour
      endHour: $endHour
    ) {
      title
      description
      date
      startHour
      endHour
      id
    }
  }
`;

export default function Home() {
  // PARTE 1 MUTATION ADD
  const [titleAdd, setTitle] = useState<string>("");
  const [descAdd, setDesc] = useState<string>("");
  const [startAdd, setStart] = useState<number>(0);
  const [endAdd, setEnd] = useState<number>(0);
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

  // const [addEvent, { data }] = useMutation(CREATE_EVENT, {
  //   onCompleted: (data) => {
  //     // Puedes acceder a los datos de la respuesta aquí.
  //     console.log(data.date);
  //   },
  // });
  const [addEvent] = useMutation(CREATE_EVENT, {
    // Una vez que la mutación se ha completado con éxito, refetch los eventos
    onCompleted: () => {
      refetch();
    },
  });

  const handleAddEvent = async () => {
    try {
      await addEvent({
        variables: {
          title: titleAdd,
          description: descAdd,
          date: dateString,
          startHour: startAdd,
          endHour: endAdd,
        },
      });
      alert("Event added successfully");
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error);
        if (
          error.message === "There is already an event in that date and time"
        ) {
          alert(
            "Ocurrió un error al añadir el evento. Ya existe un evento en esa fecha y hora. Por favor, selecciona una fecha y hora diferentes."
          );
        } else {
          alert(
            "Ocurrió un error al añadir el evento. Por favor, intenta nuevamente."
          );
        }
      }
    }
  };

  // PARTE 2 QUERY EVENTS
  const { data, refetch } = useQuery(GET_EVENTS, {
    skip: false,
  });

  const events = data?.events || [];

  // PARTE 3
  const [delEvent] = useMutation(DELETE_EVENTS, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelEvent = async (eventId: string) => {
    try {
      await delEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
      alert("Event deleted successfully");
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error);
        alert(
          "Ocurrió un error al eliminar el evento. Por favor, intenta nuevamente."
        );
      }
    }
  };

  // PARTE 4
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [titleEdit, setTitleEdit] = useState<string>("");
  const [descEdit, setDescEdit] = useState<string>("");
  const [startEdit, setStartEdit] = useState<number>(0);
  const [endEdit, setEndEdit] = useState<number>(0);
  const [dateEdit, setDateEdit] = useState<Fecha>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const dateStringEdit = `${dateEdit.year}-${(
    dateEdit.month + 1
  ).toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${dateEdit.day.toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;

  const [updateEvent] = useMutation(UPDATE_EVENTS, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleUpdateEvent = async (
    id: string,
    title: string,
    description: string,
    date: string,
    startHour: number,
    endHour: number
  ) => {
    try {
      const dateNice = new Date(date);
      await updateEvent({
        variables: {
          updateEventId: id,
          title: title,
          description: description,
          date: dateNice,
          startHour: startHour,
          endHour: endHour,
        },
      });
      alert("Event updated successfully");
      setEditingEventId(null); // Vuelve a null después de la actualización
      refetch();
    } catch (error) {
      console.error(error);
      alert(
        "Ocurrió un error al actualizar el evento. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <>
      {/* PARTE 1 */}
      <h1>Add Event</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEvent();
        }}
      >
        <label>
          Title:
          <input
            type="string"
            name="title"
            value={titleAdd || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Description:
          <input
            type="string"
            name="description"
            value={descAdd || ""}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            // value={dateString}
            onChange={(e) => {
              const date: string = e.target.value; // YYYY-MM-DD
              let [year, month, day] = date.split("-");
              setDate((prevState) => ({
                ...prevState,
                day: parseInt(day),
                month: parseInt(month),
                year: parseInt(year),
              }));
            }}
          />
        </label>
        <label>
          Start:
          <input
            min="0"
            max="24"
            type="number"
            name="start"
            value={startAdd}
            onChange={(e) => {
              setStart(parseInt(e.target.value));
            }}
          />
        </label>
        <label>
          End:
          <input
            min="0"
            max="24"
            type="number"
            name="end"
            value={endAdd}
            onChange={(e) => {
              setEnd(parseInt(e.target.value));
            }}
          />
        </label>
        <button type="submit">Añadir Event</button>
      </form>

      {/* PARTE 2 3 4 */}
      <h1>Events</h1>
      {events.map((event: any) => (
        <>
          {editingEventId === event.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateEvent(
                  event.id,
                  titleEdit,
                  descEdit,
                  dateStringEdit,
                  startEdit,
                  endEdit
                );
              }}
            >
              <label>
                Title:
                <input
                  type="string"
                  name="title"
                  value={titleEdit || ""}
                  onChange={(e) => {
                    setTitleEdit(e.target.value);
                  }}
                />
              </label>
              <label>
                Description:
                <input
                  type="string"
                  name="description"
                  value={descEdit || ""}
                  onChange={(e) => {
                    setDescEdit(e.target.value);
                  }}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  // value={dateString}
                  onChange={(e) => {
                    const date: string = e.target.value; // YYYY-MM-DD
                    let [year, month, day] = date.split("-");
                    setDateEdit((prevState) => ({
                      ...prevState,
                      day: parseInt(day),
                      month: parseInt(month),
                      year: parseInt(year),
                    }));
                  }}
                />
              </label>
              <label>
                Start:
                <input
                  min="0"
                  max="24"
                  type="number"
                  name="start"
                  value={startEdit}
                  onChange={(e) => {
                    setStartEdit(parseInt(e.target.value));
                  }}
                />
              </label>
              <label>
                End:
                <input
                  min="0"
                  max="24"
                  type="number"
                  name="end"
                  value={endEdit}
                  onChange={(e) => {
                    setEndEdit(parseInt(e.target.value));
                  }}
                />
              </label>
              <button type="submit">Actualizar Evento</button>
            </form>
          ) : (
            <>
              <p>Title: {event.title}</p>
              <p>Description: {event.description}</p>
              <p>Date: {event.date}</p>
              <p>Start: {event.startHour}</p>
              <p>End: {event.endHour}</p>
            </>
          )}
          <button type="button" onClick={() => setEditingEventId(event.id)}>
            Editar
          </button>
          <button
            type="button"
            onClick={() => {
              handleDelEvent(event.id);
            }}
          >
            Eliminar
          </button>
        </>
      ))}
    </>
  );
}
