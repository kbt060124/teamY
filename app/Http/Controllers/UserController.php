<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPostRecommend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        $recommends = UserPostRecommend::select('users.*', 'user_post_recommends.*', 'user_post_recommends.id as post_recommend_id', 'guest_recommends.name as guest_name', 'guest_recommends.icon as guest_icon')
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
     * Display a listing of the resource.
     */
    public function recommendationList($id)
    {
        $profile = User::where('id', $id)
            ->where('invalid_flg', 0)
            ->first();

        $recommends = UserPostRecommend::select('users.*', 'user_post_recommends.*', 'user_post_recommends.id as post_recommend_id', 'guest_recommends.name as guest_name', 'guest_recommends.icon as guest_icon')
            ->leftJoin('users', 'recommended_user_id', '=', 'users.id')
            ->leftJoin('guest_recommends', 'user_post_recommends.id', '=', 'recommend_id')
            ->where('user_id', $id)
            ->get();

        return Inertia::render('RecommendationList', [
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
    public function show(Request $request)
    {
        $searchUser = User::select('id as userId', 'name', 'title', 'text', 'icon')
            ->where('invalid_flg', 0)
            ->where(function($q) use($request){
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('title', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('text', 'LIKE', '%' . $request->search . '%');
            })
            ->get();

        $searchRecommend = UserPostRecommend::from('user_post_recommends as r')
            ->select(
                'u.id as user_id',
                'u.name as user_name',
                'u.icon as user_icon',
                'r.id as recommend_id',
                'r.title as recommend_title',
                'r.text as recommend_text',
                DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.name ELSE ru.name END) AS recommended_name'),
                DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.icon ELSE ru.icon END) AS recommended_icon')
            )
            ->join('users as u', function ($join) {
                $join->on('r.user_id', '=', 'u.id')
                    ->where('u.invalid_flg', '=', 0); //invalid制御かけるか要相談
            })
            ->leftJoin('users as ru', function ($join) {
                $join->on('r.recommended_user_id', '=', 'ru.id');
            })
            ->leftJoin('guest_recommends as g', function ($join) {
                $join->on('r.id', '=', 'g.recommend_id');
            })
            // ->where('accept_flg', 1) 承認されてるかどうか。MVPでは判定しない。
            ->where('ru.name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('g.name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('r.title', 'LIKE', '%' . $request->search . '%')
            ->orWhere('r.text', 'LIKE', '%' . $request->search . '%')
            ->get();

        return Inertia::render('Search', [
            'searchUser' => $searchUser,
            'searchRecommend' => $searchRecommend
        ]);
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
        $contents = array();

        $contents['name'] = $request->name;
        $contents['title'] = $request->title;
        $contents['text'] = $request->text;

        if (!empty($request->file('icon'))) {
            $img_path = $request->file('icon')->store('public/' . $dir);
            $filename = basename($img_path);
            $contents['icon'] = $filename;
        }

        User::where('id', Auth::user()->id)->where('invalid_flg', 0)->update($contents);

        return to_route('ownrecommendationlist');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function getAllUser(Request $request)
    {
        return response()->json([
            'allUser' => User::select('id as userId', 'name', 'title', 'icon')->where('invalid_flg', 0)->get()
        ]);
    }
}
