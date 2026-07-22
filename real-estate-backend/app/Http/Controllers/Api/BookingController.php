<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'customer') {
            $bookings = Booking::where('customer_id', $request->user()->id)
                ->with('unit', 'unit.project')
                ->get();
        } else {
            $bookings = Booking::with('unit', 'customer', 'employee')->get();
        }

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'booking_date' => 'required|date',
        ]);

        $booking = DB::transaction(function () use ($validated, $request) {
            $unit = Unit::lockForUpdate()->findOrFail($validated['unit_id']);

            if ($unit->status !== 'available') {
                abort(422, 'This unit is no longer available for booking.');
            }

            $booking = Booking::create([
                'unit_id' => $unit->id,
                'customer_id' => $request->user()->id,
                'booking_date' => $validated['booking_date'],
                'status' => 'pending',
            ]);

            $unit->update(['status' => 'reserved']);

            return $booking;
        });

        return response()->json($booking, 201);
    }

    public function show(Booking $booking)
    {
        return response()->json($booking->load('unit', 'customer', 'employee', 'documents'));
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
            'employee_id' => 'nullable|exists:users,id',
        ]);

        $booking->update($validated);

        if ($validated['status'] === 'cancelled') {
            $booking->unit->update(['status' => 'available']);
        } elseif ($validated['status'] === 'confirmed') {
            $booking->unit->update(['status' => 'sold']);
        }

        return response()->json($booking);
    }
}