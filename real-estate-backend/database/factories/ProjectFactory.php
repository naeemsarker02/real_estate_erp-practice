<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Residency',
            'location' => fake()->randomElement(['Gulshan, Dhaka', 'Banani, Dhaka', 'Uttara, Dhaka', 'Dhanmondi, Dhaka']),
            'description' => fake()->paragraph(),
            'total_units' => fake()->numberBetween(10, 50),
            'status' => fake()->randomElement(['planning', 'ongoing', 'completed']),
            'created_by' => User::factory()->state(['role' => 'admin']),
        ];
    }
}