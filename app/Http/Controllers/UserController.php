<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPostRecommend;
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
        $profile = User::where('id', Auth::user()->id)
            ->where('invalid_flg', 0)
            ->first();

        $recommends = UserPostRecommend::select('users.*','user_post_recommends.*','guest_recommends.name as guest_name','guest_recommends.icon as guest_icon')
            ->leftJoin('users', 'recommended_user_id', '=', 'users.id')
            ->leftJoin('guest_recommends', 'user_post_recommends.id', '=', 'recommend_id')
            ->where('user_id', Auth::user()->id)
            ->get();

        return Inertia::render('OwnRecommendationList', [
            'profile' => $profile,
            'recommends' => $recommends
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
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
