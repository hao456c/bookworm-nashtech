<?php

namespace App\Http\Controllers;

use App\Repositories\bookrepository as bookrepo;
use Illuminate\Http\Request;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\DetailResource;

class BookController extends Controller
{
    protected $bookrepo;
    public function __construct(bookrepo $bookrepo)
    {
        $this->bookrepo = $bookrepo;
    }
    public function getBookByID(StoreBookRequest $request){
        $res = $this->bookrepo->getDetailBook($request->id);
        return response()->json(new BookResource($res),200);
    }
    public function indexshop(Request $request){
        $res = $this->bookrepo->filterrequest($request);
        return new BookCollection($res);
    }
    public function showHomeBookOnSale(){
        $res = $this->bookrepo->getHomeBookOnSale();
        return response()->json($res,200);
    }
    public function showHomeBookRecommended(){
        $res = $this->bookrepo->getHomeBookByRecommended();
        return response()->json($res,200);
    }
    public function showHomeBookPopular(){
        $res = $this->bookrepo->getHomeBookByPopular();
        return response()->json($res,200);
    }
}   
