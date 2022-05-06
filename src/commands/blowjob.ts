import {APIs, ImageType} from "../resources/apis.js";
import {ImageCommandBuilder} from "../modules/builders/ImageCommand.js";

export const blowjob = new ImageCommandBuilder()
    .setApi(APIs[ImageType.Blowjob])
    .setName("blowjob")
    .setDescription("Sends a random hentai blowjob gif.")
    .setNSFW(true)
    .build();
