<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\models\Order;
use App\Models\Book;
use Carbon\Carbon;
use Exception;

class OrderRepository
{
    public function createOrder($userID,$orderItemArray)
    {
        DB::beginTransaction();
        try{
            $order_amount = 0;
            foreach($orderItemArray as $item=>$value){
                $orderItemArray[$item]['price'] =
                Book::getFinalPriceByBook( $orderItemArray[$item]['book_id']);
                $order_amount += $orderItemArray[$item]['price'];
            }
            $order = Order::create([
                    'user_id' => $userID,
                    'order_date' => Carbon::now(),
                      'order_amount' => $order_amount,
            ]);
            foreach($orderItemArray as $item=>$value){
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
