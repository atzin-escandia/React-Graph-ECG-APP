onmessage = async (event) => {
  try {
    const file = event.data;
    const content = await readFileAsync(file);
    const data = parseECGData(content);
    postMessage(data);
  } catch (error) {
    postMessage({ error: error.message });
  }
};

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const parseECGData = (content) => {
  console.log('qqqqq', content);

  const lines = content.trim().split("\n");
  const time = [];
  const values = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = lines[i].split(",");
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

export default onmessage;
