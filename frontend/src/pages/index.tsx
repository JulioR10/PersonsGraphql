import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";

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

export default function Home() {
  const [titleAdd, setTitle] = useState<string>("");
  const [descAdd, setDesc] = useState<string>("");
  const [startAdd, setStart] = useState<number>(0);
  const [endAdd, setEnd] = useState<number>(0);
  // bombardeen la casa del que hizo las fechas
  // no funciona, se resetea la fecha siempre
  const [dateAdd, setDate] = useState<Fecha>({
    day: new Date().getDay(),
    month: new Date().getMonth(),
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

  const [addEvent, { data: addedEvent }] = useMutation(CREATE_EVENT);

  const handleAddEvent = async () => {
    try {
      await addEvent({
        variables: {
          title: titleAdd,
          description: descAdd,
          date: dateAdd,
          startHour: startAdd,
          endHour: endAdd,
        },
      });
      console.log(titleAdd, descAdd, dateAdd, startAdd, endAdd);
      alert("Event added successfully");
    } catch (error) {
      alert("An error occurred while adding the event. Event already booked.");
      console.error(error);
    }
  };

  return (
    <>
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
              month = parseInt(month).toString();
              console.log(year, month, day);
              setDate({
                day: parseInt(day),
                month: parseInt(month),
                year: parseInt(year),
              });
              console.log(dateAdd);
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

      <Link href="/events">Lista de eventos</Link>

      {/* da error wtf */}
      {/* {addedEvent && (
        <div>
          <h2>Event Added</h2>
          <p>Title: {addedEvent.addEvent.title}</p>
          <p>Description: {addedEvent.addEvent.description}</p>
          <p>Date: {addedEvent.addEvent.date}</p>
          <p>Start: {addedEvent.addEvent.startHour}</p>
          <p>End: {addedEvent.addEvent.endHour}</p>
        </div>
      )} */}
    </>
  );
}
