<?php

namespace Database\Seeders;

use App\Models\UserComment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserComment::truncate();
        $params = 
        [
            [
                'id' => 1,
                'user_id' => 2,
                'post_comment_id' => 1,
                'comment' => 'ポストに対するコメントです。'
            ],
            [
                'id' => 2,
                'user_id' => 3,
                'post_comment_id' => 2,
                'comment' => 'テストコメントです。'
            ]
        ];

        foreach ($params as $param) {
            UserComment::insert($param);
        }
    }
}
