import {APIs, ImageType} from "../resources/apis.js";
import {ImageCommandBuilder} from "../modules/builders/ImageCommand.js";

export const neko = new ImageCommandBuilder()
    .setApi(APIs[ImageType.Neko])
    .setImageTitle("Have a cute neko~!")
    .setName("neko")
    .setDescription("Sends a random neko image.")
    .setNSFW(true)
    .build();
