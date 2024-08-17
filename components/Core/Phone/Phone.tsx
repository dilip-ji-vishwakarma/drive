import React from 'react';
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { MdMyLocation } from 'react-icons/md';

type InputProps = {
  name: string;
  label?: string;
  placeholder: string;
  defaultValue?: string;
  required: boolean;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Phone = ({ name, placeholder, label, defaultValue, control, errors, required}: InputProps) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{ required: required }} 
        render={({ field: { onChange, value } }) => (
          <div>
            {label ? (
              <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>{label}</label>
            ) : (null)}
            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
            
              <input
                type="text"
                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px]"
                placeholder={placeholder}
                autoComplete="off"
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, ''); 
                    onChange(newValue.slice(0, 10)); 
                  }}
              />
            </span>
          </div>
        )}
      />
      <div className='mt-[10px]'>
      {errors[name] && <span className="text-red-500 text-sm">Please Enter {placeholder}</span>}
      </div>
    </div>
  );
};

