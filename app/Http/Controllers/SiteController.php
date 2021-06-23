<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\Screenshot;
use App\Models\ExternalReview;
use App\Models\Page;
use App\Models\Review;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteController extends Controller
{
    /**
     * Response with detailed site data
     *
     * @return \Illuminate\Http\Response
     */
    public function main($site_id)
    {
        $data = [];
        $data['general'] = Site::find($site_id);
        $data['screenshots'] = Screenshot::where('site_id', $site_id)->first();
        $data['external'] = ExternalReview::where('site_id', $site_id)->first();
        return response($data)->header('Content-Type', 'application/json');
    }

    public function detail($site_id)
    {
        $data = [];
        $data['header'] = Page::header(); // ToDo
        $data['general'] = Site::find($site_id);
        $data['screenshots'] = Screenshot::where('site_id', $site_id)->first();
        $data['external'] = ExternalReview::where('site_id', $site_id)->first();
        $data['footer'] = Page::footer(); // ToDo
        return view('detail', $data);
    }

    public function create(Request $request){

        // Временная переменная введенная для удобства разработки.
        // Заменить на получения идентификатора авторизованного пользователя
        $user_id =  1;

        $site = new Site;
        $data = $request->toArray();
        $data['user_id'] = $user_id;
        $data['first_date'] = date('d.m.y');
        $data['hash'] =  substr(sha1(rand()), 0, 64);
        $data['mark'] = "neutral";
        $site->fill($data);
        $site->save();

        $data['site_id'] = $site->id;

        $screenshot_links = [];

        foreach($data['images'] as $image){
            $sp = explode(";base64,", $image);
            $type = explode(":image/", $sp[0])[1];
            $base64content = $sp[1];
            $filename = substr(sha1(rand()), 0, 12);
            $image_byte_array = base64_decode($base64content);
            $filePath = "public/screenshots/" . $site->id . "/" . $filename . "." . $type;
            Storage::put($filePath, $image_byte_array);
            $url = Storage::url($filePath);
            array_push($screenshot_links, $url);
        }

        $screenshots = new Screenshot;
        $screenshots->site_id = $site->id;
        $screenshots->links = implode(", ", $screenshot_links); // Переделать на формирование ссылок
        $screenshots->save();

        unset($data['images']);

        $review = new Review;
        $review->fill($data);
        $review->save();
    }

    public function append(Request $request){

    }

    public function external(Request $request){

    }


}

