<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Fixed admin account — সবসময় জানা credential দিয়ে login করার জন্য
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@tphl.com',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Test Customer',
            'email' => 'customer@tphl.com',
            'role' => 'customer',
        ]);

        // 3টা project, প্রতিটাতে 8টা করে unit
        Project::factory(3)
            ->has(Unit::factory()->count(8))
            ->create();
    }
}