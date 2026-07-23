<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    protected $fillable = ['booking_id', 'doc_type', 'file_path'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}