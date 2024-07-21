

import React, { useState } from 'react'
import { Id, Task } from '../utils/types'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false)
    const [editMode, setEditMode] = useState(false)


    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    }

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return <Card ref={setNodeRef} style={style} className=' h-[120px] min-h-[120px] m-4 bg-secondary opacity-30' />
    }
    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}  {...listeners}
                className='m-4 items-center text-left h-[120px] min-h-[120px] bg-secondary p-2 rounded-lg hover:ring-1 hover:ring-primary cursor-grab'>
                <textarea className='h-[90%] w-full text-primary bg-transparent resize-none focus:outline-none'
                    value={task.content}
                    autoFocus
                    placeholder='Task content here'
                    onBlur={toggleEditMode}
                    onKeyDown={e => {
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode();
                    }}
                    onChange={e => updateTask(task.id, e.target.value)}
                ></textarea>
            </div>
        )
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}  {...listeners}
            onClick={toggleEditMode}
            onMouseEnter={() => { setMouseIsOver(true) }}
            onMouseLeave={() => { setMouseIsOver(false) }}
            className='m-4 bg-secondary hover:ring-1 hover:ring-primary cursor-grab'
        >
            <CardContent className='relative p-2'>
                <p className='overflow-y-auto overflow-x-hidden h-[100px] min-h-[100px] w-full whitespace-pre-wrap text-left' >
                    {task.content}
                </p>
                {mouseIsOver && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className='absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100'
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                        }}
                    >
                        <Trash2 />
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
