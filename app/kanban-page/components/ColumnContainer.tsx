import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Column, Id, Task } from "../utils/types"
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    tasks: Task[];
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props;
    const [editMode, setEditMode] = useState(false)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id)
    }, [tasks])

    if (isDragging) {
        return <Card ref={setNodeRef} style={style} className="h-[85dvh] w-[400px] border-primary"></Card>
    }

  
    return (
        <Card
            ref={setNodeRef}
            style={style}
            className='snap-center h-[85dvh] w-[400px]'>
            <CardHeader {...attributes}  {...listeners}>
                <div className="bg-secondary m-2 p-3 rounded-sm flex justify-between items-center cursor-move">
                    <div className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setEditMode(true)}
                    >
                        <div className="bg-primary/15 text-sm text-primary px-3 py-1 rounded-full ">{tasks.length}</div>
                        {!editMode && (
                            <CardTitle className="text-ellipsis whitespace-nowrap border w-[200px] overflow-hidden">
                                {column.title}
                            </CardTitle>
                        )}
                        {editMode && (
                            <Input type="text" autoFocus
                                value={column.title}
                                onBlur={() => setEditMode(false)}
                                onChange={e => updateColumn(column.id, e.target.value)}
                                onKeyDown={e => {
                                    if (e.key !== "Enter") return;
                                    setEditMode(false);
                                }}
                            />
                        )}
                    </div>
                    <Button onClick={() => { deleteColumn(column.id) }} variant="ghost" size="icon">
                        <Trash />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-1 mb-3">
                <ScrollArea className="h-[66vh] w-full">
                    <SortableContext items={tasksIds}>
                        {tasks.map((task) => {
                            return (
                                <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                            )
                        })}
                    </SortableContext>
                </ScrollArea>
            </CardContent>
            <CardFooter className="">
                <Button className="w-full h-full" onClick={() => { createTask(column.id) }}>
                    <PlusIcon /> Add Task
                </Button>
            </CardFooter>
        </Card>
    )
}
