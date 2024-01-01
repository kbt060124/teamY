<?php

namespace Database\Seeders;

use App\Models\UserPostNews;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPostNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPostNews::create([
            'id' => 1,
            'user_id' => 1,
            'news' => 'ログインユーザ自身が近況を記載します。'
        ],
        [
            'id' => 2,
            'user_id' => 2,
            'news' => '今日は山田さんと初仕事でした。'
        ]);
    }
}
