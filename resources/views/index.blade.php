@extends('app')

@section('content')
    <main class="row d-flex justify-content-center">
        <div class="container col-md-8 search-block d-flex justify-content-center m-1">
            <input type="text" class="search col-md-6 col-sm-12 col-xs-12" id="search" name="search" placeholder="Поиск">
            <img src="/imgs/search2.png" alt="Найти" class="search-ico"/>
        </div>
        <div class="container-fluid search-block-mobile d-flex justify-content-center">
            <input type="text" class="search" id="search-mobile" name="search" placeholder="Поиск">
            <img src="/imgs/search2.png" alt="Найти" class="search-ico"/>
        </div>
        <div id="currentReviewsContainer" class="new-reviews container col-md-8 m-1">
            <short-review
                v-for="(review, index) in review_list" :key="index"
                v-bind:key="index"
                v-bind:mainpagescreen="review.main_page"
                v-bind:mainlink="review.url"
                v-bind:commonscore="review.rating"
                v-bind:counter="review.rcount"
                v-bind:content="review.content"
                v-bind:username="review.name"
                v-bind:userrating="review.userrating"
                v-bind:siteid="review.site_id"
            ></short-review>
            <div class="up-btn" :class='{"highlighted": mouseOnUpBtn}'>
                <img :class='{"rotate-180": back, "highlighted": mouseOnUpBtn}' class="up-img" src="/imgs/up.png" v-on:click="upOrBack"/>
            </div>
        </div>
    </main>
@endsection

@section('scripts')
    <script src="/js/index.js"></script>
@endsection
