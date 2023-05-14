import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ECGChart from "../ECGChart/ECGChart";
import useStyles from "./ECGComponent.styles";
import Loading from "../../../Loading/Loading";

const worker = new Worker(
  new URL("../../../../../services/fileReader.worker.js", import.meta.url)
);

interface ECGData {
  time: number[];
  values: number[][];
}

function ECGComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [ecgData, setEcgData] = useState<ECGData>({ time: [], values: [] });
  const [error, setError] = useState<string>();

  const classes = useStyles();

  const handleFileUpload = (event: any) => {
    setLoading(true);
    const file = event.target.files?.[0];

    worker.postMessage(file);
    worker.onmessage = (event: any) => {
      const data = event.data;

      if (data.error) {
        setError(data.error);
      } else {
        setEcgData(data);
      }
      setLoading(false);
    };
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <input type="file" accept=".txt" onChange={handleFileUpload} />
        </Grid>
        <Grid item>
          {loading && <Loading />}
          {error && <div>Error: {error}</div>}
          {!loading && ecgData.time.length > 0 && (
            <ECGChart time={ecgData.time} values={ecgData.values} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ECGComponent;
