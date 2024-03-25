import users  from "../jsonFiles/users.json";

export const getUserByUuid = (uuid: string) => {
  return users && users.data && users.data.find((user: {uuid: string}) => user.uuid === uuid);
}