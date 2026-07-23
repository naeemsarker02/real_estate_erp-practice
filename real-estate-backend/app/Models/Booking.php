<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['unit_id', 'customer_id', 'employee_id', 'booking_date', 'status'];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}