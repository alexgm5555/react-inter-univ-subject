interface props {
  data: {
    name: string,
    value: number
  }[]
  onclick?: (item:any) =>void
}

export const BarChart = ( {data, onclick}: props ) => {
  return (
    <div className="w-80 hover:border-green-400 cursor-pointer">
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <div className="w-1/3">{item.name}</div>
          <div className="w-2/3 flex flex-col">
            <div className="ml-2">{item.value} Estudiantes Inscritos</div>
            <div 
              className="
                h-7 flex 
                items-center
                cff-border-1 
                hover:border-green-400
                relative"
              onClick={(e)=>onclick && onclick(item)}
            >
              <span className="absolute p-6 text-sm text-transparent hover:text-green-500"> ver estudiantes inscritos</span>
              <div
                className="cff-bg-color-green-600 dark:bg-green-500 cff-border-1"
                style={{ width: `${(item.value / 20) * 100}%`, height: '100%' }}
              ></div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};
