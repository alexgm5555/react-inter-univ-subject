
import { ReactNode }from 'react';

interface props {
  item: any,
  index: number,
  headers: any,
  btns: {
    name: string,
    img: string,
    imgDark?: string,
    action: (item: any) => void
  }[],
  _headLength: number,
  showOnlyColumns?: string[],
  maskField: (e: any) => void,

}

export const Row = ({
  item,
  index,
  headers,
  btns,
  _headLength,
  showOnlyColumns,
  maskField
}:props) => {
  const field = (key: any, value:any) => {return (
    <div key={key} className={`
      flex-1 border-gray-400 p-2
      ${key === headers[headers.length-1] && !btns ? "" : "border-r"}
    `}>
      {value ? (<>{maskField(value)}</>) : (<></>)}
    </div>
  )};

  
  return (
      <div className={`w-full`}>
        {/* Renderizar datos */}
          <div
            id={`row_${index}`}
            key={`row1_${index}`}
            className={`
              grid row-auto
              grid-cols-${_headLength}
              gap-2 border cff-border-1
              ${item.resalt? "animate-pulse backdrop-brightness-200": null}
              hover:animate-none
              ${
                index % 2 === 0 ? '' : 'cff-bg-color-green-600 dark:bg-green-500'
              }
            `}
          >
            {Object.entries(item).map(([key, value]) => (
              <>
                {
                  showOnlyColumns && !showOnlyColumns.includes(key)
                  ? null
                  : field(key, value)
                }
              </>
            ))}
            {btns && (
              <div className='flex justify-around relative'>
                {
                  btns.map((btn, index) => (
                    <span 
                      id={`imageBtn_${index}`}
                      key={`imageBtn_${index}`}
                    >
                      <img 
                        className={`
                        ${btn.imgDark && 'cff-flex-row-center dark:hidden'}
                        cff-button
                        rounded-full
                          flex-row
                          sm:h-10 sm:w-10
                          h-9 w-9
                          cursor-pointer
                        ${item.resaltBtn0 && index === 0 ? "animate-pulse": null}
                        ${item.resaltBtn1 && index === 1 ? "animate-pulse": null}
                        ${item.resaltBtn2 && index === 2 ? "animate-pulse": null}
                        hover:animate-none
                        hover:border-gray-300
                        `}
                        src={btn.img}
                        alt=""
                        width={100}
                        height={100}
                        onClick={()=>btn.action(item)}
                        
                      />
                      {/* cambia el boton si el tema es oscuro */}
                      {btn.imgDark && <img 
                        className={`
                        hidden dark:cff-flex-row-center
                        cff-button
                        rounded-full
                          flex-row
                          sm:h-10 sm:w-10
                          h-9 w-9
                        ${item.resaltBtn0 && index === 0 ? "animate-pulse": null}
                        ${item.resaltBtn1 && index === 1 ? "animate-pulse": null}
                        ${item.resaltBtn2 && index === 2 ? "animate-pulse": null}
                        hover:animate-none
                        hover:border-green-400
                        `}
                        src={btn.imgDark}
                        alt=""
                        width={100}
                        height={100}
                        onClick={()=>btn.action(item)}
                      />}
                    </span>
                    
                  ))
                }
              </div>
            )}
          </div>
      </div>
  );
};
