import Slider from "../services/Slider.js";
import { slideList } from "./../constants/data.js";


Slider.autoSlider();

// динамически стилизуем размеры .popular__slider__tracker__item и .popular__slider__tracker__item
window.addEventListener("resize", () => Slider.cssProps(slideList));
