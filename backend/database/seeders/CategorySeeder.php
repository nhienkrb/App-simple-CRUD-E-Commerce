<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        \App\Models\Category::create([
            'category_name' => 'Trà Xanh',
            'slug' => 'tra-xanh',
            'category_image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkjlRPZARqwruahKS2jwNcwU6TDhUyetgBg&s'
        ]); 
        \App\Models\Category::create([
            'category_name' => 'Trà ô long',
            'slug' => 'tra-o-long',
            'category_image' => 'https://sieuthitra.vn/upload/sanpham/tra-oolong-dong-dinh-dai-loan-cao-cap-hop-250gr-1.jpg'
        ]);
    }
}
