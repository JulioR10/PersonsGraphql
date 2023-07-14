import AddPerson from "@/components/AddPerson";
import DeletePerson from "@/components/DeletePerson";
import ShowPerson from "@/components/Persona";
import ShowPersons from "@/components/Personas";
import UpdatePerson from "@/components/UpdatePerson";

export default function Home() {
  return (
    <>
      <AddPerson />
      <br />
      <UpdatePerson />
      <br />
      <DeletePerson />
      <br />
      <ShowPersons />
      <br />
      <ShowPerson />
    </>
  );
}
