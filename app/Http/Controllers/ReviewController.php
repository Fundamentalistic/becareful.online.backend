<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Site;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Scalar\String_;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $pagination = 20;

    public function index()
    {
        $data = DB::table('sites')
            ->select('*')
            ->leftJoin('users', 'user_id', '=', 'users.id')
            ->rightJoin('reviews', 'sites.id', '=', 'site_id')
            ->orderBy('reviews.id', 'DESC')
            ->paginate($this->pagination);

        $data = $data->toArray();
        return response($data)->header("Content-Type", "application/json");
    }

    /**
     * @param Integer $page
     * if list is complete then function return {"status": "empty"}
     * if there is some reviews then function return {"status": "fill", data: array}
     */
    public function more(Request $request){
       $skip_val = $request->page * $this->pagination;
       $data = [];
       $data['status'] = $data['data'] == [] ? "empty" : "fill";
       return response($data)->header('Content-Type', "application/json");
    }

    public function search(Request $request){
        $query = $request->search;
        $data = DB::table('sites')
            ->select('*')
            ->leftJoin('users', 'user_id', '=', 'users.id')
            ->leftJoin('reviews', 'sites.id', '=', 'site_id')
            ->where('sites.url', 'like', '%'.$query.'%')
            ->paginate($this->pagination);

        $data = $data->toArray();
        return response($data)->header('Content-Type', 'application/json');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $review = new Review();
        foreach ($request->input() as $key => $value){
            $review->{$key} = $value;
        }
        $review->save();
        return response(['status' => 'ok']);
    }
}
