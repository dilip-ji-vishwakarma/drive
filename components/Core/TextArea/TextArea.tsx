import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

type TextareaProps = {
    name: string,
    label?: string,
    placeholder?: string;
    required: boolean,
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const TextArea = ({ name, label, placeholder, required, control, errors }: TextareaProps) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                    <div>
                        <div className='flex items-center space-x-1'>
                            <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>
                                {label}
                            </label>
                        </div>
                        <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
                            <textarea
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[100px] placeholder:text-[#9D9D9D] text-[14px] px-3 py-2"
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
