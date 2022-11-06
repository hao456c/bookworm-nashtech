<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\models\review;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class ReviewRepository
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
        $res = $listing->where('book_id',$request->id)
        ->when($request->has('rating'),function($listing)use($request){
            return $listing->where('rating_start',$request->rating);      
        })
        ->paginate($request->limit);
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

    public function getRatingAvg($id){
        $ratingAvg = Review::where('book_id', $id) -> avg('rating_start');
        return $ratingAvg;
    }

    public function getCountStars($bookId){
        // If star not rated, set count = 0 and sort by rating_start
        
        $countStars = Review::selectRaw('rating_start, count(rating_start) as count_rating_start')
                        ->  where('book_id', $bookId)
                        ->  groupBy('rating_start')
                        ->  orderBy('rating_start', 'desc')
                        ->  get();

        for($i = 5; $i >= 1; $i--){
            $isExist = false;
            foreach($countStars as $countStar){
                if($countStar -> rating_start == $i){
                    $isExist = true;
                    break;
                }
            }
            if(!$isExist){
                $countStars -> push((object) ['rating_start' => $i, 'count_rating_start' => 0]);
            }
        }
        return $countStars;
    }
}
