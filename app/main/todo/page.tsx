

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Container from '@/app/components/Container'
export default function TodoPage() {


    return (
        <Container className='' hasHeader hasSidebar>
            <div>
                <Card>
                    <CardContent>
                        <Table>
                            <TableCaption>Todo</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Task</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Create At</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>


                                <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
