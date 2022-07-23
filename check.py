import pandas as pd
import numpy as np
#pd.set_option('display.max_colwidth', 500)

#Visualization packages
import matplotlib.pyplot as plt
import seaborn as sns

#NLP packages
from textblob import TextBlob

import warnings
warnings.filterwarnings("ignore")

"""#Testing NLP - Sentiment Analysis using TextBlob
TextBlob("The movie is good").sentiment"""

#Importing YouTube comments data
comm = pd.read_csv('UScomments.csv',encoding='utf8',error_bad_lines=False);#opening the file UScomments
print(comm.keys())