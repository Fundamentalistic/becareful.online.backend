<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Site;
use App\Models\Review;

class StatRecalculation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stat:recalculate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Statistics recalculation for all elements of site';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sites = Site::all();
        foreach($sites as $site){
            $reviews = Review::where('site_id', $site->id)->count();
            $site->rcount = $reviews;
            $site->save();
        }
        echo "Recalculation is complete\n";
        return 0;
    }
}
