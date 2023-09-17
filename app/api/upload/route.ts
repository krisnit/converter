import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { extname } from "path";
import { uploadToBucket } from "@/lib/uploadFile";

export async function POST(req: NextRequest) {

    const data = await req.formData()
    const file = data.get('file') as unknown as File
    if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 })
    const finalType = data.get('finalType') as string
    const initialType = extname(file.name).replace(".", "") as string
    console.log(file.type, initialType)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileLocation = await uploadToBucket(buffer, file.name)

    // upload to google bucket

    // save metadata to db
    const conversion = await prisma.conversion.create({
        data: {
            fileLocation,
            initialType,
            currentType: initialType,
            finalType,
            data: "",
        }
    })

    return NextResponse.json({ id: conversion.id });
}

