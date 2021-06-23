Vue.component('new-review-form', {
    data: function(){
        return {
            mainurl: "",
            images: [],
            commonscore: 0,
            trustscore: 0,
            convenience: 0,
            reviewheader: "",
            content: "",
            error_text: ""
        }
    },
    watch: {
        'mainurl': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('mainurl', nval);
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
        },
        'content': function(nval, oval){
            console.log(nval, oval);
            window.localStorage.setItem('content', nval);
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
        console.log(local_storage_mainurl);
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
                toBase64(files[a]);
                console.log(this.images)
            }
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
        sendNewReview: function(){
            console.log("sending start");
            let request = {
                mainurl: this.mainurl,
                images: this.images,
                commonscore: this.commonscore,
                trustscore: this.trustscore,
                convenience: this.convenience,
                reviewheader: this.reviewheader,
                content: this.content
            };
            let self = this;
            this.error_text = "";
            window.localStorage.removeItem('images');
            window.localStorage.clear();
            axios.post('https://becareful.online/new', JSON.stringify(request), {
                'Content-Type': 'application/json',
            }).then(function(result){
                console.log("OK");
                console.log(result);
            }).catch(function(error){
                console.log("ERROR");
                self.error_text = error;
            });
        }
    },
    template: "<form style='max-width: 800px; margin-left: auto; margin-right: auto; position: relative;'>\n" +
        "  <div class=\"row d-flex justify-content-center py-5\"><h2>Добавление нового сайта</h2></div>\n" +
        "  <div class=\"form-group\">\n" +
        "    <label for=\"urlpath\">Адрес сайта</label>\n" +
        "    <input type=\"text\" id=\"urlpath\" name=\"urlpath\" v-model=\"mainurl\" value=\"\" class=\"form-control col-6\" placeholder=\"www.url.ru\">\n" +
        "  </div>\n" +
        "  <hr class=\"divider\"/>\n" +
        "  <h5 for=\"photos\">Фотографии сайта</h5>\n" +
        "  <div id=\"photoBtn\" class=\"form-group row py-3\" style=\"height: 100px;\">\n" +
        "    <div v-on:click='openFileManager()' class=\"append-image-btn\" style=\"position: absolute; left: 1.5%;\" title=\"Фотографии сайта\">\n" +
        "      <svg width=\"78\" height=\"78\" viewBox=\"0 0 78 78\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "        <g filter=\"url(#filter0_d)\">\n" +
        "          <rect x=\"4\" width=\"70\" height=\"70\" rx=\"8\" fill=\"white\"/>\n" +
        "          <rect x=\"4.5\" y=\"0.5\" width=\"69\" height=\"69\" rx=\"7.5\" stroke=\"black\"/>\n" +
        "        </g>\n" +
        "        <line x1=\"40\" y1=\"15\" x2=\"40\" y2=\"55\" stroke=\"black\" stroke-width=\"2\"/>\n" +
        "        <line x1=\"19\" y1=\"34\" x2=\"59\" y2=\"34\" stroke=\"black\" stroke-width=\"2\"/>\n" +
        "        <defs>\n" +
        "          <filter id=\"filter0_d\" x=\"0\" y=\"0\" width=\"78\" height=\"78\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n" +
        "            <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n" +
        "            <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"/>\n" +
        "            <feOffset dy=\"4\"/>\n" +
        "            <feGaussianBlur stdDeviation=\"2\"/>\n" +
        "            <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>\n" +
        "            <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow\"/>\n" +
        "            <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow\" result=\"shape\"/>\n" +
        "          </filter>\n" +
        "        </defs>\n" +
        "      </svg>\n" +
        "\n" +
        "    </div>\n" +
        "  <div class='row images' style='margin-left: 120px'>" +
        "<img v-for='(image, index) in images' v-bind:src='image' style='max-width: 80px; max-height: 80px; padding-left: 10px;' v-on:click='showPhoto(index)'/>" +
        "</div>" +
        "  </div>\n" +
        "  <hr class=\"divider\"/>\n" +
        "<rating v-bind:rating='commonscore' description='Общая оценка'></rating>"+
        "<rating v-bind:rating='trustscore' description='Индекс доверия'></rating>"+
        "<rating v-bind:rating='convenience' description='Удобство'></rating>"+
        "</div>\n" +
        "  <div class=\"form-group pt-4\">\n" +
        "    <label for=\"review-header\">Заголовок отзыва</label>\n" +
        "    <input type=\"text\" id=\"review-header\" name=\"review-header\" value=\"\" class=\"form-control col-6\" placeholder=\"Заголовок\" v-model='reviewheader'>\n" +
        "  </div>\n" +
        "  <div class=\"form-group pt-3\">\n" +
        "    <label for=\"content\">Текст отзыва</label>\n" +
        "    <textarea id=\"content\" name=\"content\" class=\"form-control col-12\" v-model='content' style='min-height: 400px'></textarea>\n" +
        "  </div>\n" +
        "  <div class=\"row\">\n" +
        "    <input type=\"button\" class=\"form-btn absolute-right btn-primary\" value=\"Отправить\" style=\"position: absolute; right: 1.5%;\" v-on:click='sendNewReview()'>\n" +
        "  </div>\n" +
        "    <input id=\"hidedFileInput\" type=\"file\" name=\"secondary-images\" class=\"secondary-images\" multiple v-on:change=\"fileListUpdate()\">\n" +
        "<div class='background-plane' id='photoSlider' v-on:click='hideSlider()'></div>" +
        "<img src='' class='sliderComponent'/>" +
        "<div style='color: red'>{{error_text}}</div>" +
        "  </form>"
})


var form = new Vue({
    el: "main",
    data: {
        reviews: []
    }
});
