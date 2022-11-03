<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\categoryRepository;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
class CategoryController extends Controller
{
    protected $categoryRepo;

    public function __construct(categoryRepository $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    function index(){
        try {
            $cateRes = $this->categoryRepo->index();
            return response()->json(new categoryCollection($cateRes),200);
        } catch (\Exception $e) {
            return response()->json('Uncessfully',500);
        }
    }
}
