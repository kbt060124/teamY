<?php

namespace Database\Seeders;

use App\Models\UserFollower;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserFollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserFollower::truncate();
        $params = 
        [
            [
                'id' => 1,
                'follow_id' => 1,
                'follower_id' => 2,
                'accept_flg' => 1
            ],
            [
                'id' => 2,
                'follow_id' => 2,
                'follower_id' => 1,
                'accept_flg' => 1
            ],
            [
                'id' => 3,
                'follow_id' => 1,
                'follower_id' => 3,
                'accept_flg' => 1
            ]
        ];

        foreach ($params as $param) {
            UserFollower::insert($param);
        }
    }
}
