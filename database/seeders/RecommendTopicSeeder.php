<?php

namespace Database\Seeders;

use App\Models\RecommendTopic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecommendTopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RecommendTopic::create([
            'id' => 1,
            'recommend_id' => 1,
            'topic_id' => 1
        ],
        [
            'id' => 2,
            'recommend_id' => 1,
            'topic_id' => 2
        ]);
    }
}
