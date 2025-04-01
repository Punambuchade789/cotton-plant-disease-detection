import React, { useState } from "react";
import axios from "axios";
import "./leaf.css";

function Leaf() {
  const [image, setImage] = useState(null);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        setImage(null);
        return;
      }
      setError("");
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://your-api-url.com/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSeverity(response.data.severity);
    } catch (error) {
      console.error("Error during disease detection", error);
      alert("Error detecting disease");
    }

    setLoading(false);
  };

  const Remedies = ({ severity }) => {
    const remedies = {
      critical: "Spray with a strong fungicide and remove infected leaves.",
      moderate: "Use a mild fungicide and regularly monitor for symptoms.",
      mild: "Ensure proper watering and inspect leaves for further signs.",
    };

    return (
      <div className="remedies">
        <h3>Remedies</h3>
        <p>{remedies[severity] || "Please upload an image to detect disease severity."}</p>
      </div>
    );
  };

  return (
    <div className="leaf-container">
      <header>
        <h1>Cotton Leaf Disease Detection</h1>
        <p>Upload an image of a cotton leaf to detect disease severity.</p>
      </header>

      {/* Project Description */}
      <section className="project-description">
        <p>
          This website utilizes AI to detect diseases in cotton leaves. 
          Simply upload an image, and the system will analyze the severity 
          of the disease, providing appropriate remedies.
        </p>
      </section>

      <main>
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {error && <p className="error">{error}</p>}
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Detecting..." : "Submit"}
          </button>
        </div>

        <div className="result">
          {severity && (
            <div>
              <h2>Result: {severity}</h2>
              <Remedies severity={severity} />
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>© 2025 Cotton Leaf Disease Detection Project</p>
      </footer>
    </div>
  );
}

export default Leaf;
