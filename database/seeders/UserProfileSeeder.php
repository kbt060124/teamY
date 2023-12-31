<?php

namespace Database\Seeders;

use App\Models\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserProfile::create([
            'id' => 1,
            'email' => 'teamy-test1@gmail.com',
            'name' => '山田 太郎',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon.png'
        ],
        [
            'id' => 2,
            'email' => 'teamy-test2@gmail.com',
            'name' => '田中 次郎',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon2.png'
        ],
        [
            'id' => 3,
            'email' => 'teamy-test3@gmail.com',
            'name' => '坂本 花子',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon3.png'
        ]);
    }
}
