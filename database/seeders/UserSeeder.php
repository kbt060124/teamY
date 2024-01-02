<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $param1=
        [
            'title' => '決め台詞を書く',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon.png'
        ];
        User::where('id', 1)->update($param1);  

        $param2=
        [
            'title' => '決め台詞を書く',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon2.png'
        ];
        User::where('id', 2)->update($param2);  

        $param3=
        [
            'title' => '決め台詞を書く',
            'text' => '自分の紹介文を書く欄です。',
            'icon' => 'dummy_icon3.png'
        ];
        User::where('id', 3)->update($param3);  
    }
}
