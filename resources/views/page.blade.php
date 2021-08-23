@extends('app')
@section('content')
    <main class="container page-container">
    {!! $content !!}
    </main>
@endsection
@section('scripts')
    <script src="/js/index.js"></script>
@endsection
