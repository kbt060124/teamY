<?php

namespace App\Http\Controllers;

use App\Models\GuestRecommend;
use App\Models\User;
use App\Models\UserPost;
use App\Models\UserPostRecommend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserPostRecommendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $profile = User::where('id', Auth::user()->id)
            ->where('invalid_flg', 0)
            ->first();

        $recommends = UserPostRecommend::select('users.*','user_post_recommends.*','user_post_recommends.id as post_recommend_id','guest_recommends.name as guest_name','guest_recommends.icon as guest_icon')
            ->leftJoin('users', 'recommended_user_id', '=', 'users.id')
            ->leftJoin('guest_recommends', 'user_post_recommends.id', '=', 'recommend_id')
            ->where('user_id', Auth::user()->id)
            ->where('user_post_recommends.id', $id)
            ->first();

        return Inertia::render('OwnRecommendations',[
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
        $recommends = new UserPostRecommend();
        $recommends->user_id  = Auth::user()->id;
        $recommends->recommended_user_id = $request->recommendedUserId;
        $recommends->title   = $request->recommendTitle;
        $recommends->text = $request->recommendText;
        $recommends->save();

        $recommendId = $recommends->id;

        if(empty($request->recommendedUserId)){
            $guests = new GuestRecommend();
            $dir = 'img/icons';
            $filename = '';
            if(!empty($request->file('recommendIcon'))){
                $img_path = $request->file('recommendIcon')->store('public/' . $dir);
                $filename = basename($img_path);
            }
            $guests->recommend_id = $recommendId;
            $guests->name = $request->recommendName;
            $guests->icon = $filename;
            $guests->save();
        }

        $posts = new UserPost();
        $posts->user_id = Auth::user()->id;
        $posts->type = 2;
        $posts->post_id = $recommendId;
        $posts->save();

        return to_route('ownrecommendationlist');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPostRecommend $userPostRecommend)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPostRecommend $userPostRecommend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        UserPostRecommend::where('user_id',Auth::user()->id)
            ->where('id', $request->recommendId)
            ->update([
                'title' => $request->recommendTitle,
                'text' => $request->recommendText
             ]);

            if(empty($request->recommendedUserId)){
                $dir = 'img/icons';
                $filename = '';
                $contents = array();
                
                $contents['name'] = $request->guestName;

                if(!empty($request->file('guestIcon'))){
                    $img_path = $request->file('guestIcon')->store('public/' . $dir);
                    $filename = basename($img_path);
                    $contents['icon'] = $filename;
                }
                GuestRecommend::where('recommend_id', $request->recommendId)->update($contents);
            }

        return to_route('ownrecommendationlist');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPostRecommend $userPostRecommend)
    {
        //
    }
}
