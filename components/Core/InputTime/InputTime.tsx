import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

type InputTime = {
  name: string;
  label?: string;
  required: boolean;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const InputTime = ({name, label, required, control, errors}: InputTime) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        rules={{ required: required }}
        render={({ field: { onChange, value } }) => (
        <>
            {label ? (
              <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>{label}</label>
            ) : (null)}
            
              <input
                id="date" 
                type="time"
                className='form-control relative w-full border rounded-md border-solid border-[#BEBEBE] mt-[10px] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] pl-2 pr-0'
                placeholder=""
                value={value}
                onChange={onChange}
              />
           
            </>
        )}
      />
      <div className='mt-[10px]'>
        {errors[name] && <span className="text-red-500 text-sm">Please Enter {name}</span>}
      </div>
    </div>
  )
}
