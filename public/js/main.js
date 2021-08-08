var main = Vue.createApp({
	mounted() {
        this.site_id = parseInt(document.querySelector('#site_id').value);
        this.onResizeMethod();
        window.addEventListener('resize', this.onResizeMethod);
	},
	data(){
		return {
		    site_id: 0,
            images: [],
            isMobile: false,
            errors: {
                emptyMain: false,
                emptyImages: false,
                emptyReviewHeader: false,
                emptyContent: false,
            },
            header: "",
            content: "",
            commonscore: 0,
        }
	},
    destroyed() {
        window.removeEventListener('resize', this.onResizeMethod);
    },
    methods: {
	    onResizeMethod(){
            if(window.innerWidth < 1000){
                this.isMobile = true;
            }else{
                this.isMobile = false;
            }
        },
	    updateFastRating(val){
            this.commonscore = val;
            console.log(this.commonscore);
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
		openShortReviewForm: () => {
			console.log('shortReviewForm is open');
			let form = document.querySelector('#shortReviewForm');
			form.style.display = "block";
		},
		hideShortReviewForm: () => {
			let form = document.querySelector('#shortReviewForm');
			form.style.display = "none";
		},
        fileListUpdate: function(){
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
        sendNewReview: function(){
            console.log("sending start");
            console.log(this);

            if(this.header === ""){
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
                this.errors.emptyReviewHeader ||
                this.errors.emptyContent
            ){
                return;
            }
            let request = {
                images: this.images === [] ? "" : this.images,
                rating: this.commonscore,
                header: this.header,
                content: this.content,
                site_id: this.site_id
            };
            let self = this;
            this.error_text = "";
            window.localStorage.removeItem('images');
            window.localStorage.clear();
            axios.post('/new/review', request, {
                'Content-Type': 'application/json',
            }).then(function(result){
                console.log("OK");
                console.log(result);
                document.querySelector('div.reviewPane').innerHTML = self.result_text;
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch(function(error){
                console.log("ERROR");
                self.error_text = error;
            });
        }
	}

});
main.component('rating', {
    props: [
        'rating',
        'description'
    ],
    mounted: function(){
        console.log('rating was created', this.rating);
        this.ratingscore = this.rating;
        this.margin = 100 - this.rating;
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
                            <div class="fill" v-bind:style="'height; 40px; width: '+ratingscore+'px; margin-right: '+margin+'px'">
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                                <i class="rating-star-fill">★</i>
                            </div>
                        </div>
                </div>`,
    data(){
        return {
            ratingscore: 0,
        };
    },
    methods: {
        setRating: function(val){
            console.log(val);
            this.ratingscore = val;
            this.margin = 100 - val;
            this.$emit('updaterating', val, this)
        }
    }
});

main.mount('main');
