import React, { useEffect, useState } from 'react';
import { SubjectInteface } from '../../../interfaces/subject.interface';
import { getUsersBySubject } from '../../../services';
import { BarChart } from '../../../components/atoms/BarChart';


interface props {
  data: any,
  onclick?: (item: any) =>void
}

export const BarChartCmp = ( {data, onclick}: props ) => {
  const [subjectSelected, setSubjectSelected] = useState<any[]>([]);


  const getSubjets = async () => {
    try {
      const dataApi = await getUsersBySubject();
  
      const data1 = data.map((itemselected: any) => {
        const dataApiStudents = dataApi.filter((item) => item.uuid === itemselected.uuid);
        const students = dataApiStudents.length > 0 ? [ ...dataApiStudents[0].students, '999999'] : ['999999'];
  
        return { ...itemselected, students, value: students.length };
      });
      setSubjectSelected(data1);
    } catch (error) {
      console.error('Error de conexión al obtener las materias:', error);
    }
  }

  useEffect(() => {
    getSubjets();
  }, [data]);

  return (
    <BarChart
      data={subjectSelected}
      onclick={onclick}
    />
  );
};

