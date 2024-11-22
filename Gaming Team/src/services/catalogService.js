import Game from '../models/DataBase.js';

export async function getAll(){
    return await Game.find({}).lean();
}
