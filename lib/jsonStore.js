import fs from "fs";
import path from "path";

export function readJSON(filePath){
    try{
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }catch(err){
        console.error("Error reading JSON:", filePath, err)
        return null;
    }
}

export function writeJSON(filePath, data){
    try{
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    }catch(err){
        console.log("Error writing JSON:", filePath, err);
        return false;
    }
}