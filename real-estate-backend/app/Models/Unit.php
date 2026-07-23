<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'unit_number', 'floor', 'size', 'bedroom', 'bathroom', 'price', 'status'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}