<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Project;
use App\Models\Unit;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::count();
        $totalUnits = Unit::count();
        $totalBookings = Booking::count();

        $revenue = Booking::where('status', 'confirmed')
            ->with('unit')
            ->get()
            ->sum(fn ($booking) => $booking->unit->price ?? 0);

        $unitsByStatus = Unit::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        return response()->json([
            'total_projects' => $totalProjects,
            'total_units' => $totalUnits,
            'total_bookings' => $totalBookings,
            'revenue' => $revenue,
            'units_by_status' => $unitsByStatus,
        ]);
    }
}