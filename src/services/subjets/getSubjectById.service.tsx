import subject  from "../jsonFiles/users.json";

export const getSubjectByUuid = (uuid: string) => {
  return subject.data.find((subject: {uuid: string}) => subject.uuid === uuid);
}