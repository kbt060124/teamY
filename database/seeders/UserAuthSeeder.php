<?php

namespace Database\Seeders;

use App\Models\UserAuth;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserAuth::truncate();
        $params = 
        [
            [
                'id' => 1,
                'user_id' => 1,
                'auth_email' => 'teamy-test@gmail.com',
                'name' => '山田 太郎'
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'auth_email' => 'teamy-test2@gmail.com',
                'name' => '田中 次郎'
            ],
            [
                'id' => 3,
                'user_id' => 3,
                'auth_email' => 'teamy-test3@gmail.com',
                'name' => '坂本 花子'
            ]
        ];

        foreach ($params as $param) {
            UserAuth::insert($param);
        }
        
    }
}
