import { prisma } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let result = await prisma.todo.findMany();
        return new NextResponse(JSON.stringify(result))
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({error: 'Something went wrong'}),{status: 500})
    }
}
export async function POST(req: Request) {
    console.log(req.body);
    let data = await req.json()
    try {
        let result = await prisma.todo.create({data});
        return new NextResponse(JSON.stringify(result))
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({error: 'Something went wrong'}),{status: 500})
    }
}