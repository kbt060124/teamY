<?php

namespace Database\Seeders;

use App\Models\UserTopic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserTopic::truncate();
        $params = 
        [
            [
                'id' => 1,
                'user_id' => 1,
                'topic_id' => 1
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'topic_id' => 2
            ]
        ];

        foreach ($params as $param) {
            UserTopic::insert($param);
        }
    }
}
