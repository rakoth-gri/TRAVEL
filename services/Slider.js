import { sliderTracker, sliderDotes, sliderContainer } from "./../constants/dom.js";
import { slideList } from "./../constants/data.js";

class Slider {
	constructor(slider, tracker, controls, slideList) {
		this.tracker = tracker;
		this.controls = controls;
		this.slideList = slideList;
		this.slider = slider;
		// счетчик
		this.count = 0;
		this.width = null;
		// процедуры
		this.renderSlides(this.slideList);
		this.renderDotes(this.slideList);
		this.cssProps(this.slideList);
		this.addEventToSlider();
	}

	renderSlides(list) {
		const html = list
			.map(({ title, src }) => {
				return `
            <div class="popular__slider__tracker__item">				
                <img
                    src="${src}"
                    alt="slide"
                    class="popular__slider__tracker__img"
                    loading="lazy"
                />
                <strong> ${title} </strong>
            </div>
            `;
			})
			.join("");

		this.tracker.innerHTML = html;
	}

	renderDotes(list) {
		list.forEach((_, ind) =>
			this.controls.insertAdjacentHTML("beforeend", `<div class="slider__controls" id="${ind}"></div>`)
		);
	}

	cssProps(list) {
		this.width = this.slider.offsetWidth;
		for (let item of this.tracker.querySelectorAll(".popular__slider__tracker__item")) {
			item.style.width = `${this.width}px`;
		}
		this.tracker.style.width = `${list.length * this.width}px`;
	}

	addEventToSlider(controls) {
		this.slider.addEventListener("click", this.changeCount);
	}

	changeCount = (e) => {
		if (!(e.target.matches(".slider__controls") || e.target.matches(".arrows"))) {
			return;
		}

		switch (true) {
			case e.target.matches(".slider__controls"):
				this.count = +e.target.id;
				break;
			default:
				e.target.id === "forward" ? this.count++ : this.count--;
				break;
		}

		console.log(this.count);
		

		this.checkCount(this.count);		
		
	};

	checkCount(count) {
		if(count >= this.slideList.length) this.count = 0;
		if(count < 0) this.count = this.slideList.length - 1;
		this.changeSlide(this.count);
	}

	changeSlide(count) {
		this.tracker.style.transform = `translateX(-${count * this.width}px)`;
	}

	// autoSlider() {}
}

export default new Slider(sliderContainer, sliderTracker, sliderDotes, slideList);
