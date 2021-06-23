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
    <div class="row"><h1 class="col-2" style="padding-left: 2rem !important; padding-top: 1.9rem !important;"><a href="#" title="Перейти на сайт">pizzahut.ru</a></h1><div class="col-9 d-flex justify-content-end"><rating rating='50' description=''></rating></div></div>
    <hr class="divider"/>
    <div class="row">
        <div class="col-md-1"></div>
        <div class="row slider-container container col-md-10 my-3 d-flex justify-content-center">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="imgs/site1.png" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="imgs/site2.png" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="imgs/site3.png" alt="Third slide">
                    </div>
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
        <div class="row col-12 d-flex justify-content-center">Мы впервые увидели <a class="mx-1" href="#">pizzahut.ru</a> в поисковике: <span class="mx-2 date">20.05.2021</span></div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Об этом сайте были найдены отзывы на других ресурсах <span class="mx-2 date">читать</span></div>
        <div class="row col-12 d-flex justify-content-center"><div class="note col-md-8">Обратите внимание: если вы видите, что отзывы у нас и на оригинальных отзовиках не совпадают, это может означать что владельцы отзовиков позволяют изменять отзывы после публикации.</div></div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Если у вас есть что сказать, оставьте свой отзыв</div>
        <div class="btn-panel col-12 d-flex justify-content-center">
            <input type="button" value="Оставить отзыв" v-on:click="openShortReviewForm">
        </div>
        <hr class="divider"/>
        <div class="row col-12 d-flex justify-content-center">Так же на нашем сайте были оставлены отзывы о сайте <a class="mx-1" href="#">pizzahut.ru</a></div>
        <hr class="divider"/>
    </div>
    <div class="reviews container">
        <div class="review">
            <div class="username">Андрей</div>
            <div class="rating">
                <div class="empty">
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                </div>
                <div class="fill" style="height: 4;"><!--Ширина используется для управления строкой рейтинга-->
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                </div>
            </div>
            <div class="review-title">
                Lorem ipsum dolor sit amet
            </div>
            <div class="review-content">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </div>
            <div class="date">2021-05-13 18:34:58</div>
        </div>
        <div class="review">
            <div class="username">Андрей</div>
            <div class="rating">
                <div class="empty">
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                </div>
                <div class="fill" style="height: 2;"><!--Ширина используется для управления строкой рейтинга-->
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                </div>
            </div>
            <div class="review-title">
                test
            </div>
            <div class="review-content">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </div>
            <div class="date">2021-05-13 18:34:58</div>
        </div>
        <div class="review">
            <div class="username">Андрей</div>
            <div class="rating">
                <div class="empty">
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                </div>
                <div class="fill" style="height: 5;"><!--Ширина используется для управления строкой рейтинга-->
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                </div>
            </div>
            <div class="review-title">
                test
            </div>
            <div class="review-content">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </div>
            <div class="date">2021-05-13 18:34:58</div>
        </div>
        <div class="review">
            <div class="username">Андрей</div>
            <div class="rating">
                <div class="empty">
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                </div>
                <div class="fill" style="height: 5;"><!--Ширина используется для управления строкой рейтинга-->
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                </div>
            </div>
            <div class="review-title">
                test
            </div>
            <div class="review-content">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </div>
            <div class="date">2021-05-13 18:34:58</div>
        </div>
        <div class="review">
            <div class="username">Андрей</div>
            <div class="rating">
                <div class="empty">
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                    <i class="rating-star">☆</i>
                </div>
                <div class="fill" style="height: 5;"><!--Ширина используется для управления строкой рейтинга-->
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                    <i class="rating-star-fill">★</i>
                </div>
            </div>
            <div class="review-title">
                test
            </div>
            <div class="review-content">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </div>
            <div class="date">2021-05-13 18:34:58</div>
        </div>
    </div>
    <form method="POST" :action="'/new/review?site_id='+site_id" id="shortReviewForm">
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
                <input type="submit" class="btn-primary" value="Отправить"/>
            </div>
        </div>
    </form>
</main>
@endsection
@section('scripts')
    <script src="js/main.js"></script>
@endsection
