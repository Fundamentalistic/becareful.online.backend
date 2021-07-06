@extends('app')
@section('content')
<style>
    .site-logo{
        height: 300px;
        width: 300px;
        max-height: 270px!important;
        max-width: 270px!important;
    }
</style>

<main class="main-border container">
    <div class="row"><h1 class="col-2" style="padding-left: 2rem !important; padding-top: 1.9rem !important;"><a href="#" title="Перейти на сайт">{{$url}}</a></h1><div class="col-9 d-flex justify-content-end"><rating rating='50' description=''></rating></div></div>
    <hr class="divider"/>
    <div class="row">
        <div class="col-md-1"></div>
        <div class="row slider-container container col-md-10 my-3 d-flex justify-content-center">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    @foreach($screenshots as $screenshot)
                        <li data-target="#carouselExampleIndicators" data-slide-to="{{$loop->index}}" @if($loop->index === 0) class="active" @endif></li>
                    @endforeach
                </ol>
                <div class="carousel-inner">
                    @foreach($screenshots as $screenshot)
                    <div class="carousel-item @if($loop->index === 0) active @endif">
                        <img class="d-block w-100" src="{{$screenshot}}" alt="">
                    </div>
                    @endforeach
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <div class="col-md-1"></div>
    </div>

    <div class="container alert-container">
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Мы впервые увидели <a class="mx-1" href="$url">{{$url}}</a> в поисковике: <span class="mx-2 date">{{$first_date}}</span></div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Об этом сайте были найдены отзывы на других ресурсах <span class="mx-2 date">читать</span></div>
        <div class="row col-12 d-flex justify-content-center"><div class="note col-md-8">Обратите внимание: если вы видите, что отзывы у нас и на оригинальных отзовиках не совпадают, это может означать что владельцы отзовиков позволяют изменять отзывы после публикации.</div></div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Если у вас есть что сказать, оставьте свой отзыв</div>
        <div class="btn-panel col-12 d-flex justify-content-center">
            <input type="button" value="Оставить отзыв" v-on:click="openShortReviewForm">
        </div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Так же на нашем сайте были оставлены отзывы о сайте <a class="mx-1" href="{{$url}}">{{$url}}</a></div>
        <hr class="divider"/>
    </div>
    <div class="reviews container">
        @foreach($reviews as $review)
            <div class="review">
                <div class="username">{{$review['name']}}</div>
                <div class="rating">
                    <div class="empty">
                        <i class="rating-star">☆</i>
                        <i class="rating-star">☆</i>
                        <i class="rating-star">☆</i>
                        <i class="rating-star">☆</i>
                        <i class="rating-star">☆</i>
                    </div>
                    <div class="fill" style="height: {{$review['rating']}}px;"><!--Ширина используется для управления строкой рейтинга-->
                        <i class="rating-star-fill">★</i>
                        <i class="rating-star-fill">★</i>
                        <i class="rating-star-fill">★</i>
                        <i class="rating-star-fill">★</i>
                        <i class="rating-star-fill">★</i>
                    </div>
                </div>
                <div class="review-title">
                    {{$review['header']}}
                </div>
                <div class="review-content">
                    {{$review['content']}}
                </div>
                <div class="date">{{$review['created_at']}}</div>
            </div>
        @endforeach
    <form method="POST" :action="'/new/review?site_id='+{{$id}}" id="shortReviewForm">
        <div class="background" v-on:click="hideShortReviewForm"></div>
        <div class="reviewPane" class="container">
            <div class="row d-flex justify-content-center mt-5">
                <h3>Оставить отзыв</h3>
            </div>
            <div class="row d-flex justify-content-center mt-5">
                <rating class="col-4" description="Оценка" rating="0"></rating>
            </div>
            <div class="row d-flex justify-content-center mt-5">
                <input class="col-4 review-form-header" name="header" type="text" placeholder="Заголовок"/>
            </div>
            <div class="row d-flex justify-content-center mt-5">
                <textarea class="col-4 review-form-content" name="content"></textarea>
            </div>
            <div class="row d-flex justify-content-center mt-5">
                <div v-on:click='openFileManager()' class="append-image-btn" style="margin-right: 170px; margin-top: -20px;" title="Фотографии сайта">
                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d)">
                            <rect x="4" width="70" height="70" rx="8" fill="white"/>
                            <rect x="4.5" y="0.5" width="69" height="69" rx="7.5" stroke="black"/>
                        </g>
                        <line x1="40" y1="15" x2="40" y2="55" stroke="black" stroke-width="2"/>
                        <line x1="19" y1="34" x2="59" y2="34" stroke="black" stroke-width="2"/>
                        <defs>
                            <filter id="filter0_d" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                            </filter>
                        </defs>
                    </svg>

                </div>
                <input type="submit" class="btn-primary" value="Отправить"/>
            </div>
            <input id="hidedFileInput" type="file" name="secondary-images" class="secondary-images" multiple v-on:change="fileListUpdate()">
        </div>
    </form>
</main>
@endsection
@section('scripts')
    <script src="/js/main.js"></script>
@endsection
