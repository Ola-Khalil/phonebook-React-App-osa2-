import React from "react";

function PersonForm({ newName, setNewName, newNum, setNewNum, AddPerson }) {
  const stylebutton = {};
  function handleChangeText(event) {
    setNewName(event.target.value);
  }

  function handleChangeNum(event) {
    setNewNum(event.target.value);
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          //event object is automaticallypassed
          event.preventDefault(); // to prevent refresh
          //AddPerson();// can Invoke AddPerson directly here rather than at button
        }}
      >
        <div>
          Name:{" "}
          <input type="text" value={newName} onChange={handleChangeText} />
        </div>
        <br />
        <div>
          Number: <input value={newNum} onChange={handleChangeNum} />
        </div>
        <div>
          <button
            className="Add"
            style={stylebutton}
            type="submit"
            onClick={AddPerson}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
