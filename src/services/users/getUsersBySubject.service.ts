import subjectAsg from "../jsonFiles/subjectsAsigned.json";
import { getSubjectByUuid } from "../subjets/getSubjectById.service";
import { getUserByUuid } from "./getUserById.service";

export const getUsersBySubject = () => {

  const subjectsMap: Map<string, string[]> = new Map();

  subjectAsg.forEach((enrollment) => {
    const { uuidSubject, uuidStudent } = enrollment;
    const students = subjectsMap.get(uuidSubject) || [];
    students.push(uuidStudent);
    subjectsMap.set(uuidSubject, students);
  });

  const uniqueSubjects: any[] = [];
  subjectsMap.forEach((students, uuid) => {
    uniqueSubjects.push({ uuid, students });
  });
 
  return uniqueSubjects;
}