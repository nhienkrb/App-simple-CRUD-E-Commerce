<?php
namespace App\Services;
use App\Models\Order;

class OrderService
{
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
}