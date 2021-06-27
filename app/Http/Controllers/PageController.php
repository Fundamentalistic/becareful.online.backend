<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function links(){
        return Page::all();
    }

    public function page(Request $request){
        $page = Page::where('link', '/'.$request->path())->first();
        if ( $page === NULL ){
            return redirect('/');
        }
        return view('page', [
            'content' => file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/templates/" . $page->path)
            ]);
    }
}
