<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\models\Order;
use App\Models\Order_item;
use Carbon\Carbon;
use Exception;

class orderrepository
{
    public function createOrder($userID,$orderItemArray)
    {
        DB::beginTransaction();
        try{
            $order = Order::create([
                    'user_id' => $userID,
                    'order_date' => Carbon::now(),
                    'order_amount' => Count($orderItemArray),
            ]);
            foreach($orderItemArray as $item=>$value){
                $orderItemArray[$item]['price'] =
                    bookrepository::getFinalPriceByBook( $orderItemArray[$item]['book_id'])[0]->finalprice;
                $orderItemArray[$item]['order_id']=$order->id;
            }
            $order->orderItems()->createMany($orderItemArray);
            DB::commit();
            
            return $order; 
        }catch(\Exception $e){
            DB::rollback();
            return $e;
        }
    }
    
    // public function showOrderUser($id)
    // {
    //     return Order::find($id);
    // }
}
