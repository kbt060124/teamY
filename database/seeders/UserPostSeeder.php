<?php

namespace Database\Seeders;

use App\Models\UserPost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPost::truncate();

        $params = 
        [
            [
                'id' => 1,
                'user_id' => 1,
                'type' => 1,
                'post_id' => 1
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'type' => 1,
                'post_id' => 2
            ],
            [
                'id' => 3,
                'user_id' => 1,
                'type' => 3,
                'post_id' => 1
            ],
            [
                'id' => 4,
                'user_id' => 3,
                'type' => 3,
                'post_id' => 2
            ],
            [
                'id' => 5,
                'user_id' => 1,
                'type' => 2,
                'post_id' => 1
            ],
            [
                'id' => 6,
                'user_id' => 1,
                'type' => 2,
                'post_id' => 2
            ],
            [
                'id' => 7,
                'user_id' => 2,
                'type' => 2,
                'post_id' => 3
            ]
        ];

        foreach ($params as $param) {
            UserPost::insert($param);
        }

    }
}
