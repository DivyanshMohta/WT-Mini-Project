import pg from 'pg'

const StudentData = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "StudentData",
    password: "Bhushan@22210472",
    port: 5432,
});
  
StudentData.connect();

async function AddToDataBase(ExcelData) {
  try {
      const fileData = ExcelData.data;
      if (fileData.length === 0) {
          console.log("Excel file is empty");
          return;
      }

      const headerRow = fileData[0]; // Assuming the first row contains headers
      console.log("Header Names:");
      const attributes = Object.keys(headerRow);
      console.log(attributes);

      // Remove spaces from the table name
      const tableName = `${ExcelData.subjectCode}_${ExcelData.subjectName}_${ExcelData.year}_${ExcelData.academic}_${ExcelData.examType}`.replace(/\s/g, '');
      console.log(tableName);

      const createTableQuery = `CREATE TABLE IF NOT EXISTS "${tableName}" (${attributes.map(attr => `"${attr}" VARCHAR(255)`).join(', ')})`;
      await StudentData.query(createTableQuery);
      console.log("Table created successfully");

      // Insert data into the created table
      for (let i = 1; i < fileData.length; i++) {
          const rowData = fileData[i];
          const insertQuery = `INSERT INTO "${tableName}" (${attributes.map(attr => `"${attr}"`).join(', ')}) VALUES (${attributes.map((_, index) => `$${index + 1}`).join(', ')})`;
          await StudentData.query(insertQuery, attributes.map(attr => rowData[attr]));
      }

      console.log("Data inserted into the table");

      // Insert information about the database into the tracking table
      const trackingTable = 'subject_database_tracking'; // Name of the tracking table
      const createTrackingTableQuery = `CREATE TABLE IF NOT EXISTS "${trackingTable}" ("subject_code" VARCHAR(255), "subject_name" VARCHAR(255), "year" VARCHAR(255), "academic" VARCHAR(255), "exam_type" VARCHAR(255), "table_name" VARCHAR(255))`;
      await StudentData.query(createTrackingTableQuery);

      const insertTrackingQuery = `
          INSERT INTO "${trackingTable}" ("subject_code", "subject_name", "year", "academic", "exam_type", "table_name")
          VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const trackingValues = [
          ExcelData.subjectCode,
          ExcelData.subjectName,
          ExcelData.year,
          ExcelData.academic,
          ExcelData.examType,
          tableName
      ];
      await StudentData.query(insertTrackingQuery, trackingValues);
      console.log("Inserted information into subject database tracking table");

  } catch (error) {
      console.error("Error processing Excel data:", error);
  }
  return;
}

export { AddToDataBase };
