import Slider from "../services/Slider.js";
import { config } from "./../constants/data.js";

// создание экзеспляра и авто-переключение...
const slider = new Slider(config);
slider.autoSlider();

// динамически стилизуем размеры .popular__slider__tracker__item и .popular__slider__tracker__item
window.addEventListener("resize", () => slider.cssProps());
