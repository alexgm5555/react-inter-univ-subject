import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import arrowIcon from './../../asets/icons/flecha-izquierda-99-80s.png';
import arroWhiteIcon from './../../asets/icons/flecha-izquierda-white-99-80s.png';
import { getAllUsers } from "../../services";
import { SubjectInteface } from "../../interfaces/subject.interface";
import { Layout1 } from "../../layouts/Layout1";

export const AllStudents:FC = () => {
  const [allStudents, setAllStudents] = useState<any[]>([]);

  let navigate = useNavigate();

  const getInfoStudents = async () =>{
    try {
      const users = await getAllUsers();
      setAllStudents(users);
    } catch (error) {
      console.error('Error de conexión al obtener las materias:', error);
    }
  }

  useEffect(() => {
    if(allStudents.length === 0) {
      getInfoStudents()
    }
  }, []);

  return (
    <Layout1 className="flex items-center flex-row justify-center h-full">
      <>
        <span className="pr-5 cursor-pointer " onClick={(e)=>{
          navigate("/SubjectList");
        }}>
          <img className="block dark:hidden cff-border-1 hover:border-green-400"src={arrowIcon} alt="" width={50} height={50} />
          <img className="hidden dark:block cff-border-1 hover:border-green-400"src={arroWhiteIcon} alt="" width={50} height={50} />
        </span>
        {allStudents && allStudents.length > 0 && (
          <span className="flex flex-col cff-border-1
          border-green-400 w-64 pl-10">
            {
              allStudents?.map((student: {name: string, subjects: SubjectInteface[] }, index: number)=>(
                <span key={`span_${index}`}className=" w-fit p-3">
                  {student.name}
                  <p>{student.subjects.map((subject: SubjectInteface, indexs, number)=>(
                    <li key={`li_${indexs}`}>{subject.name}</li>
                  ))}</p>
                </span>
              ))
            }
          </span>
        )}
        <span>
          <img className="invisible" src={arrowIcon} alt="" width={50} height={50} />
        </span>
      </>
    </Layout1>
    
  );
};