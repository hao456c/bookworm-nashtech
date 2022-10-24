<?php

namespace App\Repositories;
use Illuminate\Http\Request;
use App\models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class bookrepository
{
     public function filterrequest(Request $request)
    {


                $listing = Book::select('book.id','book_title','book_cover_photo','book_price')
                ->leftjoin('discount','book.id','=','discount.book_id')
                ->leftjoin('review','book.id','=','review.book_id')
                ->groupBy('book.id','discount.discount_price',
                          'discount.discount_start_date',
                          'discount.discount_end_date')
                ->selectraw('case
                          when ( discount.discount_price isnull ) then book.book_price
                          else discount.discount_price 
                          end as finalprice
                          ')
                ->selectRaw('case
                            when (
                                now() >= discount.discount_start_date 
                                and
                                ( now() <= discount.discount_end_date 
                                or discount.discount_end_date is null )
                            ) then floor((book.book_price - discount_price)/book.book_price*100)
                            else 0
                            end as sale
                            ')
                ->selectraw('case
                            when ( Round(avg(rating_start),2) isnull ) then 0
                            else Round(avg(rating_start),2) 
                            end as avgstar 
                            ')
                ->selectraw('case
                            when ( Count(rating_start) = 0 ) then 0
                            else Count(rating_start) 
                            end as review
                            ')
                ->when($request->has('author'),function($listing) use($request){
                        return $listing->where('author_id', $request->author);
                })
                ->when($request->has('category'),function($listing) use($request){
                        return $listing->where('category_id', $request->category);
                })
                ->when($request->has('rating'),function($listing)use($request){
                        return $listing->havingraw('avg(rating_start)>='.$request->rating);      
                });
                switch($request->sort){
                    case 1: $listing->orderBy('discount.discount_price','desc');
                            break;
                    case 2: $listing->orderBy('avgstar','asc');
                            break;
                    case 3: $listing->orderBy('finalprice','asc');
                            break;
                    case 4: $listing->orderBy('finalprice','desc');
                            break;
                    default: $listing->orderBy('book.id','asc');
                            break;
                }
        $res = $listing->paginate($request->limit);
           return $res;    
    }
    public function getDetailBook($id){
        return Book::find($id);
    }
    public static function getFinalPriceByBook($id){
                $listing=Book::where('book.id',$id)
                              ->leftjoin('discount','book.id','=','discount.book_id')
                              ->groupBy('book.id','discount.discount_price');
                $listing=Book::getFinalPrice($listing);
                
                return $listing->get();
    }
    public function getHomeBookOnSale(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);
        $listing->orderByDesc(DB::raw('case
                  when ( discount.discount_price isnull ) then 0
                  else book_price - discount.discount_price 
                  end
                  '));
        return $listing->take(10)->get();
    }

    public function getHomeBookByRecommended(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->leftjoin('review','book.id','=','review.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);         
        $listing->orderByDesc(DB::raw('case
        when ( avg(rating_start) isnull ) then 0
        else Round(avg(rating_start),1)
        end
        '))
        ->orderBy('finalprice','asc');
        return $listing->take(8)->get();
    }

    public function getHomeBookByPopular(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->leftjoin('review','book.id','=','review.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);
        $listing->orderByDesc(DB::raw('count(rating_start)'))
        ->orderBy('finalprice','asc');
        return $listing->take(8)->get();
    }
}