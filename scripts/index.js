import Slider from "../services/Slider.js";
import { slideList } from "./../constants/data.js";

window.addEventListener("resize", () => Slider.cssProps(slideList));
