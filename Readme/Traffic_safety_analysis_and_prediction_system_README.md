# Traffic-Safety-Analysis-and-Prediction-System-

## Project Overview
This project analyzes traffic collision data in Montgomery County, Maryland, to identify high-risk crash zones and assess the impact of lighting conditions on accident severity. Using machine learning techniques like K-Means and DBSCAN clustering, as well as statistical hypothesis testing, we provide data-driven recommendations for improving road safety through infrastructure enhancements such as streetlight installations.

## Team Members
- Eunah Choi
- Mallika Choudhari
- Prabhakar Elavala
- Nikhil Gade
- Tejashwini Nagendra Singh

## Course Information
- **Institution:** College of Professional Studies, Northeastern University
- **Course:** ALY 6110 Data Management & Big Data
- **Instructor:** Dr. Donhoffner
- **Date:** February 13, 2025

## Research Question
**How do lighting conditions impact traffic collisions in Montgomery County, and which locations require immediate streetlight installations to enhance road safety?**

## Hypothesis Testing
- **Null Hypothesis (H₀):** Lighting conditions have no significant impact on crash severity.
- **Alternative Hypothesis (H₁):** Lighting conditions significantly affect crash severity.

## Data Acquisition
- **Source:** [Data.gov](https://catalog.data.gov/dataset/crash-reporting-drivers-data)
- **Dataset Name:** Crash Reporting – Drivers Data
- **Size:** 192,000+ records spanning January 1, 2015 – January 21, 2025
- **Key Variables:** Weather, Surface Condition, Lighting, Collision Type, Traffic Control, Speed Limit, Driver at Fault, Injury Severity, and Location Coordinates (Latitude/Longitude)

## Methodology
1. **Data Cleaning & Preprocessing**
   - Removed irrelevant or highly missing columns
   - Standardized categorical variables
   - Handled missing values and duplicates
   - Applied feature engineering (e.g., time-of-day classification, severity index)
   - Outlier retention for high-impact incident analysis

2. **Analytical Methods**
   - **K-Means Clustering**: Segmented accident-prone areas into high, moderate, and low-risk zones.
   - **DBSCAN Clustering**: Identified high-density crash hotspots in poorly lit areas.
   - **Chi-Square Test**: Assessed the significance of lighting conditions on crash severity.
   - **Geospatial Visualizations**: Created heatmaps, scatter plots, and clustering diagrams.

## Key Findings
- Poor lighting conditions significantly contribute to high-severity crashes, especially at intersections and high-speed roads.
- High-risk crash zones were identified and prioritized for intervention.
- Speed limits between 30-50 mph showed the highest crash severity levels.
- Roads requiring immediate streetlight installation include Woodfield Rd, Clarksburg Rd, Log House Rd, Damascus Rd, Eisenhower Memorial Hwy, Barnesville Rd, and Ridge Rd.

## Recommendations
- **Immediate Actions for High-Risk Areas:** Install high-intensity LED streetlights, add reflective markers, improve road signs, and deploy speed detection cameras.
- **Moderate-Priority Areas:** Enhance road surface conditions, implement weather-sensitive traffic controls, and integrate smart signage.
- **Long-Term Planning for Low-Priority Areas:** Conduct regular safety audits, educate the public on safe driving habits, and gradually upgrade infrastructure.

## Future Work
- Conduct a before-and-after crash analysis to measure the effectiveness of interventions.
- Collaborate with local authorities, urban planners, and law enforcement to execute improvements.
- Utilize real-time AI-based predictive models for ongoing traffic safety monitoring.

## References
- Data Montgomery: [Crash Reporting – Drivers Data](https://data.montgomerycountymd.gov/Public-Safety/Crash-Reporting-Drivers-Data/mmzv-x632/about_data)
- Scikit-learn Documentation: [Clustering Methods](https://scikit-learn.org/stable/modules/clustering.html)
- Python Data Science Handbook: [Clustering Techniques](https://jakevdp.github.io/PythonDataScienceHandbook/05.11-k-means.html)

---

This README file provides an overview of the project, methodology, key findings, and next steps for improving road safety in Montgomery County through data-driven insights.

