let menu_object = {
    props: ['text', 'link'],
    template: "<a v-bind:href=\"link\">{{text}}</a>"
};

var header1 = Vue.createApp({
    data(){
        return {
            title: "BECAREFUL - сайт о других сайтах. Отзывы и рейтинги. Будь в курсе того кому можно верить, а кому нет",
            links: [],
        }
    },
    mounted(){
        console.log("header is created");
        axios.get('/links').then((response) => {
            console.log(response);
            if  (response.status === 200){
                console.log(this);
                this.$data.links = response.data;
            }
        });
    }
});

let rating_obj = {
    props: [
        'rating',
        'description'
    ],
    mounted: function(){
        console.log('rating was created', this.rating);
        this.ratingscore = this.rating;
    },
    template: `<div class="form-group row pt-5">
                  <label for="score" class="col-2">{{description}}</label>
                        <div id="score" class="rating col-2">
                            <div class="empty">
                                <i class="rating-star" v-on:click='setRating(20)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(40)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(60)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(80)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(100)'>☆</i>
                            </div>

                            <!--Ширина используется для управления строкой рейтинга-->
                            <div class="fill" v-bind:style="'height; 40px; width: '+ratingscore+'px;'">
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                            </div>
                        </div>
                </div>`,
    data: function(){
        return {
            ratingscore: 0,
        };
    },
    methods: {
        setRating: function(val){
            console.log(val);
            this.ratingscore = val;
            this.$emit('updaterating', val, this);
        }
    }
};

header1.component('menu-link', menu_object);

header1.mount('#header_menu');

let dropdown_user_is_open = false;
document.querySelector('.logo').onclick = () => { window.location = "/" };
document.querySelector('.uinput').onclick = (event) => {

    console.log(event);

    if(!dropdown_user_is_open){
        document.querySelector('.dropdown-user-panel').style.display = "block";
        document.querySelector('.dropdown-user-panel').style.left = event.x + "px";
        document.querySelector('.dropdown-user-panel').style.top = event.y + "px";
    }else{
        document.querySelector('.dropdown-user-panel').style.display = "none";
    }
    dropdown_user_is_open = !dropdown_user_is_open;

};

document.querySelector('.dropdown-user-panel').addEventListener("onmouseleave", () => {
    document.querySelector('.dropdown-user-panel').style.display = "none";
});
