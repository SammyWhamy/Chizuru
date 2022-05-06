import {APIs, ImageType} from "../resources/apis.js";
import {ImageCommandBuilder} from "../modules/builders/ImageCommand.js";

export const trap = new ImageCommandBuilder()
    .setApi(APIs[ImageType.Trap])
    .setName("trap")
    .setDescription("Sends a random trap image.")
    .setNSFW(true)
    .build();
