<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory
{
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'unit_number' => fake()->bothify('??-###'),
            'floor' => fake()->numberBetween(1, 15),
            'size' => fake()->randomFloat(2, 600, 3000),
            'bedroom' => fake()->numberBetween(1, 4),
            'bathroom' => fake()->numberBetween(1, 3),
            'price' => fake()->randomFloat(2, 3000000, 25000000),
            'status' => 'available',
        ];
    }
}