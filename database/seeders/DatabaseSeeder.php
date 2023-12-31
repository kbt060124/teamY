<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(GuestRecommendSeeder::class);
        $this->call(RecommendTopicSeeder::class);
        $this->call(TopicSeeder::class);
        $this->call(UserAuthSeeder::class);
        $this->call(UserCommentSeeder::class);
        $this->call(UserFollowerSeeder::class);
        $this->call(UserInvitationSeeder::class);
        $this->call(UserPostNewsSeeder::class);
        $this->call(UserPostRecommendSeeder::class);
        $this->call(UserPostSeeder::class);
        $this->call(UserPostThankSeeder::class);
        $this->call(UserProfileSeeder::class);
        $this->call(UserTopicSeeder::class);
    }
}
