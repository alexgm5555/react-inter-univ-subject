import users from "../jsonFiles/users.json";
import subjects from "../jsonFiles/subjects.json";
import subjectsAsigned from "../jsonFiles/subjectsAsigned.json";
import { getUserByUuid } from "../users/getUserById.service";
import { SubjectInteface } from "../../interfaces/subject.interface";

interface SubjectWithStudents {
  name: string;
  subjects: SubjectInteface[];
}
export const getAllUsers = () => {
  const subjectsByStudent: SubjectWithStudents[] = [];

  subjectsAsigned.forEach(studentSubject => {
        const student = users.data.find(student => student.uuid === studentSubject.uuidStudent);
        const subject = subjects.data.find(subject => subject.uuid === studentSubject.uuidSubject);
        if (student && subject) {
            const existingStudentIndex = subjectsByStudent.findIndex(item => item.name === student.name);
            if (existingStudentIndex === -1) {
                subjectsByStudent.push({
                    name: student.name,
                    subjects: [subject]
                });
            } else {
                subjectsByStudent[existingStudentIndex].subjects.push(subject);
            }
        }
    });

    return subjectsByStudent;
}