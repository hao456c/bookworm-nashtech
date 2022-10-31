<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Exception;

class ReviewController extends Controller
{
    function getReviewByBook($id){
        $res = Review::where('book_id',$id)->paginate(5);
        if(!$res->isempty()) return response()->json($res,200);
        else return response()->json('',404);
    } 
}
