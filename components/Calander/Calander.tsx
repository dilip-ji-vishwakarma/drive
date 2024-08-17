"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import { useForm } from 'react-hook-form';
import { Form } from '../Form';
import axios from 'axios';

type Event = {
    start: Date | string;
    allDay: boolean;
    id: number;
    title?: string;
    notification_platform?: string;
    notification_email?: string[];
    whatsapp_number?: string;
    phone_number?: string;
    notification_type?: string;
    notification_time?: string;
    notification_message?: string;
};

export const Calander = () => {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formfield, setFormField] = useState<Event | null>(null);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el');
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("data");
                    let start = eventEl.getAttribute("start");
                    return { title, id, start };
                }
            });
        }
    }, []);

    const handleDateClick = (arg: { date: Date, allDay: boolean }) => {
        const localDate = new Date(arg.date);
        localDate.setHours(10, 0, 0, 0);
        const newId = new Date().getTime();

        setFormField({
            start: localDate.toISOString(),
            allDay: arg.allDay,
            id: newId,
            title: '',
            notification_platform: '',
            notification_email: [''],
            whatsapp_number: '',
            phone_number: '',
            notification_type: '',
            notification_time: '',
            notification_message: '',
        });

        setIsEditing(false);
        reset();
        setShowModal(true);
    };

    const addEvent = (data: DropArg) => {
        const newId = new Date().getTime();
        const event = {
            ...formfield,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: newId,
        };
        console.log("Adding event:", event);
        setAllEvents([...allEvents, event]);
    };

    const handleUpdateModal = (data: { event: { id: string } }) => {
        const eventId = Number(data.event.id);
        const eventToEdit = allEvents.find(event => event.id === eventId);

        if (eventToEdit) {
            setFormField(eventToEdit);
            setIsEditing(true);
            Object.keys(eventToEdit).forEach(key => {
                setValue(key as keyof Event, eventToEdit[key as keyof Event]);
            });
            setShowModal(true);
        }
    };

    const handleDelete = () => {
        if (formfield) {
            setAllEvents(allEvents.filter(event => event.id !== formfield.id));
        }
        setShowModal(false);
        reset();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        reset();
    };

    const onSubmit = async (data: any) => {
        const updatedEvent = { ...formfield, ...data };
        console.log("Current newEvent state:", updatedEvent);

        // if (isEditing) {
        //     setAllEvents(allEvents.map(event => event.id === formfield!.id ? updatedEvent : event));
        // } else {
        //     setAllEvents([...allEvents, updatedEvent]);
        // }

        // setShowModal(false);
        // reset();

        try {
            if (isEditing) {
                // Update existing event
                await axios.put('https://ashma-78c83-default-rtdb.firebaseio.com/ashma.json', updatedEvent);
                setAllEvents(allEvents.map(event => event.id === formfield!.id ? updatedEvent : event));
            } else {
                // Add new event
                await axios.post('https://ashma-78c83-default-rtdb.firebaseio.com/ashma.json', updatedEvent);
                setAllEvents([...allEvents, updatedEvent]);
            }
            setShowModal(false);
            reset();
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{ left: 'prev,next', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
                events={allEvents as EventSourceInput}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick={handleDateClick}
                drop={addEvent}
                eventClick={handleUpdateModal}
            />
            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {isEditing ? 'Edit Event' : 'Add Event'}
                                            </Dialog.Title>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Form control={control} errors={errors} defaultPlatform={formfield?.notification_platform}/>
                                                <div className="mt-5 sm:mt-6">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed sm:text-sm"
                                                    >
                                                        {isSubmitting ? "Saving..." : "Save"}
                                                    </button>
                                                    {isEditing && (
                                                        <button
                                                            type="button"
                                                            onClick={handleDelete}
                                                            className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed sm:text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
