var main = Vue.createApp({
	mounted() {
		let params = window.location.search;
		params = new URLSearchParams(params);
		this.site_id = params.get('site_id');
		console.log(this.site_id);
	},
	data(){
		return {
		    site_id: 0,
            errors: {
                emptyMain: false,
                emptyImages: false,
                emptyReviewHeader: false,
                emptyContent: false,
            }

        }
	},
	methods: {
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
    },
    template: `<div class="form-group row pt-5">
                  <label for="score" class="col-2">{{description}}</label>
                        <div id="score" class="rating col-2">
                            <div class="empty">
                                <i class="rating-star" v-on:click='setRating(40)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(60)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(80)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(100)'>☆</i>
                                <i class="rating-star" v-on:click='setRating(120)'>☆</i>
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
    data(){
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

main.mount('main');
