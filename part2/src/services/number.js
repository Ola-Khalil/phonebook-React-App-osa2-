//creating seperate module for http comunication
import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};
const create = (newObj) => {
  const request = axios.post(baseURL, newObj);
  return request.then((response) => response.data);
};

const update = (id, objToUpdate) => {
  console.log("id in update method: ", id);
  console.log("object in update method: ", objToUpdate);
  const request = axios.put(`${baseURL}/${id}`, objToUpdate);
  return request.then((responce) => responce.data);
};

const remove = (id, personToDelete) => {
  const request = axios.delete(`${baseURL}/${id}`, personToDelete);
  return request.then((response) => response.data);
};
export default { getAll, create, update, remove };
