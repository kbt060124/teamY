<?php

namespace App\Http\Controllers;

use App\Models\UserPost;
use App\Models\UserPostThank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPostThankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $thanks = new UserPostThank();
        $thanks->user_id  = Auth::user()->id;
        $thanks->thanks_user_id = $request->thanksUserId;
        $thanks->message = $request->message;
        $thanks->save();
        $thanksId = $thanks->id;

        $posts = new UserPost();
        $posts->user_id = Auth::user()->id;
        $posts->type = 3;
        $posts->post_id = $thanksId;
        $posts->save();
        return to_route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPostThank $userPostThank)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPostThank $userPostThank)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPostThank $userPostThank)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPostThank $userPostThank)
    {
        //
    }
}
