<?php

namespace App\Repositories;

use App\models\Category;

class categoryRepository
{
    public function index()
    {
        return category::orderby('category_name','asc')->get();
    }

    public function getCategoryByBook($id)
    {
        return category::find($id);
    }
}
