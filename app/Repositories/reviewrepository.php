<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\models\review;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class reviewRepository
{
    
    public function getReviewByBook(Request $request)
    {
        
        $listing = Review::select('*');
        switch($request->sortby){
            case 1:$listing->orderBy('review_date','asc');
                    break;
            case 2:$listing->orderBy('review_date','desc');
                    break;
            default:$listing->orderBy('review_date','asc');
                    break;
        }
        $res = $listing->where('book_id',$request->id)->paginate($request->limit);
        return $res;
    }

    public function createReview(Request $request){
            $review = Review::create([
                    'book_id' => (int)$request->book_id,
                    'review_title' => $request->review_title,
                    'review_details' => $request->review_details,
                    'review_date' => Carbon::now(),
                    'rating_start' => $request->rating_start
            ]);
            DB::commit(); 
            return $review;
    }
}
