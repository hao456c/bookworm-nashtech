<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
class AuthorController extends Controller
{
    public function getAuthorByBook($book_id){
        $authorres = Author::where('book_id',$book_id);
        return $authorres;
    }


    public function getAuthor(){
        $res = Author::orderBy('author_name','asc')->get();
        return $res;
    }


  

}
