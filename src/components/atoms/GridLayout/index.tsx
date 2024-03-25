
'use client'
import { useState }from 'react';

import { removeAccents } from './../../../util/removeAcents';

import { Input } from '..';
import { Row } from './row';

interface props {
  cols: any[];
  btns: {
    name: string,
    img: string,
    imgDark?: string,
    action: (item: any) => void
  }[],
  hideHeader?: boolean,
  showOnlyColumns?: string[],
  filterInputBy: string,
  classNameContainer?: string
  classNameGrid?: string
}

export const GridLayout = ({
  cols,
  btns,
  hideHeader,
  showOnlyColumns,
  filterInputBy,
  classNameContainer,
  classNameGrid
}:props) => {
  const [inputValue, setInputValue] = useState('');
  const [, setSelected] = useState(false);
  const [, setOpenList] = useState(false);

  const headers = showOnlyColumns ? showOnlyColumns : Object.keys(cols[0]);
  const _headLength = btns ? headers.length + 1 : headers.length;

  const colsSerch = [...cols];

  const filteredOptions = colsSerch.filter((item: any) => {
    const filterName = removeAccents(item.name);
    const filterKeywords = removeAccents(item.keywords);
    return (
      filterName?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
      filterKeywords?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.keywords?.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const lista = filteredOptions.map((item: any, index: number) => {

    const regex = new RegExp(`(.*?)(${inputValue})(.*)`, 'gi');
     const getValue = (value: any) => {
      const markedText: RegExpExecArray | null = regex.exec(value);
      
      return markedText && inputValue !== '' ? (
        <span key={`span0_${index}`} className='font-sans line-clamp-1'>
          {markedText[1]}
          <b className="">{markedText[2]}</b>
          {markedText[3]}
        </span>
      ) : (
        <span className='font-sans line-clamp-1'>{value}</span>
      )
    }
    return (
      <span key={`row0_${index}`} 
      id={JSON.stringify(index+1)}>
        <Row
          item={item}
          index={index}
          headers={headers}
          btns={btns}
          _headLength={_headLength}
          maskField={getValue}
          showOnlyColumns={showOnlyColumns}
        />
      </span>
      
    );
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(false);
    setInputValue(event.target.value);
    setOpenList(true);
  };

  return (
    <div className={classNameContainer}>
      <div className=' flex justify-end'>
        <Input
          size='sm'
          bg_color={true}
          type="text"
          value={inputValue.toLowerCase()}
          onChange={handleInput}
          name={''} id={''}
          placeholder={"materia"}
        ></Input>
      </div>
      {!hideHeader ? (
        <div className={`
          grid row-auto
          grid-cols-${_headLength}
          grid-cols-3
          gap-2 w-full cff-border-1
          cff-bg-color-green-600 dark:bg-green-500
        `}>
            {headers.map((header, index) => (
              <div key={index} className="p-2">
                {header}
              </div>
            ))}
        </div>
      ) :<></>}
      <div className={classNameGrid}>
        {lista}
      </div>
    </div>
    
  );
};
