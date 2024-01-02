<?php

namespace Database\Seeders;

use App\Models\UserPostThank;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPostThankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPostThank::truncate();
        $params = 
        [
            [
                'id' => 1,
                'user_id' => 1,
                'thanks_user_id' => 2,
                'message' => '無事繋がれました。ありがとうございました。'
            ],
            [
                'id' => 2,
                'user_id' => 3,
                'thanks_user_id' => 1,
                'message' => '仕事につながりました。ありがとうございました。'
            ]
        ];

        foreach ($params as $param) {
            UserPostThank::insert($param);
        }
    }
}
