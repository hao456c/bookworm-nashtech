<?php

namespace App\Repositories;

use App\models\Author;

class AuthorRepository
{
    public function index()
    {
        return Author::orderby('author_name','asc')->get();
    }

    public function getAuthorByBook($id)
    {
        return Author::find($id);
    }
}
