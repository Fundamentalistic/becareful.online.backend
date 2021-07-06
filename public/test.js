  <h5 for="photos">Фотографии сайта</h5> 
          <div id="photoBtn" class="form-group row py-3" style="height: 100px;"> 
           <h3 v-if="errors.emptyImages" class="alert">Сайт не может быть создан без фотографий</h3> 
            <div v-on:click='openFileManager()' class="append-image-btn" style="position: absolute; left: 1.5%;" title="Фотографии сайта"> 
              <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <g filter="url(#filter0_d)"> 
                  <rect x="4" width="70" height="70" rx="8" fill="white"/> 
                  <rect x="4.5" y="0.5" width="69" height="69" rx="7.5" stroke="black"/> 
                </g> 
                <line x1="40" y1="15" x2="40" y2="55" stroke="black" stroke-width="2"/> 
                <line x1="19" y1="34" x2="59" y2="34" stroke="black" stroke-width="2"/> 
                <defs> 
                  <filter id="filter0_d" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> 
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/> 
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/> 
                    <feOffset dy="4"/> 
                    <feGaussianBlur stdDeviation="2"/> 
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> 
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> 
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> 
                  </filter> 
                </defs> 
              </svg> 
         
            </div> 
          <div class='row images d-flex justify-content-start' style='margin-left: 120px; max-height: 80px; min-width: 80%; overflow: hidden'> 
        <img class='img-thumbnail align-left' style='max-height: 75px; max-width: 75px' v-for='(image, index) in images' v-bind:src='image' v-on:click='showPhoto(index)'/> 
        </div> 
          </div> 
