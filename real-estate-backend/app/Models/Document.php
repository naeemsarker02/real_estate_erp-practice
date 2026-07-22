<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['booking_id', 'doc_type', 'file_path'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}