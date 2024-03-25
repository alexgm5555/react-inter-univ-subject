import { FC, useEffect, useState }from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Button, GridLayout } from '../../components/atoms';
import { getAllSubjets } from '../../services';
import { SubjectInteface } from '../../interfaces/subject.interface';
import { addBarChartItem, addSubject } from '../../redux/subjectListSlice';

import addIcon from './../../asets/icons/signo-de-adicion-99-80.png';
import addWhiteIcon from './../../asets/icons/signo-de-adicion-white-99-80.png';
import removeIcon from './../../asets/icons/signo-menos-99-80.png';
import removeWhiteIcon from './../../asets/icons/signo-menos-white-99-80.png';
import { BarChartCmp as BarChart } from './BarChartCmp';
import { ResumeCmp } from './ResumeCmp';

export const SubjectList:FC = () => {
  const [allSubject, setAllSubject] = useState<SubjectInteface[]>([]);
  const [alert, setAlert] = useState<string>("");
  const [flag, setFlag] = useState<number>(0);

  const dataRedux = useSelector((state: any) => state.subjectsList.subjectsSelected);
  const dispatch =  useDispatch();
  let navigate = useNavigate();

  const getSubjets = async () => {
    try {
      const dataApi: SubjectInteface[] = await getAllSubjets();
      setAllSubject(dataApi);
      setFlag(1)
    } catch (error) {
      console.error('Error de conexión al obtener las materias:', error);
    }
  }

  const handleAdd = (subject: any)=>{
    if(subject && dataRedux.length < 3 ) {
      setAlert("")
      dispatch(addSubject({ subject }));
    } else {setAlert("El número máximo de materias es 3.")}
  };

  const filterGrid = () =>{
    const filteredSubjects = allSubject.filter(subject => {
      const isNotSelected = !dataRedux.some(
        (selectedSubject: { uuidTeacher: string; }) => selectedSubject.uuidTeacher === subject.uuidTeacher
      );
      const isUniqueTeacher = !dataRedux.some(
        (selectedSubject: { uuidTeacher: string; }) => selectedSubject.uuidTeacher === subject.uuidTeacher
      );
      return isNotSelected && isUniqueTeacher;
    });
    setAllSubject(filteredSubjects);
  }

  useEffect(() => {
    filterGrid();
  }, [dataRedux, flag]);

  useEffect(() => {
    if(allSubject.length === 0) {
      getSubjets();
    }
  }, [allSubject]);

  const showOnlyColumns = ["name", "teacherName"];
  const cols = [ ...allSubject ];

  return (
    <div className='flex items-center flex-col h-full overflow-hidden'>
      {dataRedux.length !== 0 && (
        <>
          <Button className='flex-row mt-3 mb-4' size="lg" onclick={()=>navigate("/AllStudents")}> Todos los estudiantes </Button>
          <span className='flex flex-row cff-border-1  border-green-400 px-3 mb-3'>
            <BarChart
              data={dataRedux}
              onclick={(item)=> {
                dispatch(addBarChartItem({ subject: item }));
                navigate("/EnrolledStudents");
              }}
            />
            <ResumeCmp 
              data={dataRedux}
            />
          </span>
        </>
        
      )}
      <GridLayout 
        cols={cols}
        btns={[
          {
            name: 'Agregar Materia',
            imgDark: addWhiteIcon,
            img: addIcon,
            action: (e: any)=>{handleAdd(e)}
          },
        ]}
        classNameContainer="h-[calc(100vh-25rem)]"
        classNameGrid=" h-[calc(100vh-18rem)] overflow-y-auto"
        showOnlyColumns={showOnlyColumns}
        filterInputBy={"name"}/>
        {alert && alert !== "" && (
          <span className='text-red-500 text-xl'>{alert}</span>
        )}
    </div>
  );
};
