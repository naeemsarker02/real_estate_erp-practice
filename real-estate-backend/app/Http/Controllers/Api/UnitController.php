<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        $query = Unit::with('project');

        if ($request->has('location')) {
            $query->whereHas('project', function ($q) use ($request) {
                $q->where('location', 'like', '%' . $request->location . '%');
            });
        }

        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'unit_number' => 'required|string|max:50',
            'floor' => 'required|integer',
            'size' => 'required|numeric|min:0',
            'bedroom' => 'required|integer|min:0',
            'bathroom' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:available,reserved,sold',
        ]);

        $unit = Unit::create($validated);

        return response()->json($unit, 201);
    }

    public function show(Unit $unit)
    {
        return response()->json($unit->load('project', 'bookings'));
    }

    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'unit_number' => 'sometimes|string|max:50',
            'floor' => 'sometimes|integer',
            'size' => 'sometimes|numeric|min:0',
            'bedroom' => 'sometimes|integer|min:0',
            'bathroom' => 'sometimes|integer|min:0',
            'price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:available,reserved,sold',
        ]);

        $unit->update($validated);

        return response()->json($unit);
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();
        return response()->json(null, 204);
    }
}