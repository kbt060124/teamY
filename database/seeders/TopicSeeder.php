<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::truncate();

        $params = 
        [
            [
                'id' => 1,
                'name' => 'プログラミング'
            ],
            [
                'id' => 2,
                'name' => '起業'
            ]
        ];

        foreach ($params as $param) {
            Topic::insert($param);
        }

    }
}
