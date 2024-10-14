# Stock Price Prediction Using RNN

This project implements a Recurrent Neural Network (RNN) to predict stock prices based on historical data. The model is trained using Tesla's stock price data to forecast future prices.

## Overview

The objective of this project is to demonstrate how to use RNNs for time series forecasting. The model utilizes historical closing prices to predict future stock prices for the next 20 days.

## Requirements

Make sure you have the following libraries installed:

- `numpy`
- `pandas`
- `matplotlib`
- `sklearn`
- `keras`

You can install the required packages using pip:

```bash
pip install numpy pandas matplotlib scikit-learn keras
```

## Dataset

The model requires a CSV file containing stock price data. The dataset should have the following columns:

- `Date`: The date of the stock price.
- `Close`: The closing price of the stock on that date.

You can replace the dataset path in the code with your own CSV file containing similar columns:

```python
df = pd.read_csv('/content/tesla.csv')
```

## How It Works

1. **Load the Dataset**: The stock price data is loaded from a CSV file.
2. **Data Preprocessing**: The closing prices are normalized using Min-Max scaling to ensure values are between 0 and 1.
3. **Sequence Creation**: Sequences of historical prices are created for training the RNN.
4. **Train-Test Split**: The dataset is split into training and testing sets, with 80% for training.
5. **Build the RNN Model**: An RNN model is built using Keras, with a simple architecture consisting of one RNN layer and one dense output layer.
6. **Training**: The model is trained on the training set for a specified number of epochs.
7. **Prediction**: The model predicts stock prices for the next 20 days based on the last 60 days of data from the training set.
8. **Inverse Transformation**: The predicted prices are transformed back to the original scale.
9. **Results Comparison**: The predicted prices are compared with the actual prices for the next 20 days.
10. **Visualization**: The actual and predicted prices are plotted for comparison.

## How to Run

1. Clone the repository or download the code file.
2. Ensure you have the required dataset and update the file path in the code.
3. Run the script to train the model and visualize the predictions.

```bash
python stock_price_prediction.py
```

## Results

The results will include a plot comparing the actual and predicted stock prices for the next 20 days, as well as a printed list of actual and predicted prices for each of those days.

## Conclusion

This project demonstrates the application of RNNs in stock price prediction. While the model can provide insights into future prices, stock price movements are influenced by various factors, and predictions should be made with caution.
