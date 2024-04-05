// create CREATE/POST and READ/GET routes

import { collections, connectToDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const confession = await req.json();
    const result = await collections.confessions?.insertOne(confession);
    return NextResponse.json({success: true});
  } catch (error) {
    console.log('Problem with POST request:', error);
  }
}

// export async function GET() {
//   try {
//     await connectToDB();
//     const confessions = await collections.confessions?.find().toArray();
//     return NextResponse.json(confessions);
//   } catch (error) {
//     console.log('Problem with GET request:', error);
//   }
// }

export async function GET() {
  try {
    return NextResponse.json({test: 'test'});
  } catch (error) {
    console.log('Problem with GET request:', error);
  }
}