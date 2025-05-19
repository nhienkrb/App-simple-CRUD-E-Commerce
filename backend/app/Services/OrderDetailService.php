<?php
namespace App\Services;
use App\Models\OrderDetail;


class OrderDetailService
{
    public function getAll()
    {
        return OrderDetail::all();
    }

    public function create(array $data)
    {
        return OrderDetail::create($data);
    }

    public function find($id)
    {
        return OrderDetail::find($id);
    }

    public function update($id, array $data)
    {
        $orderDetail = OrderDetail::find($id);
        if ($orderDetail) {
            $orderDetail->update($data);
        }
        return $orderDetail;
    }

    public function delete($id)
    {
        $orderDetail = OrderDetail::find($id);
        if ($orderDetail) {
            $orderDetail->delete();
        }
        return $orderDetail;
    }
}