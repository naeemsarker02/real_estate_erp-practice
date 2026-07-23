<?php

namespace Database\Factories;

use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'unit_id' => Unit::factory(),
            'customer_id' => User::factory()->state(['role' => 'customer']),
            'employee_id' => null,
            'booking_date' => fake()->dateTimeBetween('-2 months', 'now'),
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }
}