import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, {params}:{params: {id: string}}) {
    try {
        let result = await prisma.todo.delete({
            where: {
                id: params.id
            }
        });
        return new NextResponse(JSON.stringify(result))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: 'Something went wrong'}),{status: 500})
    }
}
export async function PUT(req: Request, {params}:{params: {id: string}}) {
    try {
        let result = await prisma.todo.update({
            where: {
                id: params.id
            },
            data: await req.json()
        });
        return new NextResponse(JSON.stringify(result))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: 'Something went wrong'}),{status: 500})
    }
}