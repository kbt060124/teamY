<?php

namespace App\Http\Controllers;

use App\Models\UserPost;
use App\Models\UserPostNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPostNewsController extends Controller
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
        $news = new UserPostNews();
        $news->user_id  = Auth::user()->id;
        $news->title   = $request->title;
        $news->news = $request->news;
        $news->save();
        $newsId = $news->id;

        $posts = new UserPost();
        $posts->user_id = Auth::user()->id;
        $posts->type = 1;
        $posts->post_id = $newsId;
        $posts->save();
        return to_route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPostNews $userPostNews)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPostNews $userPostNews)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPostNews $userPostNews)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPostNews $userPostNews)
    {
        //
    }
}
