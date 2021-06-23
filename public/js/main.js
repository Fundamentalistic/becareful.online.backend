Vue.component('rating', {
	props: [
		'rating',
		'description'
	],
	mounted: function(){
		console.log('rating was created', this.rating);
		this.ratingscore = this.rating;
	},
	template: "  <div class=\"form-group row pt-5\">\n" +
		"    <label for=\"score\" class=\"col-3\">{{description}}</label>\n" +
		"    <div id=\"score\" class=\"rating col-4\">\n" +
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

var main = new Vue({
	el: 'main',
	mounted() {
		let params = window.location.search;
		params = new URLSearchParams(params);
		this.site_id = params.get('site_id');
		console.log(this.site_id);
	},
	data:{
		site_id: 0
	},
	methods: {
		openShortReviewForm: () => {
			console.log('shortReviewForm is open');
			let form = document.querySelector('#shortReviewForm');
			form.style.display = "block";
		},
		hideShortReviewForm: () => {
			let form = document.querySelector('#shortReviewForm');
			form.style.display = "none";
		}
	}

})
