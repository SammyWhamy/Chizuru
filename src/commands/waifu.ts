import {APIs, ImageType} from "../resources/apis.js";
import {ImageCommandBuilder} from "../modules/builders/ImageCommand.js";

export const waifu = new ImageCommandBuilder()
    .setApi(APIs[ImageType.Waifu])
    .setName("waifu")
    .setDescription("Sends a random hentai waifu image.")
    .setNSFW(true)
    .build();
