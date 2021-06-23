var reviews = new Vue({
    el: "#currentReviewsContainer",
    data() {
        return {
            review_list: [],
            page: 1
        }
    },
    mounted() {
        let self = this;
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
    }
});

var header = new Vue({
    el: "header",
    data: {
        title: "BECAREFUL - сайт о других сайтах. Отзывы и рейтинги. Будь в курсе того кому можно верить, а кому нет",
        links: [
            {link: "/about", text: "О нас"},
            {link: "/referals", text: "Рекламодателям"},
            {link: "/referals", text: "Владельцам сайтов"},
            {link: "/new", text: "Оставить отзыв"},
        ],
    }
});
