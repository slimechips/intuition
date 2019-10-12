# :eyes: Perspective Bot
> Are we even aware of our biases anymore? It needs to be fixed.
> If you look at this chart and are convinced your “extreme” source belongs in the middle, you just might be part of the problem.

![News Bias](news_bias.jpg)


**Perspective Bot** is a **Chrome Extension** where we can search for the news we see on the internet and get more context about it. Using Machine Learning algorithms like BERT (Bidirectional Encoder Representations from Transformers) and clustering, the bot can show **different perspectives about the news** with the most hits by pulling tweets from the last one week using the Twitter API. 

![Perspective Bot](perspectivebot.png)

### Problem Statement
* Many sources people consider to be ‘news sources’ are actually dominated by analysis and opinion pieces. It is hard for people to determine news as 'news' or 'opinions'.  
* It is important to reduce the bias that the media introduces as well as our own biases. 

### Solution
Our team built a Machine Learning model centrally based on the BERT model with Twitter API to gather all the information available on Twitter about the query searched and cluster them based on different opinions to reduce bias by presenting different view-points about the same query.  
* The selection process begins by **gathering all the relevant tweets** from the last one week about the query searched using **Twitter API**.
* The tweets extracted are passed in the BERT Natural Language Processing model which converts them into useful vectors. The vectors are then clustered using K-Means on the basis of **different view-points and opinions** to gather more perspective about the news.
* The results obtained are shown on a website built using **BootStrap** where the user can gather more **context and perspective** as well as do further research and reading of the same. 

### Screenshots
Lorem Ipsum

### Installation
Lorem Ipsum

### Team
1. [Rahul Bhattacharjee](https://github.com/rahulbhatta)
2. [Jay Gupta](https://github.com/guptajay)
3. [Mario Josepha](https://github.com/mjosephan2)
4. [Jason Chow](https://github.com/slimechips)

---

> Built for iNTUition 6.0
