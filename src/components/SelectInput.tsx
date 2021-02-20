import React from 'react'

interface Props {
   defaultValue: string
   propValue?: string
   propContent?: string
   handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
   data: any[]
   extraOption?: { value: string | number, content: string | number }
}

function SelectInput({ defaultValue, handleChange, propContent, propValue, data, extraOption }: Props) {

   return (
      <select className=" form-select-sm" defaultValue={defaultValue} onChange={handleChange}>
         {data.map((item: any) => {
            return (
               <option
                  key={propValue ? item[propValue] : item}
                  value={propValue ? item[propValue] : item}
               >
                  {propContent ? item[propContent] : item}
               </option>
            )
         })}
         {extraOption ? <option value={extraOption.value}> {extraOption.content} </option> : null}
      </select>
   )
}

export default SelectInput