import {APIs, ImageType} from "../resources/apis.js";
import {ImageCommandBuilder} from "../modules/builders/ImageCommand.js";

export const highres = new ImageCommandBuilder()
    .setApi(APIs[ImageType.HighRes])
    .setName("4k")
    .setDescription("Sends a random 4k image.")
    .setNSFW(true)
    .build();
