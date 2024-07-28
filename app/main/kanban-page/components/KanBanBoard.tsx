"use client"

import React, { useMemo, useState, useEffect, useId } from 'react'
import { PlusCircle } from "lucide-react";
import { Column, Id, Task } from '../utils/types';
import nextId from 'react-id-generator';
import ColumnContainer from './ColumnContainer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    SortableContext,
    arrayMove,
} from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';

export default function KanBanBoard() {
    const [columns, setColumns] = useState<Column[]>([])
    const columnsIds = useMemo(() => columns.map((column) => column.id), [columns])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [isClient, setIsClient] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([])


    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        }
    }))

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <ScrollArea className='overflow-y-hidden snap-x snap-mandatory m-auto flex items-start h-full'>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <section className='m-auto flex gap-4 h-full'>
                    <div className='flex gap-4 h-full'>
                        <SortableContext items={columnsIds}>
                            {columns.map((column, index) => (
                                <ColumnContainer
                                    key={index}
                                    column={column}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    tasks={tasks.filter((task) => task.columnId === column.id)} deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            createColumn()
                        }}
                        type="button" className="h-[60px] w-[420px] min-w-[400px] my-2 rounded-sm bg-secondary hover:bg-secondary/95 items-center flex gap-1 text-xl px-4 text-primary">
                        <PlusCircle />Add Column
                    </button>
                </section>
                {isClient && createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                                deleteTask={deleteTask}
                                updateTask={updateTask}

                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>, document.body
                )}
            </DndContext>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )

    function deleteColumn(id: Id) {
        setColumns((prevColumns) => prevColumns.filter((column) => column.id !== id))

        setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== id))
    }

    function createColumn() {
        const columnToAdd: Column = {
            id: nextId(),
            title: `Column ${columns.length + 1}`,
        }

        setColumns((prevColumn) => [...prevColumn, columnToAdd])
    }

    function onDragStart(event: DragStartEvent) {

        if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column)
            return;
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
            return;
        }
    }

    function onDragOver(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((task) => {
                const activeTaskIndex = task.findIndex((task) => task.id === active.id);
                const overTaskIndex = task.findIndex((task) => task.id === over.id);

                task[activeTaskIndex].columnId = task[overTaskIndex].columnId;

                return arrayMove(task, activeTaskIndex, overTaskIndex)

            })

        }

        const isOverAColumn = over.data.current?.type === 'Column';
        if (isActiveTask && isOverAColumn) {
            setTasks((task) => {
                const activeTaskIndex = task.findIndex((task) => task.id === active.id);

                task[activeTaskIndex].columnId = overId;

                return arrayMove(task, activeTaskIndex, activeTaskIndex)

            })
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;
        const activeColumnId = active.id;
        const overColumnId = over.id;
        if (activeColumnId === overColumnId) return;
        setColumns(columns => {
            const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId);
            const overColumnIndex = columns.findIndex((column) => column.id === overColumnId);
            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    function updateColumn(id: Id, title: string) {
        const newColumn = columns.map((column) => {
            if (column.id !== id) return column;
            if (column.id === id) {
                return {
                    ...column,
                    title,
                }
            }
            return column;
        })
        setColumns(newColumn);
    }
    function createTask(columnId: Id) {
        const taskToAdd: Task = {
            id: generateUniqueId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        }
        setTasks((prevTasks) => [...prevTasks, taskToAdd])
    }
    function deleteTask(id: Id) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }
    function updateTask(id: Id, content: string) {

        const newTask = tasks.map((task) => {

            if (task.id !== id) return task;
            if (task.id === id) {
                return {
                    ...task,
                    content,
                }
            }
            return task;
        })
        setTasks(newTask);
    }
    function generateUniqueId(): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
