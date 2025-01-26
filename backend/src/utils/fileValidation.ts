import { endOfMonth, isValid, isWithinInterval, startOfMonth } from "date-fns";
import ExcelJS from "exceljs";

interface ValidationError {
  sheetName: string;
  rowNumber: number;
  description: string;
}

async function validateExcelFile(filePath: string): Promise<ValidationError[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const errors: ValidationError[] = [];
  const currentDate = new Date();

  workbook.worksheets.forEach((worksheet) => {
    const requiredColumns = ["Name", "Amount", "Date", "Verified"];
    const headerRow = worksheet.getRow(1);
    const columnHeaders = headerRow.values as string[];

    requiredColumns.forEach((col) => {
      if (!columnHeaders.includes(col)) {
        errors.push({
          sheetName: worksheet.name,
          rowNumber: 1,
          description: `Missing required column: ${col}`,
        });
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const name = row.getCell("Name").value;
      const amount = row.getCell("Amount").value;
      const dateCell = row.getCell("Date").value;
      const verified = row.getCell("Verified").value;

      if (!name) {
        errors.push({
          sheetName: worksheet.name,
          rowNumber,
          description: "Name is mandatory",
        });
      }

      if (!amount) {
        errors.push({
          sheetName: worksheet.name,
          rowNumber,
          description: "Amount is mandatory",
        });
      }

      if (!dateCell) {
        errors.push({
          sheetName: worksheet.name,
          rowNumber,
          description: "Date is mandatory",
        });
      }

      if (amount !== null && isNaN(Number(amount)) && Number(amount) <= 0) {
        errors.push({
          sheetName: worksheet.name,
          rowNumber,
          description: "Amount must be a positive number",
        });
      }

      if (dateCell) {
        const parsedDate = new Date(dateCell.toString());

        if (!isValid(parsedDate)) {
          errors.push({
            sheetName: worksheet.name,
            rowNumber,
            description: "Invalid date format",
          });
        } else if (
          !isWithinInterval(parsedDate, {
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate),
          })
        ) {
          errors.push({
            sheetName: worksheet.name,
            rowNumber,
            description: "Date must be within the current month",
          });
        }
      }
    });
  });

  return errors
}
