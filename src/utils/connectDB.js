import connection, { connect } from "mongoose";
import env from '../utils/envVariables.js';

class ConectMongoDB {
    static #instance = null; // Instancia privada para Singleton

    constructor() {
        if (!ConectMongoDB.#instance) { // Si no existe la instancia
            this.init(); // Inicializa la conexión
            ConectMongoDB.#instance = this; // Guarda la instancia en el atributo statico y privado #
        } else {
            console.log("Instancia de BBDD ya existente"); //Si existe la instancia retorna este aviso.
        }
        return ConectMongoDB.#instance; // Retorna la instancia
    }

    async init() { //Se ejecuta una sola vez dentro del constructor
        try {
            if (connection.readyState === 1) {  //Toma el estado de la conección a la base de datos
                // 0 = Desconectado, 1 = Conectado, 2 = Conectando, 3 = Desconectando, 4 = Error, 99 = Sin estado
                console.log("La base de datos ya está conectada.");
                return; //Si ya está conectada, no hace nada
            }

            await connect(env.db); // Conecta a la base de datos
            console.log("BDD conectada exitosamente"); // Si la conexión es exitosa, muestra este mensaje
        } catch (error) {
            console.error("Error al conectar con BDD:", error.message);// Si la conexión falla, muestra este mensaje
            process.exit(1); // Detiene la aplicación si falla la conexión
        }
    }

    static getInstance() { //Se ejecuta cada vez que se llama a la clase
        if (!this.#instance) { //Si no existe la instancia
            this.#instance = new ConectMongoDB(); //Crea una nueva instancia
        }
        return this.#instance;
    }
}

export default ConectMongoDB.getInstance();
//Se va importar dentro de app sin tener que instanciarse ya que con la 
//exportacion por default del getInstance() se instancia automaticamente