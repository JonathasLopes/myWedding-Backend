import xlsx from 'xlsx';

export function ReadExcel(file: string): any {
    const workbook = xlsx.readFile(file);

    const sheetNames = workbook.SheetNames;

    const firstSheet = workbook.Sheets[sheetNames[0]];

    const data = xlsx.utils.sheet_to_json(firstSheet);

    return data;
}

export function WriteExcel(data: any): any {
  const worksheet = xlsx.utils.json_to_sheet(data);

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Convidados');

  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  return excelBuffer;
}