var reviews = Vue.createApp({
    data() {
        return {
            review_list: [],
            first_page_url: "",
            last_page_url: "",
            next_page_url: "",
            current_page_url: "",
        }
    },
    mounted() {
        let self = this;
        console.log("reviews is mounted");
        axios.get("/review/list")
            .then(function(response){
                console.log(response);
                self.review_list = response.data.data;
                self.first_page_url = response.data.first_page_url;
                self.last_page_url = response.data.last_page_url;
                self.next_page_url = response.data.next_page_url;
                self.current_page += 1;
                console.log(self.review_list);
            });
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-50) {
                //console.log(this.review_list);
                //console.log("this.review_list.last_page_url, this.review_list.last_page_url.indexOf(url) != -1");
                if( this.current_page_url === this.next_page_url ){
                    return;
                }else{
                    self.current_page_url = self.next_page_url;
                    console.log(self.next_page_url);
                    if(self.next_page_url !== null){
                        axios.get(self.next_page_url)
                            .then(function(response){
                                console.log(response);
                                self.review_list = self.review_list.concat(response.data.data);
                                self.first_page_url = response.data.first_page_url;
                                self.last_page_url = response.data.last_page_url;
                                self.next_page_url = response.data.next_page_url;
                            });
                    }
                }
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
        let search_mobile = document.querySelector('#search-mobile');
        search_mobile.addEventListener('keyup', (e) => {
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
        "                </div>" +
        "            </div>" +
        "        </div>"
});
reviews.mount('#currentReviewsContainer');


