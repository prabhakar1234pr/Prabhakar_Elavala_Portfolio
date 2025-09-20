# 🎵 Predicting Song Popularity with Machine Learning

## Overview
This project is a professional-grade machine learning pipeline designed to predict the popularity of songs using audio features and metadata from a massive Spotify dataset (600,000+ tracks). The pipeline is built with modern MLOps best practices, leveraging **ZenML** for orchestration and **MLflow** for experiment tracking, and is structured for clarity, reproducibility, and scalability.

---

## Problem Statement
**Goal:** Predict the popularity score of a song (0-100) based on its audio features and metadata.

- **Dataset:** 600K+ Spotify tracks (1922-2021)
- **Features:** Acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, year, and more
- **Target:** `popularity` (integer, 0-100)

---

## Pipeline Architecture

### 🏗️ **Orchestration: ZenML**
- Modular, step-based pipeline (13+ steps)
- Factory pattern for model and step creation
- Automatic artifact lineage and caching

### 🧪 **Experiment Tracking: MLflow**
- All runs, parameters, metrics, and models logged
- Local file-based tracking for speed and reliability

### ⚡ **Smart Sampling Approach**
- **Hyperparameter tuning:** 100K sample, 30 trials, 3-fold CV (fast, high-quality search)
- **Final training:** Full 600K dataset with best hyperparameters
- **Champion selection:** Automated leaderboard picks the best model

---

## Pipeline Steps

1. **Data Ingestion:** Load raw Spotify data (CSV)
2. **Duplicate Removal:** Drop duplicate rows
3. **Date Parsing:** Extract year, month, day from release date
4. **Missing Value Handling:** Impute or drop missing values
5. **Data Splitting:** Train/test split (80/20)
6. **Categorical Encoding:** One-hot encode categorical features
7. **Feature Transformation:** Handle skewness, scaling
8. **Diagnostics:** Quick checks on feature distributions
9. **Outlier Cleaning:** (Optional) Cap extreme values in training data
10. **Model Training:**
    - 5 models: Linear, Ridge, Random Forest, XGBoost, LightGBM
    - Smart sampling: 100K for tuning, 600K for final fit
11. **Evaluation:** Test all models on the same test set
12. **Leaderboard:** Select champion model (highest R²)
13. **Model Registration:** Save champion to MLflow and as a local pickle

---

## Model Selection & Results

- **Tree-based models (XGBoost, Random Forest, LightGBM)** consistently outperform linear models due to their robustness to outliers and ability to model complex, non-linear relationships.
- **Champion Model:** XGBoost (R² ≈ 0.51)
- **Linear models** are included for benchmarking and educational purposes.

---

## Experiment Tracking & Visualization

- **MLflow UI:**
  - Start with: `mlflow ui --port 5000`
  - View at: [http://localhost:5000](http://localhost:5000)
  - See all runs, parameters, metrics, and artifacts

- **ZenML Dashboard:**
  - Start with: `zenml up`
  - View pipeline runs, steps, and artifacts

---

## How to Run the Pipeline

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Run the pipeline:**
   ```bash
   python Predicting-song-popularity/pipelines/training_pipeline.py
   ```
3. **View results:**
   - **MLflow UI:** [http://localhost:5000](http://localhost:5000)
   - **ZenML Dashboard:** [http://localhost:8237](http://localhost:8237)
   - **Champion model:** Saved in `Predicting-song-popularity/champion_model_XGBoost_<timestamp>.pkl`

---

## Project Highlights

- **Scalable:** Handles 600K+ records efficiently
- **Reproducible:** All steps, parameters, and artifacts tracked
- **Modular:** Easy to extend with new models or steps
- **Professional:** Follows MLOps best practices
- **Portfolio-ready:** Demonstrates advanced ML engineering skills

---

## Credits
- Built with [ZenML](https://zenml.io/) and [MLflow](https://mlflow.org/)
- Dataset: [Spotify Tracks 1922-2021](https://www.kaggle.com/datasets/)

---

## License
MIT License