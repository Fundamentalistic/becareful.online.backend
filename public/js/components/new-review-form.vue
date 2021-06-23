<template>
  <form>
  <div class="row d-flex justify-content-center py-5"><h2>Добавление нового сайта</h2></div>
  <div class="form-group">
    <label for="urlpath">Адрес сайта</label>
    <input type="text" id="urlpath" name="urlpath" v-model="mainurl" value="" class="form-control col-6" placeholder="www.url.ru">
  </div>
  <hr class="divider"/>
  <h5 for="photos">Фотографии сайта</h5>
  <div id="photoBtn" class="form-group row py-3" style="height: 100px;">
    <div class="append-image-btn" style="position: absolute; left: 1.5%;" title="Фотографии сайта">
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
  </div>
  <hr class="divider"/>
  <div class="form-group row pt-5">
    <label for="score" class="col-2">Общая оценка</label>
    <div id="score" class="rating col-2">
      <div class="empty">
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
      </div>
      <div class="fill" style="height: 20px;"><!--Ширина используется для управления строкой рейтинга-->
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
      </div>
    </div>
  </div>
  <div class="form-group row">
    <label for="score" class="col-2">Индекс доверия</label>
    <div id="confidence-score" class="rating col-2">
      <div class="empty">
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
        <i class="rating-star">☆</i>
      </div>
      <div class="fill" style="height: 20px;"><!--Ширина используется для управления строкой рейтинга-->
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
        <i class="rating-star-fill">★</i>
      </div>
    </div>
  </div><div class="form-group row">
  <label for="score" class="col-2">Удобство</label>
  <div id="convenience-score" class="rating col-2">
    <div class="empty">
      <i class="rating-star">☆</i>
      <i class="rating-star">☆</i>
      <i class="rating-star">☆</i>
      <i class="rating-star">☆</i>
      <i class="rating-star">☆</i>
    </div>
    <div class="fill" style="height: 20px;"><!--Ширина используется для управления строкой рейтинга-->
      <i class="rating-star-fill">★</i>
      <i class="rating-star-fill">★</i>
      <i class="rating-star-fill">★</i>
      <i class="rating-star-fill">★</i>
      <i class="rating-star-fill">★</i>
    </div>
  </div>
</div>
  <div class="form-group pt-4">
    <label for="review-header">Заголовок отзыва</label>
    <input type="text" id="review-header" name="review-header" value="" class="form-control col-6" placeholder="Заголовок">
  </div>
  <div class="form-group pt-3">
    <label for="content">Текст отзыва</label>
    <textarea id="content" name="content" class="form-control col-12"></textarea>
  </div>
  <div class="row">
    <input type="button" class="form-btn absolute-right btn-primary" value="Отправить" style="position: absolute; right: 1.5%;">
  </div>
    <input id="hidedFileInput" type="file" name="secondary-images" class="secondary-images" multiple v-on:change="fileListUpdate()">
  </form>
</template>

<script>
export default {
  name: "new-review-form",
  data: function(){
    return {
      mainurl: "",
      images: [],
      commonscore: 0,
      trustscore: 0,
      convenience: 0,
      reviewheader: "",
      content: ""
    }
  },
  methods: {
    fileListUpdate: function(){
      console.log("file update");
    }
  }

}
</script>

<style scoped>

</style>