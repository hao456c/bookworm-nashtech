<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\reviewRepository;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\ReviewCollection;
use Exception;

class ReviewController extends Controller
{
    protected $reviewRepo;

    public function __construct(reviewRepository $reviewRepo)
    {
        $this->reviewRepo = $reviewRepo;
    }


    function getReviewByBook(Request $request)
    {
        try {
           $reviewRes = $this->reviewRepo->getReviewByBook($request);
            return response()->json(new ReviewCollection($reviewRes), 200);
        } catch (\Exception $e) {
            return response()->json('Uncessfully', 500);
        }
    }
    function createReview(Request $request){
        $request->validate([
            'book_id' => 'required',
            'review_title' =>'required',
            'review_details' => 'required',
            'rating_start' => 'required'
        ]);
        $newReviewRes = $this->reviewRepo->createReview($request);
        return $newReviewRes;
    }
}
