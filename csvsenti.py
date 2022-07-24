#Data processing packages
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

"""#Displaying the first 5 rows of the data
print(comm.head(10))
print(comm.keys())
print(comm.comment_text.head(10))
#Finding the size of the data
print(comm.shape)"""

#Extracting 1000 random samples from the data
comm = comm.sample(2000)

#Calculating the Sentiment Polarity
pol=[] # list which will contain the polarity of the comments
for i in comm.comment_text.values:
    try:
        analysis = TextBlob(i)
        pol.append(analysis.sentiment.polarity)
        
    except:
        pol.append(0)

#Adding the Sentiment Polarity column to the data
comm['pol']=pol
comm.to_csv("UScommentsup.csv",index=False)
#Converting the polarity values from continuous to categorical
"""comm['pol'][comm.pol==0]= 0
comm['pol'][comm.pol > 0]= 1
comm['pol'][comm.pol < 0]= -1"""

#Displaying the POSITIVE comments
df_positive = comm[comm.pol>0]
print(df_positive.head(10),'\n')

#Displaying the NEGATIVE comments
df_positive = comm[comm.pol<0]
print(df_positive.head(10),'\n')

#Displaying the NEUTRAL comments
df_positive = comm[comm.pol==0]
print(df_positive.head(10),'\n')

print(comm.keys())
comm.pol.value_counts().plot.bar()
plt.show()
print(comm.pol.value_counts())
