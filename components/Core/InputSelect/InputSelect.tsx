import React from 'react';
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

type SelectProps = {
    name: string;
    label?: string;
    required: boolean;
    predefault: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
    options: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedOption?: string;
};

export const InputSelect = ({
    name,
    label,
    required,
    control,
    errors,
    options,
    predefault,
    selectedOption = "",
    onChange,
}: SelectProps) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={selectedOption}
                rules={{ required }}
                render={({ field }) => (
                    <div>
                        <div className='flex items-center space-x-1'>
                            {label && (
                                <label
                                    htmlFor={name}
                                    className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'
                                >
                                    {label}
                                </label>
                            )}
                        </div>
                        <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
                            <select
                                id={name}
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] text-[14px] px-3"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (onChange) onChange(e);
                                }}
                                ref={field.ref}
                            >
                                <option value="" disabled>{predefault}</option>
                                {options.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>
                )}
            />
            {errors[name] && <span className="text-red-500 text-sm">Please select {name}</span>}
        </div>
    );
};
