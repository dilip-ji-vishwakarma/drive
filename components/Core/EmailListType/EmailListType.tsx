"use client"
import React, { useState, useMemo } from 'react';
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { CiCircleRemove } from 'react-icons/ci';

type EmailListProps = {
  name: string;
  label?: string;
  placeholder: string;
  required: boolean;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const EmailListType = ({ name, label, placeholder, required, control, errors }: EmailListProps) => {
  const [text, setText] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);

  const inputValues = useMemo(() => emailList, [emailList]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, onChange: (value: string[]) => void) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (text.trim()) {
        const newEmailList = [...inputValues, text.trim()];
        setEmailList(newEmailList);
        setText("");
        onChange(newEmailList); // Update react-hook-form value as an array
      }
    }
    if (e.key === "Backspace" && text === "") {
      const newArray = inputValues.slice(0, -1);
      setEmailList(newArray);
      onChange(newArray); // Update react-hook-form value as an array
    }
  };

  const handleRemove = (email: string, onChange: (value: string[]) => void) => {
    const newArray = inputValues.filter(item => item !== email);
    setEmailList(newArray);
    onChange(newArray); // Update react-hook-form value as an array
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: required && emailList.length === 0 }} 
        render={({ field: { onChange, value } }) => (
          <div>
            {label ? (
              <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>
                {label} {required && emailList.length === 0 && <span className='text-red-500'>*</span>}
              </label>
            ) : null}
            <div className="relative">
              <div className="flex min-h-[50px] w-full flex-wrap items-center justify-start gap-2 rounded border p-[5px] text-sm mt-[12px]">
                {inputValues.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded border bg-slate-100 p-1 dark:bg-slate-800"
                  >
                    {item}
                    <button onClick={() => handleRemove(item, onChange)} type="button" className="hover:text-[var(--primary)]">
                      <CiCircleRemove size={20} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="flex  flex-grow items-center justify-between rounded border-0 bg-transparent text-sm outline-none"
                  placeholder={placeholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, onChange)}
                />
              </div>
            </div>
          </div>
        )}
      />
      <div className='mt-[10px]'>
        {errors[name] && <span className="text-red-500 text-sm">Please Enter {name}</span>}
      </div>
    </div>
  );
};
