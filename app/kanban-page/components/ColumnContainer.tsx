import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Column, Id } from "../utils/types"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Input } from "@/components/ui/input";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
}

export default function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn } = props;
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

    if (isDragging) {
        return <Card ref={setNodeRef} style={style} className="h-[90dvh] w-[400px] border-primary"></Card>
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className='snap-center h-[90dvh] w-[400px]'>
            <CardHeader {...attributes}  {...listeners}>
                <div className="bg-secondary m-2 p-3 rounded-sm flex justify-between items-center">
                    <div className="flex items-center gap-2"
                        onClick={() => setEditMode(true)}
                    >
                        <div className="bg-primary/15 text-sm text-primary px-3 py-1 rounded-full">{"1"}</div>
                        {!editMode && (
                            <CardTitle>
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
            <CardContent className="">
                hello
            </CardContent>
            <CardFooter>
                <h5>footer</h5>
            </CardFooter>
        </Card>
    )
}
