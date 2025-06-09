<?php
namespace App\Services;
use App\Models\InforProduct;

class InforProductService
{
    /**
     * Get all InforProducts.
     *
     */
    public function getAll()
    {
        return InforProduct::all();
    }

    /**
     * Find an InforProduct by ID.
     *
     * @param int $id
     * @return \App\Models\InforProduct|null
     */
    public function find($id)
    {
        return InforProduct::find($id);
    }

    /**
     * Create a new InforProduct.
     *
     * @param array $data
     * @return \App\Models\InforProduct
     */
    public function create(array $data)
    {
        return InforProduct::create($data);
    }

    /**
     * Update an existing InforProduct.
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\InforProduct
     */
    public function update($id, array $data)
    {
        $inforProduct = $this->find($id);
        if ($inforProduct) {
            $inforProduct->update($data);
        }
        return $inforProduct;
    }

    /**
     * Delete an InforProduct by ID.
     *
     * @param int $id
     * @return bool|null
     */
    public function delete($id)
    {
        $inforProduct = $this->find($id);
        if ($inforProduct) {
            return $inforProduct->delete();
        }
        return null;
    }
}
