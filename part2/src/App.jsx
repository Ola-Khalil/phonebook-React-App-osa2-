import { useState, useEffect } from "react";
import Person from "./components/person";
import Filter from "./components/Filter";
import PersonForm from "./components/personForm";
import numberService from "./services/number";
import Notification from "./components/Notification";
import "./index.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const [searchedName, setSearchedName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("message");

  useEffect(() => {
    console.log("using effect");

    numberService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled");
        const persons = response;
        setPersons(persons);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("render", persons.length, "persons");

  var phonebookToShow = showAll
    ? persons
    : persons.filter((person) => {
        const lowercaseName = person.name.toLowerCase();
        const lowercaseQuery = searchedName.toLowerCase();
        return lowercaseName.includes(lowercaseQuery);
      });
  function AddPerson() {
    // Check if newName is an empty string
    if (!newName.trim()) {
      setMessage("Name cannot be empty");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return; // Exit the function if newName is empty
    }

    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    console.log("nameExist: ", nameExists);
    if (nameExists) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...nameExists, number: newNum };
        numberService
          .update(nameExists.id, updatedPerson)
          .then((data) => {
            //updating state as well
            const updatedPersons = persons.map((person) =>
              person.id === nameExists.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
            setMessage("Phone Number Changed Successfully!");
            setTimeout(() => {
              setMessage(null);
            }, 5000); //message dissapper fro 5 sec
          })
          .catch((error) => {
            setMessage(`number updated for ${updatedPerson.name} `);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObj = {
        name: newName.charAt(0).toUpperCase() + newName.slice(1),
        number: newNum,
        id: persons.length * 3,
      };
      //add new person to server
      numberService
        .create(personObj)
        .then((response) => setPersons(persons.concat(response)))
        .catch((error) => console.error("Error: ", error));
      //update the state from server response(above) or do it from here like below
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNum("");
      console.log("addPerson method successfully end");
      setMessage(`Added ${personObj.name} to the phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  const deleteEntry = (id) => {
    console.log("id received in delete function is : ", id);
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm("Are you sure You want to delete this?")) {
      numberService
        .remove(id, personToDelete)
        .then((response) => {
          const updatedPersons = persons.filter(
            (person) => person.id !== personToDelete.id
          );
          setPersons(updatedPersons);
          setMessage(`${personToDelete.name} deleted from phonebook!`, false);
        })
        .catch((error) => {
          setMessage(
            `${personToDelete.name} was already deleted from server`,
            true
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
        });
    }
  };

  const updateSearchTerm = (string) => {
    setSearchTerm(string);
  };

  return (
    <div className="main">
      <h2 className="phonebook">Phonebook</h2>
      <Notification message={message} />
      <Filter
        key={searchedName.id}
        searchedName={searchedName}
        setSearchedName={setSearchedName}
        showAll={showAll}
        setShowAll={setShowAll}
        updateSearchTerm={updateSearchTerm}
      />

      <h3>add a new</h3>

      <PersonForm
        key={persons.id}
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNum={newNum}
        setNewNum={setNewNum}
        showAll={showAll}
        AddPerson={() => {
          AddPerson();
        }}
      />

      <h3>Numbers</h3>

      <Person
        key={persons.id}
        phonebookToShow={phonebookToShow}
        deleteEntry={deleteEntry} //just reference here
      />
    </div>
  );
}

export default App;
