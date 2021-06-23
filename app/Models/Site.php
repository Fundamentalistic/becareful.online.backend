<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Screenshot;
use App\Models\ExternalReview;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use \Illuminate\Http\Request;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'url', 'rating', 'first_date', 'hash', 'mark', 'user_id', 'main_page'
    ];

}
