import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
# Load data from CSV
data = pd.read_csv('../Exploring-Music-Using-Spotify_API/Resources/no-symbols.csv')
x = data['X']
y = data['Y']
# Calculate linear regression
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
# Plotting
plt.scatter(x, y, color='blue')  # Scatter plot
y_pred = intercept + slope * x  # Line of best fit
plt.plot(x, y_pred, color='red')
plt.xlabel('X Axis Label')
plt.ylabel('Y Axis Label')
plt.title('Scatter Plot with Linear Regression Line')
plt.show()