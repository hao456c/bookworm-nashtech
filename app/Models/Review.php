<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';
    protected $fillable = [
        'book_id',
        'review_title',
        'review_details',
        'review_date',
        'rating_start'
    ];

    public static function avgRating($bookID){
        $avgRating = Review::selectRaw('Round(avg(rating_start),2) as avg_rating')
                        ->  where('book_id', $bookID) -> first()->avg_rating;
        return $avgRating;
    }

    public static function count($bookID){
        $countStars = Review::selectRaw('rating_start, count(rating_start) as count_rating_start')
                        ->  where('book_id', $bookID)
                        ->  groupBy('rating_start')
                        ->  orderBy('rating_start', 'desc')
                        ->  get();
        return $countStars;
    }
}
