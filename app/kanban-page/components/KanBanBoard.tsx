"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { PlusCircle } from "lucide-react";
import { Column, Id } from '../utils/types';
import nextId from 'react-id-generator';
import ColumnContainer from './ColumnContainer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    SortableContext,
    arrayMove,
} from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

export default function KanBanBoard() {
    const [columns, setColumns] = useState<Column[]>([])
    const columnsIds = useMemo(() => columns.map((column) => column.id), [columns])
    const [activeColumns, setActiveColumn] = useState<Column | null>(null)
    const [isClient, setIsClient] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        }
    }))

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <ScrollArea className='overflow-y-hidden pt-24 px-4 h-screen snap-x snap-mandatory m-auto flex  w-full items-start'>
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <section className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsIds}>
                            {columns.map((column, index) => (
                                <ColumnContainer key={index} column={column} deleteColumn={deleteColumn} updateColumn={updateColumn} />
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
                        {activeColumns && (
                            <ColumnContainer column={activeColumns} deleteColumn={deleteColumn} updateColumn={updateColumn} />)
                        }
                    </DragOverlay>, document.body
                )}
            </DndContext>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )

    function deleteColumn(id: Id) {
        setColumns((prevColumns) => prevColumns.filter((column) => column.id !== id))
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
    }

    function onDragEnd(event: DragEndEvent) {
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
}
