import { Client } from 'dishttp';
import {commands} from "./commands/index.js";

const client = new Client();

client.addCommands(commands);

export { client };
export default client.export();
