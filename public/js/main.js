var main = Vue.createApp({
	mounted() {
        this.site_id = parseInt(document.querySelector('#site_id').value);
        this.onResizeMethod();
        window.addEventListener('resize', this.onResizeMethod);
        window.addEventListener('scroll', this.saveScrollPosition);
        this.upBtn.background = document.querySelector('.up-btn');
        this.upBtn.png = document.querySelector('.up-btn > img');
        this.upBtn.png.style.opacity = 0.0;
        this.upBtn.background.style.opacity = 0.0;
        this.upBtn.background.addEventListener('mouseover', this.highlightMouse);
        this.upBtn.background.addEventListener('mouseout', this.highlightOff);
        let authorizedInput = document.querySelector('#authorizedField');
        if(authorizedInput !== null){
            this.authorized = authorizedInput.value;
        }
        console.log(this.authorized);

	},
	data(){
		return {
		    site_id: 0,
            images: [],
            isMobile: false,
            back: false,
            mouseOnUpBtn: false,
            lastScrollPosition: 0,
            savedScrollPosition: 0,
            authorized: undefined,
            result_text: `  <div class="row d-flex justify-content-center>" style="margin-top: 30%!important"><h1>Спасибо за Ваш отзыв!</h1></div>
                            <div class="row d-flex justify-content-center>"><p style="margin-left: 30px">Он появится на этой странице после модерации</p></div>`,
            errors: {
                emptyMain: false,
                emptyImages: false,
                emptyReviewHeader: false,
                emptyContent: false,
            },
            header: "",
            content: "",
            commonscore: 0,
            upBtn: {
		        background: undefined,
                png: undefined
            }
        }
	},
    destroyed() {
        window.removeEventListener('resize', this.onResizeMethod);
        window.removeEventListener('resize', this.saveScrollPosition);
    },
    methods: {
        highlightMouse(){
            this.mouseOnUpBtn = true;
        },
        highlightOff(){
            this.mouseOnUpBtn = false;
        },
	    saveScrollPosition(){
	        this.lastScrollPosition = window.scrollY;
	        if(this.lastScrollPosition === 0 && !this.savedScrollPosition){
                this.upBtn.png.style.opacity = 0.0;
                this.upBtn.background.style.opacity = 0.0;
            }else{
                this.upBtn.png.style.opacity = 0.6;
                this.upBtn.background.style.opacity = 0.3;
            }
        },
	    upOrBack(){
	        console.log(this.back, this.lastScrollPosition);
	        let intermediateScrollPosition = 0;
            if(!this.back && window.scrollY){
                this.savedScrollPosition = this.lastScrollPosition;
                window.scrollTo(0, 0);
                this.back = !this.back;
            }else{
                window.scrollTo(0, this.savedScrollPosition);
                this.back = !this.back;
            }
        },
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
        showPhoto: function(el, link){
            console.log(el);
            document.querySelector('.background-plane').style.display = "block";
            if(el){
                document.querySelector('.sliderComponent').src = this.images[el];
            }else{
                document.querySelector('.sliderComponent').src = link;
            }
            document.querySelector('.sliderComponent').style.display = "block";
        },
        hideSlider: function(){
            document.querySelector('.background-plane').style.display = "none";
            document.querySelector('.sliderComponent').src = '';
            document.querySelector('.sliderComponent').style.display = "none";
        },
		openShortReviewForm: function(){
			if(this.authorized){
                let form = document.querySelector('#shortReviewForm');
                form.style.display = "block";
            }else{
			   window.location = "/login";
            }
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
        'description',
        'editable'
    ],
    mounted: function(){
        console.log('rating was created', this.rating);
        this.ratingscore = this.rating;
        this.margin = 100 - this.rating;
        console.log(this.editable);
        if(this.editable === false){
            this.cursor = 'default';
        }else{
            this.cursor = 'pointer';
        }
        if(this.editable === undefined){
            this.editable = true;
        }
    },
    template: `<div class="form-group row pt-5">
                  <label for="score" class="col-2">{{description}}</label>
                        <div id="score" class="rating col-2">
                            <div class="empty" v-bind:style="'cursor: '+cursor">
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
            console.log(this.editable);
            if(this.editable === undefined){
                this.ratingscore = val;
                this.margin = 100 - val;
                this.$emit('updaterating', val, this);
            }
        }
    }
});

main.component('review-photo-slider', {
    props: [
        'links'
    ],
    data: function(){
        return {
            photos: undefined,
        }
    },
    methods: {
        showScreenshot: function(link){
            console.log(link);
            document.querySelector('.background-plane').style.display = "block";
            document.querySelector('.sliderComponent').style.display = "block";
            document.querySelector('.sliderComponent').src = link;
            sliderLinks = this.photos;
            currentIndex = this.photos.indexOf(link);
        },

        hideScreenshot: function(){
            document.querySelector('.background-plane').style.display = "none";
            document.querySelector('.sliderComponent').src = '';
            document.querySelector('.sliderComponent').style.display = "none";
        }
    },
    mounted: function(){
        let rawPhotoLinks = JSON.parse(this.links);
        this.photos = [];
        for( photo of rawPhotoLinks){
            console.log(photo.length);
            if(photo.length > 0){
                this.photos.push(photo);
            }
        }
        console.log(this.photos);
    },
    template: `
        <div class="photo-line">
        <div class="row d-flex justify-content-start" style="min-height: 80px">
            <div class='row images d-flex justify-content-start' style='margin-left: 20px; margin-top: 20px; min-width: 80%; overflow: hidden'>
                <img class='img-thumbnail align-left' style='max-height: 300px;' v-for="photo in photos" v-bind:src='photo' v-on:click="showScreenshot(photo)"/>
            </div>
        </div>
        </div>
    `
})

main.mount('main');

let sliderLinks = [];
let currentIndex = 0;

let showScreenshot = function(link){
    console.log(link);
    document.querySelector('.background-plane').style.display = "block";
    document.querySelector('.sliderComponent').style.display = "block";
    document.querySelector('.sliderComponent').src = link;
};
let hideScreenshot = function(){
    document.querySelector('.background-plane').style.display = "none";
    document.querySelector('.sliderComponent').src = '';
    document.querySelector('.sliderComponent').style.display = "none";
};

let nextPhoto = function(){
    currentIndex = (currentIndex + 1) % sliderLinks.length;
    document.querySelector('.sliderComponent').src = sliderLinks[currentIndex];
}
