import { mongoose } from "mongoose";
import env from '../utils/envVariables.js'


const connectionDataBase = async () => {
    try {
        await mongoose.connect(env.db);
        console.log("BDD conectada");
    } catch (e) {
        console.log("Error al conectar con bdd: ", e);
        process.exit(1);
    }
};

export default connectionDataBase