<?php

namespace Database\Seeders;

use App\Models\UserInvitation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserInvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserInvitation::create([
            'id' => 1,
            'user_id' => 1,
            'invitation_key' => 'uuidtest',
            'to_mail' => 'guest@test.com',
            'to_name' => 'ゲスト 幸子',
            'message' => 'アプリに招待します。',
            'accept_flg' => 1
        ]);
    }
}
