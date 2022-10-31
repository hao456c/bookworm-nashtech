<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Models\DB;
class BookController extends Controller
{
    public function getBookByID($id){
        $res = Book::find($id);
        return $res;
    }


    protected function filterBookByAuthor($listing,$author_id){
        return $listing->where('author_id', $author_id);
    }


    protected function filterBookByCategory($listing,$category_id){
        return $listing->where('category_id', $category_id);
    }


    protected function filterBookByRating($listing,$rating){
        return  $listing->havingraw('avg(rating_start)>='.$rating)
                        ->orderBy('id');
    }


    protected function sortingby($listing,$sort){
        switch($sort){
            case 1: $listing->orderBy('discount.discount_price','desc')
                        ->orderBy('finalprice','asc');

                    break;
            case 2: $listing->orderBy('avgstar','desc');
                    break;
            case 3: $listing->orderBy('finalprice','asc');
                    break;
            case 4: $listing->orderBy('finalprice','desc');
                    break;
            default: $listing->orderBy('finalprice','asc');
                    break;
        }
        return $listing;
    }
    public function filterrequest(Request $request)
    {
        $listing = Book::select('book.id','book_title','book_cover_photo')
                ->selectRaw('book_price as oldprice')
                ->selectRaw('case
                when (
                now() >= discount.discount_start_date 
                and
                ( now() <= discount.discount_end_date or discount.discount_end_date is null )
                ) then book.book_price - discount_price
                else book.book_price
                end as finalprice
                ')
                ->leftjoin('discount','book.id','=','discount.book_id')
                ->groupBy('book.id','discount.discount_price','discount.discount_start_date','discount.discount_end_date');
        if($request->has('rating')||$request->sortby==2){
            $listing->selectraw('Round(avg(rating_start),2) as avgstar')
                    ->join('review','book.id','=','review.book_id')
                    ->groupBy('book.id');
        }
        if ($request->has('author')) {
            $listing = $this->filterBookByAuthor($listing,$request->author);
        }
        if ($request->has('category')) {
            $listing = $this->filterBookByCategory($listing,$request->category);
        }
        if($request->has('rating')){
            $listing = $this->filterBookByRating($listing,$request->rating);
        }
        $listing = $this->sortingby($listing,$request->sortby);
        $res = $listing->paginate($request->limit);
       
        return $res;    
    }

    public function store(){

    }
}
