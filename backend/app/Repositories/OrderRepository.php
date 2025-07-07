<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{

    protected $model;

    public function __construct(Order $model)
    {
        $this->model = $model;
    }


    public function getAll()
    {
        return Order::all();
    }

    public function create(array $data)
    {
        return Order::create($data);
    }

    public function find($id)
    {
        return Order::find($id);
    }

    public function update($id, array $data)
    {
        $order = Order::find($id);
        if ($order) {
            $order->update($data);
        }
        return $order;
    }

    public function delete($id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->delete();
        }
        return $order;
    }

  public function getAllOrdersWithDetails()
    {
        return $this->model->with([
            'user:id,name',
            'orderDetails.product:id,product_name,image,price'
        ])->latest()->get();
    }

    public function getUserOrdersWithDetails($userId)
    {
        return $this->model->where('user_id', $userId)
            ->with([
                'orderDetails.product:id,product_name,image,price'
            ])
            ->get();
    }
}
