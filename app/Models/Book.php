<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public static function getFinalPrice($listing){
        return $listing->selectraw('case
        when ( discount.discount_price isnull ) then book.book_price
        else discount.discount_price 
        end as finalprice
        ');
    }
    public static function getFinalPriceByBook($id){
        $listing=Book::where('book.id',$id)
                      ->leftjoin('discount','book.id','=','discount.book_id')
                      ->groupBy('book.id','discount.discount_price');
        $listing=Book::getFinalPrice($listing);
        $res = $listing->get();
        return $res[0]->finalprice;
    }
    public function author(){
        return $this->belongsTo(Author::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
}
