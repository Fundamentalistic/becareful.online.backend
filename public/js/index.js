var reviews = Vue.createApp({
    data() {
        return {
            review_list: [],
            page: 1
        }
    },
    mounted() {
        let self = this;
        console.log("reviews is mounted");
        axios.get("/review/list")
            .then(function(response){
                console.log(response);
                self.last_page_url = response.data.last_page_url;
                self.review_list = response.data.data;
            });
        window.addEventListener('scroll', function(){
            console.log(reviews.page);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-50) {
                let url = "/review/list?page="+reviews.page;
                console.log(reviews.last_page_url, reviews.last_page_url.indexOf(url) != -1);
                if( reviews.last_page_url.indexOf(url) != -1 ){
                    return;
                }
                reviews.page += 1;
                axios.get(url)
                    .then(function(response){
                        console.log(self.review_list);
                        self.review_list = self.review_list.concat(response.data.data);
                    });
            }
        });
        let search = document.querySelector('#search');
        search.addEventListener('keyup', (e) => {
            if(e.key === "Enter"){
                axios.get("/review/search", {
                    params: {
                        search: search.value
                    }
                }).then(function(response){
                        console.log(response);
                        self.last_page_url = response.data.last_page_url;
                        self.review_list = response.data.data;
                    });
            }
        });
    }
});

reviews.component('rating', rating_obj)

reviews.component('short-review', {
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
            window.location = "/site/"+id+"/detail";
        }
    },
    template: "<div class=\"block row ml-2 mr-2 mt-2\" title=\"Читать отзыв целиком\" v-on:click=\"main(siteid)\">" +
        "            <div class=\"main-photo col-2 m-2\">" +
        "                <img v-bind:src=\"mainpagescreen\"/>" +
        "            </div>" +
        "            <div class=\"data mr-3\">" +
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
reviews.mount('#currentReviewsContainer');


