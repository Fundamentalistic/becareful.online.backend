var form = Vue.createApp({
    el: "main",
    data(){
        return{
            reviews: []
        }
    }
});

form.component('new-review-form', {
    data(){
        return {
            mainurl: "",
            images: [],
            commonscore: 0,
            trustscore: 0,
            convenience: 0,
            reviewheader: "",
            content: "",
            error_text: "",
            result_text: "",
            errors: {
                emptyMain: false,
                emptyImages: false,
                emptyReviewHeader: false,
                emptyContent: false,
            }
        }
    },
    watch: {
        'mainurl': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('mainurl', nval);
            this.errors.emptyMain = false;
        },
        'commonscore': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('commonscore', nval);
        },
        'trustscore': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('trustscore', nval);
        },
        'convenience': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('convenience', nval);
        },
        'reviewheader': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('reviewheader', nval);
            this.errors.emptyReviewHeader = false;
        },
        'content': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('content', nval);
            this.errors.emptyContent = false;
        },
    },
    created: function(){
        let imgss = window.localStorage.getItem('images');
        let local_storage_mainurl = window.localStorage.getItem('mainurl');
        let local_storage_commonscore = window.localStorage.getItem('commonscore');
        let local_storage_trustscore = window.localStorage.getItem('trustscore');
        let local_storage_convenience = window.localStorage.getItem('convenience');
        let local_storage_reviewheader = window.localStorage.getItem('reviewheader');
        let local_storage_content = window.localStorage.getItem('content');
        if ( imgss != null){
            this.images = imgss.split('|||');
        }
        if ( local_storage_mainurl != null ){
            this.mainurl = local_storage_mainurl;
        }
        if ( local_storage_commonscore != null ){
            this.commonscore = local_storage_commonscore;
        }
        if ( local_storage_trustscore != null ){
            this.trustscore = local_storage_trustscore;
        }
        if ( local_storage_convenience != null ){
            this.convenience = local_storage_convenience;
        }
        if ( local_storage_reviewheader != null ){
            this.reviewheader = local_storage_reviewheader;
        }
        if ( local_storage_content != null ){
            this.content = local_storage_content;
        }

    },
    methods: {
        fileListUpdate: function(){
            console.log("file update");
            let self = this;
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => { this.images.push(reader.result); window.localStorage.setItem('images', this.images.join("|||")) };
                reader.onerror = error => reject(error);
            });
            let files = document.querySelector('#hidedFileInput').files;
            //Append image checking
            for( let a = 0; a < files.length; a++ ){
                toBase64(files[a]).then(() => {
                    console.log(this.images);
                });
            }
            this.errors.emptyImages = false;
        },
        openFileManager: function(){
            document.querySelector('#hidedFileInput').click();
        },
        showPhoto: function(el){
            console.log(el);
            document.querySelector('.background-plane').style.display = "block";
            document.querySelector('.sliderComponent').src = this.images[el];
            document.querySelector('.sliderComponent').style.display = "block";
        },
        hideSlider: function(){
            document.querySelector('.background-plane').style.display = "none";
            document.querySelector('.sliderComponent').src = '';
            document.querySelector('.sliderComponent').style.display = "none";
        },
        updateFastRating: function(val) {
            this.commonscore = val;
            console.log("common score was set at ");
            console.log(this);
        },
        sendNewReview: function(){
            console.log("sending start");
            console.log(this);
            if(this.mainurl === ""){
                this.errors.emptyMain = true;
            }else{
                this.errors.emptyMain = false;
            }
            console.log(this.images);
            this.errors.emptyImages = (this.images.length === 0);

            if(this.reviewheader === ""){
                this.errors.emptyReviewHeader = true;
            }else{
                this.errors.emptyReviewHeader = false;
            }
            if(this.content === ""){
                this.errors.emptyContent = true;
            }else{
                this.errors.emptyContent = false;
            }
            if(
                this.errors.emptyMain ||
                this.errors.emptyImages ||
                this.errors.emptyReviewHeader ||
                this.errors.emptyContent
            ){
                return;
            }
            let request = {
                url: this.mainurl,
                images: this.images,
                rating: this.commonscore,
                trustscore: this.trustscore,
                convenience: this.convenience,
                header: this.reviewheader,
                content: this.content
            };
            console.log(request);
            let self = this;
            this.error_text = "";
            window.localStorage.removeItem('images');
            window.localStorage.clear();
            axios.post('/new', request, {
                'Content-Type': 'application/json',
            }).then(function(result){
                console.log("OK");
                console.log(result);
                self.result_text = "Вы только что создали новый сайт"
                setTimeout(() => {
                    self.result_text = "";
                }, 2000);
            }).catch(function(error){
                console.log("ERROR");
                self.error_text = error;
            });
        }
    },
    template: "<form class='main-review-form' style='max-width: 800px; margin-left: auto; margin-right: auto; position: relative;'>" +
        "  <div class=\"row d-flex justify-content-center py-5\"><h2>Добавление нового сайта</h2></div>" +
        "  <div class=\"form-group\">" +
        "    <label v-if=\"!errors.emptyMain\" for=\"urlpath\">Адрес сайта</label>" +
        "    <label v-if=\"errors.emptyMain\" style=\"color: red\" for=\"urlpath\">Адрес сайта не может быть пустым</label>" +
        "    <input type=\"text\" id=\"urlpath\" name=\"urlpath\" v-model=\"mainurl\" value=\"\" class=\"form-control col-lg-6 col-md-12\" :class=\"{'alert-state': errors.emptyMain}\" placeholder=\"www.url.ru\">" +
        "  </div>" +
        "  <hr class=\"divider\"/>" +
        "  <h5 for=\"photos\">Фотографии сайта</h5>" +
        "  <div id=\"photoBtn\" class=\"form-group row py-3 photo-form-group\">" +
        "   <h3 v-if=\"errors.emptyImages\" class=\"alert\">Сайт не может быть создан без фотографий</h3>" +
        "    <div v-on:click='openFileManager()' class=\"append-image-btn\" style=\"position: absolute; left: 1.5%;\" title=\"Фотографии сайта\">" +
        "      <svg width=\"78\" height=\"78\" viewBox=\"0 0 78 78\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
        "        <g filter=\"url(#filter0_d)\">" +
        "          <rect x=\"4\" width=\"70\" height=\"70\" rx=\"8\" fill=\"white\"/>" +
        "          <rect x=\"4.5\" y=\"0.5\" width=\"69\" height=\"69\" rx=\"7.5\" stroke=\"black\"/>" +
        "        </g>" +
        "        <line x1=\"40\" y1=\"15\" x2=\"40\" y2=\"55\" stroke=\"black\" stroke-width=\"2\"/>" +
        "        <line x1=\"19\" y1=\"34\" x2=\"59\" y2=\"34\" stroke=\"black\" stroke-width=\"2\"/>" +
        "        <defs>" +
        "          <filter id=\"filter0_d\" x=\"0\" y=\"0\" width=\"78\" height=\"78\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">" +
        "            <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>" +
        "            <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"/>" +
        "            <feOffset dy=\"4\"/>" +
        "            <feGaussianBlur stdDeviation=\"2\"/>" +
        "            <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>" +
        "            <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow\"/>" +
        "            <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow\" result=\"shape\"/>" +
        "          </filter>" +
        "        </defs>" +
        "      </svg>" +
        "" +
        "    </div>" +
        "  <div class='row images d-flex justify-content-start' style='margin-left: 120px; max-height: 80px; min-width: 80%; overflow: hidden'>" +
        "<img class='img-thumbnail align-left' style='max-height: 75px; max-width: 75px' v-for='(image, index) in images' v-bind:src='image' v-on:click='showPhoto(index)'/>" +
        "</div>" +
        "  </div>" +
        "  <hr class=\"divider\"/>" +
        "<rating v-on:updateRating='updateFastRating' description='Общая оценка'></rating>"+
        "<rating v-bind:rating='trustscore' description='Индекс доверия'></rating>"+
        "<rating v-bind:rating='convenience' description='Удобство'></rating>"+
        "</div>" +
        "  <div class=\"form-group pt-4\">" +
        "    <label v-if='!errors.emptyReviewHeader' for=\"review-header\">Заголовок отзыва</label>" +
        "    <label v-if='errors.emptyReviewHeader' for=\"review-header\" style='color: red'>Заголовок отзыва не может быть пустым</label>" +
        "    <input type=\"text\" id=\"review-header\" name=\"review-header\" value=\"\" :class=\"{'alert-state': errors.emptyReviewHeader}\" class=\"form-control col-lg-6 col-md-12\" placeholder=\"Заголовок\" v-model='reviewheader'>" +
        "  </div>" +
        "  <div class=\"form-group pt-3\">" +
        "    <label v-if='!errors.emptyContent'  for=\"content\">Текст отзыва</label>" +
        "    <label v-if='errors.emptyContent' style='color: red' for=\"content\">Текст отзыва не может быть пустым</label>" +
        "    <textarea id=\"content\" name=\"content\" :class=\"{'alert-state': errors.emptyContent}\" class=\"form-control col-12\" v-model='content' style='min-height: 400px'></textarea>" +
        "  </div>" +
        "  <div class=\"row\">" +
        "    <input type=\"button\" class=\"form-btn absolute-right btn-primary\" value=\"Отправить\" style=\"position: absolute; right: 1.5%;\" v-on:click='sendNewReview()'>" +
        "  </div>" +
        "    <input id=\"hidedFileInput\" type=\"file\" name=\"secondary-images\" class=\"secondary-images\" multiple v-on:change=\"fileListUpdate()\">" +
        "<div class='background-plane' id='photoSlider' v-on:click='hideSlider()'></div>" +
        "<img src='' class='sliderComponent'/>" +
        "<div style='color: green'>{{result_text}}</div>" +
        "<div style='color: red'>{{error_text}}</div>" +
        "  </form>"
});

form.component('rating', rating_obj);

form.mount('main');
