import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const { query } = await req.json()
        const response = await axios.post('http://localhost:8000/search', { query })
        const searchResult = response.data?.searchResult
        return NextResponse.json({
            success:true,
            message: "Search Result Fetched",
            searchResult
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Next Server Error"
        }, {status: 500})
    }
}