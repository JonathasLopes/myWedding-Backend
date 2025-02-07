import xlsx from 'xlsx';

export default function ReadExcel(file: string): any {
    const workbook = xlsx.readFile(file);

    const sheetNames = workbook.SheetNames;

    const firstSheet = workbook.Sheets[sheetNames[0]];

    const data = xlsx.utils.sheet_to_json(firstSheet);

    return data;
}