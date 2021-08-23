<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ReformatImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:reformat';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reformat all main page images';

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
        $storage_path = Storage::path('public/screenshots');
        $files = scandir($storage_path);
        var_dump($files);
        return 0;
    }
}
