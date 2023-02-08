export default class Slider {
	constructor({ selector, slideList }) {
		// dom
		this.slider = document.querySelector(selector);
		this.tracker = this.slider.querySelector(".popular__slider__tracker");
		this.controls = this.slider.querySelector(".slider__dotes");
		this.slideList = slideList;
		// логика:
		this.count = 0;
		this.interval = null;
		this.currentWidth = null;
		// методы:
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

	cssProps() {
		this.currentWidth = this.slider.offsetWidth;
		for (let item of this.tracker.querySelectorAll(".popular__slider__tracker__item")) {
			item.style.width = `${this.currentWidth}px`;
		}
		this.tracker.style.width = `${this.slideList.length * this.currentWidth}px`;
	}

	addEventToSlider() {
		this.slider.addEventListener("click", this.changeCount);
	}

	changeCount = ({ target }) => {
		// проверка
		if (!(target.matches(".slider__controls") || target.matches(".arrows"))) return;

		switch (true) {
			case target.matches(".slider__controls"):
				this.count = +target.id;
				this.checkCount(this.count);
				break;
			case target.id === "forward":
				this.Increment();
				break;
			default:
				this.Decrement();
				break;
		}
		this.checkCount(this.count);
	};

	Increment() {
		this.count++;
		this.checkCount(this.count);
	}

	Decrement() {
		this.count--;
		this.checkCount(this.count);
	}

	checkCount(count) {
		if (count >= this.slideList.length) this.count = 0;
		if (count < 0) this.count = this.slideList.length - 1;
		this.changeSlide(this.count);
		this.showActiveDot(this.count);
	}

	changeSlide(count) {
		this.tracker.style.transform = `translateX(-${count * this.currentWidth}px)`;
	}

	showActiveDot(index) {
		[...this.controls.children].forEach((dot) => dot.classList.remove("active"));
		[...this.controls.children][index].classList.add("active");
	}

	autoSlider() {
		this.interval = setInterval(() => this.Increment(), 2000);
	}
}
