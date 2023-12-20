function Person({ phonebookToShow, deleteEntry }) {
  return (
    <div>
      {phonebookToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button
            className="delete"
            onClick={() => {
              deleteEntry(person.id);
            }}
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default Person;
