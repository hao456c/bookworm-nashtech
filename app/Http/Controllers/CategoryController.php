<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    function index(){
        return response()->json(Category::all(),200);
    }
}
