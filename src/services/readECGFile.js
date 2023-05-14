const readECGFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      const data = parseECGData(content);
      resolve(data);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
};

const parseECGData = (content) => {
  const lines = content.trim().split('\n');
  const time = [];
  const values = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = lines[i].split(',');
    time.push(parseFloat(fields[0]));

    const row = [];
    for (let j = 1; j < fields.length; j++) {
      const value = fields[j].trim();
      row.push(value ? parseFloat(value) : NaN);
    }

    values.push(row);
  }

  return { time, values };
};

export default readECGFile;
