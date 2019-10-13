# Perspective Bot
> Are we even aware of our biases anymore? It needs to be changed.
> If you look at this chart and are convinced your “extreme” source belongs in the middle, you just might be part of the problem.

![News Bias](http://52.246.249.29:3030/public/news_bias.jpg)

**Perspective Bot** is a **Chrome Extension** where we can search for the news we see on the internet and get more context about it. Using Machine Learning algorithms like BERT (Bidirectional Encoder Representations from Transformers) and clustering, the bot can show **different perspectives about the news** with the most hits by pulling tweets from the last one week using the Twitter API. 

![Perspective Bot](http://52.246.249.29:3030/public/perspectivebot.png)

### Problem Statement
* Many sources people consider to be ‘news sources’or 'forums' are actually dominated by analysis and opinion pieces. It is hard for people to determine news as 'news' or 'opinions'.  
* People base judgements on limited information, unaware of other view-points, which results in a lack of perspective about global issues. 
* It is important to reduce the bias that the media introduces as well as our own biases. 

### Solution
Our team built a pipeline based on the state-of-the-art BERT model with Twitter API to gather all the information available on Twitter about the query searched and automatically cluster them based on different opinions grouped by Country using the Google Maps API to reduce bias by presenting different view-points about the same query.  
* The selection process begins by **gathering all the relevant tweets** from the last one week about the query searched using **Twitter API**.
* The tweets extracted are passed in the BERT Natural Language Processing model which converts them into detailed high dimensional vectors. The vectors are then automatically clustered using K-Means++ on the basis of **different view-points and opinions** to gather more perspective about the news. The best representative tweet from each cluster is selected.
* The results obtained are **grouped by country** (obtained from **Google Maps API**), and shown on a website built using **BootStrap** where the user can gather more **context and perspective** as well as do further research and reading of the same. 

### Screenshots
![Click](http://52.246.249.29:3030/public/screen3.jpg)
![Webpage](http://52.246.249.29:3030/public/screen4.png)

### Installation
1. Download Google Chrome Extention from [here](https://github.com/slimechips/intuition/tree/master/chrome_ext).
2. In the Chrome Address Bar, type `chrome://extensions/` and Toggle `Developer Mode` to ON (top-right pane)
3. Using the `Load unpacked` button, select the folder downloaded in Step 1 to load the app in Chrome and enable the extension.

### Team
1. [Rahul Bhattacharjee](https://github.com/rahulbhatta)
2. [Jay Gupta](https://github.com/guptajay)
3. [Mario Josepha](https://github.com/mjosephan2)
4. [Jason Chow](https://github.com/slimechips)

---

> Built for iNTUition 6.0
