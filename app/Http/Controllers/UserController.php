<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = User::where('id',Auth::user()->id)
            ->where('invalid_flg', 0)
            ->first();

        return Inertia::render('OwnRecommendationList',[
            'profile' => $profile
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $dir = 'img/icons';
        $img_path = $request->file('icon')->store('public/' . $dir);
        $filename = basename($img_path);

        User::where('id',Auth::user()->id)->where('invalid_flg', 0)->update([
            'name' => $request->name,
            'title' => $request->title,
            'text' => $request->text,
            'icon' => $filename
        ]);

        $profile = User::where('id',Auth::user()->id)
        ->where('invalid_flg', 0)
        ->first();

        return Inertia::render('OwnRecommendationList',[
            'profile' => $profile
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
