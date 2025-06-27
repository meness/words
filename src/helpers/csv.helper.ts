import { WordCsv } from '~common/types/word-csv.type';

export const parseWordsCsv = (data: string): WordCsv => {
  // Helper function to parse a CSV line into fields
  const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let currentField = '';
    let insideQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      if (char === '"') {
        if (insideQuotes && i + 1 < line.length && line[i + 1] === '"') {
          // Handle escaped quotes ("")
          currentField += '"';
          i += 2; // Skip the doubled quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
          i++;
        }
      } else if (char === ',' && !insideQuotes) {
        // Comma outside quotes = field separator
        result.push(currentField.trim());
        currentField = '';
        i++;
      } else {
        // Add character to current field
        currentField += char;
        i++;
      }
    }
    // Push the last field
    result.push(currentField.trim());

    return result;
  };

  // Split data into rows and parse each row
  const rows = data.split('\n').filter((row) => row.trim() !== ''); // Remove empty rows
  const headers = parseCsvLine(rows[0]);
  const parsedRows = rows.slice(1).map<WordCsv['rows'][number]>((row, index) => {
    const fields = parseCsvLine(row);
    return {
      word: fields[0] || '',
      pronunciation: fields[1] || '',
      meaning: fields[2] || '',
      description: fields[3] || '',
      example: fields[4] || '',
      translation: fields[5] || '',
      id: index + 1
    };
  });

  return {
    headers,
    rows: parsedRows
  };
};
