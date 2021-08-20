@extends('app')

@section('content')
    <style>
        svg:hover *{
            fill: #E5E5E5;
            stroke: #0367A6;
            color: #0367A6;
        }
    </style>
    <main class="container main-review-form-container">
        <new-review-form></new-review-form>
    </main>
@endsection

@section('scripts')
    <script type="module" src="js/reviewform.js"></script>
@endsection
