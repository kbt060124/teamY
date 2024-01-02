<?php

namespace Database\Seeders;

use App\Models\GuestRecommend;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuestRecommendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GuestRecommend::truncate();
        GuestRecommend::create([
            'id' => 1,
            'recommend_id' => 2,
            'name' => 'ゲスト 四郎',
            'icon' => 'dummy_icon4.png'
        ]);
    }
}
