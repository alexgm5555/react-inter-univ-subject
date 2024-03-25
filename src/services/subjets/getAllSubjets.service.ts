import subjects  from "../jsonFiles/subjects.json";
import { getUserByUuid } from "../users/getUserById.service";

export const getAllSubjets = () => {
  let _subject: any = []
  subjects.data.forEach((subject: any) => {
    const teacher = getUserByUuid(subject.uuidTeacher);
    const newSub = { ...subject, teacher, teacherName: teacher?.name}
    _subject.push(newSub);
  });
  return _subject;
}