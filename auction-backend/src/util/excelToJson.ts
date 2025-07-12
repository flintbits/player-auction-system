import { read } from "xlsx";

export function fileToJson(file: any){
    const excelFile = read(file)
    console.log(excelFile.Sheets)

}

