<?php

namespace App\Http\Controllers;
use App\Models\Author;
use Illuminate\Http\Request;
use App\http\Resources\AuthorResource;
use App\http\Resources\AuthorCollection;
use App\Repositories\authorRepository;


class AuthorController extends Controller
{
    protected $authorRepo;

    public function __construct(authorRepository $authorRepo)
    {
        $this->authorRepo = $authorRepo;
    }


    // public function getAuthorByBook($book_id){
    //     try {
    //         $authorres = $this->authorRepo->getAuthorByBook($book_id);
    //         return response()->json(new AuthorResource($authorres),200);
    //     } catch (\Exception $e) {
    //         return response()->json('Uncessfully',500);
    //     }
        
    // }


    public function getAuthor(){
        try {
            $authorres = $this->authorRepo->index();
            return response()->json(new AuthorCollection($authorres),200);
        } catch (\Exception $e) {
            return response()->json(500);
        }
    }


  

}
