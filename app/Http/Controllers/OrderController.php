<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\orderrepository;
class OrderController extends Controller
{   
    protected $orderRepo;

    public function __construct(orderrepository $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    
    public function createorder(Request $request)
    {
        $userID = $request->userID;
        $itemOrderArray = $request->itemOrder;
        
        $res = $this->orderRepo->createOrder($userID,$itemOrderArray);
        return $res;
    }


    // public function showorder($id)
    // {
    //     $res = 'abc';
    //     return response()->json($res, 200);
    // }

}
