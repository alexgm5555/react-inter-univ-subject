import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByUuid } from "../../services/users/getUserById.service";

import arrowIcon from './../../asets/icons/flecha-izquierda-99-80s.png';
import arrowWhiteIcon from './../../asets/icons/flecha-izquierda-white-99-80s.png';
import { Layout1 } from "../../layouts/Layout1";

export const EnrolledStudents:FC = () => {
  const [allStudents, setStudents] = useState<any[]>([]);

  let navigate = useNavigate();
  const dataRedux: {
    name: string,
    teacherName: string,
    numCredits: number,
    days: string[]
    students: string[]
  } = useSelector((state: any) => state.subjectsList.barcharSelected);

  const getInfoStudents = async (uuid: string) =>{
    try {
      const user = await getUserByUuid(uuid);
      if(user && !allStudents.includes(user)) {
        const newStudents = [ ...allStudents, user];
        allStudents.push(user)
        setStudents(newStudents);
      }
    } catch (error) {
      console.error('Error de conexión al obtener las materias:', error);
    }
  }


  useEffect(() => {
    if(allStudents.length === 0) {
      dataRedux.students.forEach((user:string) => {
        getInfoStudents(user)
      });
    }
  }, []);
  return (
    <Layout1 className="flex items-center flex-row justify-center h-full">
      <>
        <span className="pr-5 cursor-pointer " onClick={(e)=>{
          navigate("/SubjectList");
        }}>
          <img className="block dark:hidden  cff-border-1 hover:border-green-400"src={arrowIcon} alt="" width={50} height={50} />
          <img className="hidden dark:block  cff-border-1 hover:border-green-400"src={arrowWhiteIcon} alt="" width={50} height={50} />
        </span>
        <span className="cff-border-1
          border-green-400 w-fit p-10">
          {dataRedux.name}
          <span className="flex justify-between flex-col pt-3">
            <p>Profesor: {dataRedux.teacherName}</p>
            <p>Número de créditos: {dataRedux.numCredits}</p>
            <p>Días: {dataRedux.days.map((day: string)=>(<li>{day}</li>))}</p>
            <p>Estudiantes inscritos: {allStudents && allStudents.map((student: any)=>(<li>{student.name}</li>))}</p>
          </span>
        </span>
        <span>
          <img className="invisible" src={arrowIcon} alt="" width={50} height={50} />
        </span>
      </>
    </Layout1>
    
  );
};
