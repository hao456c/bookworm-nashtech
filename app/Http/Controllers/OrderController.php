<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;
use App\Repositories\orderrepository;
class OrderController extends Controller
{   
    protected $orderRepo;

    public function __construct(orderrepository $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    
    public function createorder(StoreOrderRequest $request)
    {
        $itemOrderArray = $request->itemOrder;
        $userID =   $request->user()->id;
        $res = $this->orderRepo->createOrder($userID,$itemOrderArray);
        return response()->json($res,201);
    }


    // public function showorder($id)
    // {
    //     $res = 'abc';
    //     return response()->json($res, 200);
    // }

}
