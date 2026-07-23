<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function store(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'doc_type' => 'required|string|max:100',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->user()->id !== $booking->customer_id && $request->user()->role === 'customer') {
            abort(403, 'You can only upload documents for your own booking.');
        }

        $path = $request->file('file')->store('documents', 'public');

        $document = Document::create([
            'booking_id' => $booking->id,
            'doc_type' => $validated['doc_type'],
            'file_path' => $path,
        ]);

        return response()->json($document, 201);
    }

    public function index(Booking $booking)
    {
        return response()->json($booking->documents);
    }

    public function destroy(Document $document)
    {
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return response()->json(null, 204);
    }
}