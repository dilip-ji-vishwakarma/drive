import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

type InputProps = {
    name: string,
    label?: string,
    placeholder?: string;
    defaultValue?: string;
    required: boolean,
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const InputText = ({ name, label, placeholder, required, defaultValue, control, errors }: InputProps) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                    <div>
                        <div className='flex items-center space-x-1'>
                            <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>
                                {label}
                            </label>
                        </div>
                        <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
                            <input
                                type="text"
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                placeholder={placeholder || ""}
                                autoComplete="off"
                                value={value}
                                onChange={onChange}
                            />
                        </span>
                    </div>
                )}
            />
            {errors[name] && <span className="text-red-500 text-sm">Please Enter {name}</span>}
        </div>
    )
}
