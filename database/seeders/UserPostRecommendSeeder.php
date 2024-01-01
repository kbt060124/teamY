<?php

namespace Database\Seeders;

use App\Models\UserPostRecommend;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPostRecommendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPostRecommend::create([
            'id' => 1,
            'user_id' => 1,
            'recommended_user_id' => 2,
            'title' => 'テストタイトル',
            'text' => 'レコメンドした既存ユーザの紹介文が入ります。',
            'accept_flg' => 1,
            'things_flg' => 0
        ],
        [
            'id' => 2,
            'user_id' => 1,
            'title' => 'テストタイトル２',
            'text' => 'レコメンドしたアプリ上にいない人の紹介文が入ります。',
            'accept_flg' => 1,
            'things_flg' => 0,
            'recommended_guest_id' => 'uuidtest'
        ],
        [
            'id' => 3,
            'user_id' => 2,
            'recommended_user_id' => 3,
            'title' => 'テストタイトル３',
            'text' => 'レコメンドした既存ユーザの紹介文が入ります。',
            'accept_flg' => 1,
            'things_flg' => 0
        ]);
    }
}
