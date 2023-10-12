import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://meierezequiel:Mongodb123@codercluster.uuavg6o.mongodb.net/preEntrega2?retryWrites=true&w=majority');
        console.log('base de datos conectada exitosamente');
    } catch (error) {
        console.log(`error al conectar la base de datos ${error.message}`);
    }
};