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

export async function GET() {
  try {
    await connectToDB();
    const confessions = await collections.confessions?.find().toArray();
    return NextResponse.json(confessions);
  } catch (error) {
    console.log('Problem with GET request:', error);
  }
}

// export async function GET() {
//   const confessions = [
//     {
//         "_id": "660db75fe4fcb779b21713ab",
//         "text": "I like to go, \"Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!\""
//     },
//     {
//         "_id": "660dc485c39a48c6e749197f",
//         "text": "I have a paper"
//     }
//   ];
//   try {
//     return NextResponse.json(confessions);
//   } catch (error) {
//     console.log('Problem with GET request:', error);
//   }
// }