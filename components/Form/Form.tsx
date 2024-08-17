import React, { useState, useMemo } from 'react'
import { EmailListType, InputEmail, InputSelect, InputText, InputTime, Phone, TextArea } from '../Core'
import { Control, FieldValues, DeepMap, FieldError } from 'react-hook-form'

type FormProps = {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    control: Control<FieldValues>
    errors: DeepMap<FieldValues, FieldError>
    defaultPlatform?: string;
}

export const Form = ({ onChange, control, errors, defaultPlatform }: FormProps) => {
    const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(defaultPlatform)

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlatform(e.target.value)
        if (onChange) {
            onChange(e)
        }
    }

    const platformSpecificField = useMemo(() => {
        switch (selectedPlatform) {
            case 'Email':
                return <InputEmail name="notification_email" placeholder="Enter Your Email" required={true} control={control} errors={errors} />
            case 'Whatsapp':
                return <Phone name='whatsapp_number' placeholder='Enter Whatsapp Number' required={true} control={control} errors={errors} />
            case 'SMS':
                return <Phone name='phone_number' placeholder='Enter Phone Number' required={true} control={control} errors={errors} />
            default:
                return null
        }
    }, [selectedPlatform, control, errors])

    return (
        <div className="mt-2">
            <InputText name="title" required={false} placeholder='Title' control={control} errors={errors} />
            <InputSelect
                name="notification_platform"
                required={true}
                options={["Email", "Whatsapp", "SMS"]}
                predefault="Select Notification Platform"
                control={control}
                errors={errors}
                onChange={handleSelectChange}
            />
            {platformSpecificField}
            <InputSelect
                name="notification_type"
                required={true}
                options={["Event", "Task", "Appointment schedule"]}
                predefault="Select Notification Type"
                control={control}
                errors={errors}
            />
            <InputTime name='notification_time' required={true} control={control} errors={errors} />
            <TextArea name='notification_message' required={true} placeholder='Enter Message' control={control} errors={errors} />
        </div>
    )
}
