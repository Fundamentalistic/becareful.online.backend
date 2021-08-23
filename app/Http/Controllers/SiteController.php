<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\Screenshot;
use App\Models\ExternalReview;
use http\Exception\InvalidArgumentException;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class SiteController extends Controller
{

    public function getNextId()
    {

        $statement = DB::select("show table status like 'sites'");

        return $statement[0]->Auto_increment;
    }

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
        $data = Site::find($site_id);
        if( $data != null ){
            $data = $data->toArray();
        }else{
            return redirect('/');
        }
        $screenshots = Screenshot::firstWhere('site_id', $site_id);
        if( $screenshots != null ){
            $data['screenshots'] = explode(", ", $screenshots->links);
        }

        $selected = [
            'reviews.id',
            'reviews.header',
            'reviews.created_at AS created_at',
            'reviews.content',
            'reviews.rating',
            'reviews.status',
            'reviews.screenshots as photos',
            'users.name AS name',
        ];
        $data['reviews'] = Review::select($selected)->where('site_id', $site_id)
            ->orderBy('id', 'DESC')
            ->leftJoin("users", "reviews.user_id", "=", "users.id")
            ->get();
        if ($data['reviews'] !== null){
            $data['reviews'] = $data['reviews']->toArray();
        }

        $commonrating = 0;
        $ratingCounter = 0;

        foreach($data['reviews'] as &$review){
            $sp = explode("T", $review['created_at']);
            $completeDate = $sp[0];
            $sp = explode(".", $sp[1]);
            $completeDate .= " " . $sp[0];
            $review['created_at'] = $completeDate;
            $commonrating += $review['rating'];
            $ratingCounter += 1;
            $review['photos'] = explode(', ', $review['photos']);
        }

        $commonrating = round($commonrating / $ratingCounter);
        $data['commonrating'] = $commonrating;

        $data['site_id'] = $site_id;

        return view('main', $data);
    }

    public function append_review(Request $request){
        try{
            $user_id = Auth::user()->id;
        }catch (\Exception $e){
            throw new AuthenticationException($e->getMessage());
        }

        $review = new Review;
        $data = $request->toArray();
        $data['user_id'] = $user_id;

        $screenshot_links = [];
        foreach($data['images'] as $key => $image){
            $sp = explode(";base64,", $image);
            $type = explode(":image/", $sp[0])[1];
            $base64content = $sp[1];
            $filename = substr(sha1(rand()), 0, 12);
            $image_byte_array = base64_decode($base64content);
            $filePath = "public/screenshots/" . $data['site_id'] . "/" . $filename . "." . $type;
            Storage::put($filePath, $image_byte_array);
            $url = Storage::url($filePath);
            array_push($screenshot_links, $url);
        }

        $screenshots_links = implode(", ", $screenshot_links);
        $data['screenshots'] = $screenshots_links;

        $review->fill($data);
        $review->save();


    }

    public function create(Request $request){

        // Получение идентификатора пользователя
        try{
            $user_id = Auth::user()->id;
        }catch(Exception $e){
            throw new AuthenticationException($e->getMessage());
        }

        // Заполнение модели сайта
        $site = new Site;
        $data = $request->toArray();
        $data['user_id'] = $user_id;
        $data['first_date'] = date('d.m.y');
        $data['hash'] =  substr(sha1(rand()), 0, 64);
        $data['mark'] = "neutral";

        $data['site_id'] = $this->getNextId();

        $screenshot_links = [];
        $main_image_path = "";
        foreach($data['images'] as $key => $image){
            $sp = explode(";base64,", $image);
            $type = explode(":image/", $sp[0])[1];
            $base64content = $sp[1];
            $filename = substr(sha1(rand()), 0, 12);
            $image_byte_array = base64_decode($base64content);
            $filePath = "public/screenshots/" . $data['site_id'] . "/" . $filename . "." . $type;
            Storage::put($filePath, $image_byte_array);
            $url = Storage::url($filePath);
            if($key === 0){
                $main_image_path = $filePath;
            }
            array_push($screenshot_links, $url);
        }

        // Выполняем сжатие первого изображения для быстрого отображения сайта в новых отзывах

        $sp = explode(".", $main_image_path);
        $extension = end($sp);
        $destination_img = str_replace($extension, "compress.".$extension, $main_image_path);
        $this->compress(Storage::path($main_image_path), Storage::path($destination_img), 5);

        $percent = 0.01;
        list($width, $height) = getimagesize(Storage::path($main_image_path));
        $newwidth = $width * $percent;
        $newheight = $height * $percent;
        $thumb = imagecreatetruecolor($newwidth, $newheight);
        $source = imagecreatefromjpeg(Storage::path($destination_img));

        imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        imagejpeg($thumb, Storage::path($destination_img));

        $data['main_page'] = Storage::url($destination_img);

        // Завершение сжатия изображение присваиванием значения переменной main_page

        $site->fill($data);
        $site->save();

        $screenshots = new Screenshot;
        $screenshots->site_id = $site->id;
        $screenshots->links = implode(", ", $screenshot_links); // Переделать на формирование ссылок
        $screenshots->save();

        unset($data['images']);

        $review = new Review;
        $review->fill($data);
        $review->save();
    }

    private function compress($source, $destination, $quality){

        $info = getimagesize($source);

        if($info['mime'] == 'image/jpeg'){
            $image = imagecreatefromjpeg($source);
        }else if($info['mime'] == 'image/gif'){
            $image = imagecreatefromgif($source);
        }else if($info['mime'] == 'image/png'){
            $image = imagecreatefrompng($source);
        }else{
            throw new InvalidArgumentException("Unknown mime type in compress method");
        }
        imagejpeg($image, $destination, $quality);
    }
}

