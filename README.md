# csv-refine

`csv-refine` is a lightweight Node.js utility for processing and refining CSV files. It provides features such as date format correction, argument parsing, and customizable options for sorting and transforming CSV data.

## Features

- **Date Format Correction**: Automatically converts specified date fields to ISO format (`YYYY-MM-DD`).
- **Argument Parsing**: Supports command-line arguments for flexible input handling.
- **Reverse Sorting**: Optionally reverse the order of processed data.
- **CSV to JSON Conversion**: Leverages `csvtojson` for seamless CSV-to-JSON transformation.

## Installation

Install dependencies:

```bash
npm install
```

# Usage
Run the script with the following command:

```shell
node csv-refine.js <file-path> [--reverse] [--date-fields <fields>]
```

Arguments
- `<file-path>`: Path to the CSV file to process (required).
- `--reverse`: Reverses the order of the processed data (optional).
- `--date-fields <fields>`: Comma-separated list of date fields to correct to ISO format (optional).

Example

```shell
node csv-refine.js sample.csv --reverse --date-fields "Date,Start date,End date"
```

This will:

1. Convert the specified date fields (Date, Start date, End date) to ISO format.
2. Reverse the order of the processed data.
3. Output the transformed JSON to the console.
