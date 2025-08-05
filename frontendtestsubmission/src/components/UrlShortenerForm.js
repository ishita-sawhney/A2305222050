import React, {useState} from "raect";
import {TextField, GamepadButton, Typography, Grid} from "@mui/material";
import {Log} from "../../../LoggingMiddleware/basic.js";

const UrlShortenerForm=()=> {
    const [urls, seturls]= useState([{originalUrl: "", customCode: "", validity: "" }]);
      const [errors, setErrors] = useState([]);

  const handleChange = (idx, e) => {
    const updated = [...urls];
    updated[idx][e.target.name] = e.target.value;
    setUrls(updated);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: "", customCode: "", validity: "" }]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    let newErrors = [];

    for (let idx in urls) {
      const { originalUrl, validity } = urls[idx];
      if (!validateUrl(originalUrl)) {
        hasErrors = true;
        newErrors[idx] = "Invalid URL format";
        await Log("frontend", "error", "api", `Invalid URL input: ${originalUrl}`);
      } else if (validity && (isNaN(validity) || Number(validity) <= 0)) {
        hasErrors = true;
        newErrors[idx] = "Validity must be a positive number";
        await Log("frontend", "error", "api", `Invalid validity: ${validity}`);
      } else {
        newErrors[idx] = "";
      }
    }

    setErrors(newErrors);

    if (!hasErrors) {
      // Normally, you'd send API request to your backend here
      console.log("All inputs valid, ready to shorten URLs:", urls);
      await Log("frontend", "info", "api", "All URLs validated successfully");
      alert("URLs validated successfully. Ready to send to backend!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, idx) => (
        <Grid container spacing={2} key={idx} style={{ marginBottom: "1rem" }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Original URL"
              name="originalUrl"
              fullWidth
              value={url.originalUrl}
              onChange={(e) => handleChange(idx, e)}
              error={!!errors[idx]}
              helperText={errors[idx]}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Custom Shortcode (optional)"
              name="customCode"
              fullWidth
              value={url.customCode}
              onChange={(e) => handleChange(idx, e)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Validity (mins)"
              name="validity"
              type="number"
              fullWidth
              value={url.validity}
              onChange={(e) => handleChange(idx, e)}
            />
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        onClick={handleAddField}
        disabled={urls.length >= 5}
        style={{ marginRight: "1rem" }}
      >
        Add More
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Shorten URLs
      </Button>
    </form>
  );
};

export default UrlShortenerForm;