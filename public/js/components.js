Vue.component('rating', {
    props: [
        'rating',
        'description'
    ],
    mounted: function(){
        console.log('rating was created', this.rating);
        this.ratingscore = this.rating;
    },
    template: "<div class=\"form-group row pt-5\">\n" +
        "    <label for=\"score\" class=\"col-2\">{{description}}</label>\n" +
        "    <div id=\"score\" class=\"rating col-2\">\n" +
        "      <div class=\"empty\">\n" +
        "        <i class=\"rating-star\" v-on:click='setRating(20)'>☆</i>\n" +
        "        <i class=\"rating-star\" v-on:click='setRating(40)'>☆</i>\n" +
        "        <i class=\"rating-star\" v-on:click='setRating(60)'>☆</i>\n" +
        "        <i class=\"rating-star\" v-on:click='setRating(80)'>☆</i>\n" +
        "        <i class=\"rating-star\" v-on:click='setRating(100)'>☆</i>\n" +
        "      </div>\n" +
        "      <div class=\"fill\" v-bind:style=\"'height; 20px; width: '+ratingscore+'px;'\"><!--Ширина используется для управления строкой рейтинга-->\n" +
        "        <i class=\"rating-star-fill\">★</i>\n" +
        "        <i class=\"rating-star-fill\">★</i>\n" +
        "        <i class=\"rating-star-fill\">★</i>\n" +
        "        <i class=\"rating-star-fill\">★</i>\n" +
        "        <i class=\"rating-star-fill\">★</i>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n",
    data: function(){
        return {
            ratingscore: 0,
        };
    },
    methods: {
        setRating: function(val){
            console.log(val);
            this.ratingscore = val;
            this.$emit('input', val, this)
        }
    }
});


Vue.component('menu-link', {
    props: ['text', 'link'],
    template: "<a v-bind:href=\"link\">{{text}}</a>"
});

Vue.component('short-review', {
    props: {
        mainpagescreen: String,
        mainlink: String,
        commonscore: Number,
        counter: Number,
        content: String,
        username: String,
        userrating: Number,
        siteid: Number
    },
    methods: {
        main: function(id) {
            window.location = "/main/"+id;
        }
    },
    template: "<div class=\"block row ml-2 mr-2 mt-2\" title=\"Читать отзыв целиком\" v-on:click=\"main(siteid)\">" +
        "            <div class=\"main-photo col-2 m-2\">" +
        "                <img v-bind:src=\"mainpagescreen\"/>" +
        "            </div>" +
        "            <div class=\"data col-1 mr-3\">" +
        "                <a href=\"#\">{{mainlink}}</a>" +
        "                <div class=\"rating\">" +
        "                    <div class=\"empty\">" +
        "                        <i class=\"rating-star\">☆</i>" +
        "                        <i class=\"rating-star\">☆</i>" +
        "                        <i class=\"rating-star\">☆</i>" +
        "                        <i class=\"rating-star\">☆</i>" +
        "                        <i class=\"rating-star\">☆</i>" +
        "                    </div>" +
        "                    <div class=\"fill\" v-bind:style=\"'width:'+commonscore+'px; height: 20px'\"><!--Ширина используется для управления строкой рейтинга-->" +
        "                        <i class=\"rating-star-fill\">★</i>" +
        "                        <i class=\"rating-star-fill\">★</i>" +
        "                        <i class=\"rating-star-fill\">★</i>" +
        "                        <i class=\"rating-star-fill\">★</i>" +
        "                        <i class=\"rating-star-fill\">★</i>" +
        "                    </div>" +
        "                </div>" +
        "                <div class=\"messages row\">" +
        "                    <img src=\"imgs/chat.png\">" +
        "                    <div class=\"message-count\">{{counter}}</div>" +
        "                </div>" +
        "            </div>" +
        "" +
        "            <div class=\"content col-9 m-1\">{{content}}" +
        "                <div class=\"white-block\"></div>" +
        "                <div class=\"user-data row\">" +
        "                    <div class=\"username\">{{username}}</div>" +
        "                    <div class=\"userrating\">" +
        "                        <div class=\"rating ml-2\">" +
        "                            <div class=\"empty\">" +
        "                                <i class=\"rating-star\">☆</i>" +
        "                                <i class=\"rating-star\">☆</i>" +
        "                                <i class=\"rating-star\">☆</i>" +
        "                                <i class=\"rating-star\">☆</i>" +
        "                                <i class=\"rating-star\">☆</i>" +
        "                            </div>" +
        "                            <div class=\"fill\" v-bind:style=\"'width: '+userrating+'px; max-height: 20px'\"><!--Ширина используется для управления строкой рейтинга-->" +
        "                                <i class=\"rating-star-fill\">★</i>" +
        "                                <i class=\"rating-star-fill\">★</i>" +
        "                                <i class=\"rating-star-fill\">★</i>" +
        "                                <i class=\"rating-star-fill\">★</i>" +
        "                                <i class=\"rating-star-fill\">★</i>" +
        "                            </div>" +
        "                        </div>" +
        "                    </div>" +
        "                </div>" +
        "            </div>" +
        "        </div>"
});
