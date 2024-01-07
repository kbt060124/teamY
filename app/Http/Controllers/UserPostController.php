<?php

namespace App\Http\Controllers;

use App\Models\UserPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = UserPost::from('user_posts as p')
        ->select('p.type','u.name','u.icon','n.title as n_title','n.news',
            DB::raw('null as r_title'),DB::raw('null as text'),DB::raw('null as recommended_name'),DB::raw('null as recommended_icon'),
            DB::raw('null as thanks_name'),DB::raw('null as thanks_icon'),DB::raw('null as thanks_message'),
            DB::raw('DATE_FORMAT(n.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_news as n', function($join){
            $join->on('p.post_id', '=', 'n.id')
             ->where('p.type', '=', 1);
        });

        $thanks = UserPost::from('user_posts as p')
        ->select('p.type','u.name','u.icon',DB::raw('null as n_title'),DB::raw('null as news'),
            DB::raw('null as r_title'),DB::raw('null as text'),DB::raw('null as recommended_name'),DB::raw('null as recommended_icon'),
            'tu.name as thanks_name','tu.icon as thanks_icon','t.message as thanks_message',
            DB::raw('DATE_FORMAT(t.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_thanks as t', function($join){
            $join->on('p.post_id', '=', 't.id')
             ->where('p.type', '=', 3);
        })
        ->join('users as tu', function($join){
            $join->on('t.thanks_user_id', '=', 'tu.id');
        });

        $posts = UserPost::from('user_posts as p')
        ->select('p.type','u.name','u.icon',DB::raw('null as n_title'),DB::raw('null as news'),'r.title as r_title','r.text',
            DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.name ELSE ru.name END) AS recommended_name'),
            DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.icon ELSE ru.icon END) AS recommended_icon'),
            DB::raw('null as thanks_name'),DB::raw('null as thanks_icon'),DB::raw('null as thanks_message'),
            DB::raw('DATE_FORMAT(r.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_recommends as r', function($join){
            $join->on('p.post_id', '=', 'r.id')
             ->where('p.type', '=', 2);
        })
        ->leftJoin('users as ru', function($join){
            $join->on('r.recommended_user_id', '=', 'ru.id');
        })
        ->leftJoin('guest_recommends as g', function($join){
            $join->on('r.id', '=', 'g.recommend_id');
        })
        ->union($news)
        ->union($thanks)
        ->orderBy('date', 'desc')
        ->get();

        return Inertia::render('Home', [
            'posts' => $posts,
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
    public function show($id)
    {
        $news = UserPost::from('user_posts as p')
        ->select('p.user_id','p.type','u.name','u.icon','n.title as n_title','n.news',
            DB::raw('null as r_title'),DB::raw('null as text'),DB::raw('null as recommended_name'),DB::raw('null as recommended_icon'),
            DB::raw('null as thanks_name'),DB::raw('null as thanks_icon'),DB::raw('null as thanks_message'),
            DB::raw('DATE_FORMAT(n.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_news as n', function($join) use($id){
            $join->on('p.post_id', '=', 'n.id')
             ->where('p.type', '=', 1)
             ->where('p.user_id', '=', $id);
        });

        $thanks = UserPost::from('user_posts as p')
        ->select('p.user_id','p.type','u.name','u.icon',DB::raw('null as n_title'),DB::raw('null as news'),
            DB::raw('null as r_title'),DB::raw('null as text'),DB::raw('null as recommended_name'),DB::raw('null as recommended_icon'),
            'tu.name as thanks_name','tu.icon as thanks_icon','t.message as thanks_message',
            DB::raw('DATE_FORMAT(t.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_thanks as t', function($join){
            $join->on('p.post_id', '=', 't.id')
             ->where('p.type', '=', 3);
        })
        ->join('users as tu', function($join){
            $join->on('t.thanks_user_id', '=', 'tu.id');
        })
        ->where('u.id', '=', $id)
        ->orWhere('tu.id', '=', $id);

        $posts = UserPost::from('user_posts as p')
        ->select('p.user_id','p.type','u.name','u.icon',DB::raw('null as n_title'),DB::raw('null as news'),'r.title as r_title','r.text',
            DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.name ELSE ru.name END) AS recommended_name'),
            DB::raw('(CASE WHEN r.recommended_user_id IS NULL THEN g.icon ELSE ru.icon END) AS recommended_icon'),
            DB::raw('null as thanks_name'),DB::raw('null as thanks_icon'),DB::raw('null as thanks_message'),
            DB::raw('DATE_FORMAT(r.created_at, "%Y年%m月%d日") date'))
        ->join('users as u', function($join){
            $join->on('p.user_id', '=', 'u.id')
             ->where('u.invalid_flg', '=', 0);
        })
        ->join('user_post_recommends as r', function($join){
            $join->on('p.post_id', '=', 'r.id')
             ->where('p.type', '=', 2);
        })
        ->leftJoin('users as ru', function($join){
            $join->on('r.recommended_user_id', '=', 'ru.id');
        })
        ->leftJoin('guest_recommends as g', function($join){
            $join->on('r.id', '=', 'g.recommend_id');
        })
        ->where('u.id', '=', $id)
        ->orWhere('ru.id', '=', $id)
        ->union($news)
        ->union($thanks)
        ->orderBy('date', 'desc')
        ->get();

        return Inertia::render('OwnTimeline', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPost $userPost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPost $userPost)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPost $userPost)
    {
        //
    }
}
