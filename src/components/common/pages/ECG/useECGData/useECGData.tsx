import { useState, useEffect } from 'react';

function useECGData(filePath: 'RequestInfo | URL') {
  const [ecgData, setECGData] = useState<{ time: number; leads: number[]; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        const rows = text.split('\n');
        const ecgData = rows
          .filter(row => !!row)
          .map(row => {
            const values = row.split(',');
            const time = parseFloat(values[0]);
            const leads = values.slice(1).map(parseFloat);
            return { time, leads };
          });
        setECGData(ecgData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filePath]);

  return ecgData;
}

export default useECGData;