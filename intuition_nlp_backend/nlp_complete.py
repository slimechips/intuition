from TwitterSearch import *

import pandas as pd
import numpy as np
from bert_embedding import BertEmbedding
from sklearn.metrics.pairwise import cosine_similarity
import sys

from sklearn.cluster import KMeans
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import normalize

from scipy.optimize import curve_fit 
from matplotlib import pyplot as plt
import numpy.matlib

twit_text=[]
twit_loc=[]
twit_id=[]

#Splits your query into keywords
query = sys.argv[1]
keywords = query.split(" ")

try:
    tso = TwitterSearchOrder() # create a TwitterSearchOrder object
    tso.set_keywords(keywords) # let's define all words we would like to have a look for
    tso.set_language('en') # we want to see German tweets only
    tso.set_include_entities(False) # and don't give us all those entity information

    # it's about time to create a TwitterSearch object with our secret tokens
    ts = TwitterSearch(
        consumer_key = 'BpUamvs18gYi60bP5F7MBibGS',
        consumer_secret = 'DascJMIMY6gZ2ImnJia9gGow1tgqrOhDqEsealLUorJjrBKEHb',
        access_token = '1182649652581036032-a1C9iYIh6KyRVdBPTmB0qea85XrHjd',
        access_token_secret = 'UN8K14r5SEHiaWzDq5osZja9W4mIP2sNRGNSJWBMGX7xY')

     # this is where the fun actually starts :)
    for tweet in ts.search_tweets_iterable(tso):
        #print( '@%s tweeted: %s' % ( tweet['user']['screen_name'], tweet['text'] ) )
        
        twit_text.append(tweet['text'])
        loc=tweet['user']['location']
        #loc_country=(loc.split(','))[1][1:]
        twit_loc.append(loc)
        twit_id.append(tweet['id'])

except TwitterSearchException as e: # take care of all those ugly errors if there are some
    print(e)



twit_text=twit_text[:50]
twit_loc=twit_loc[:50]
twit_id=twit_id[:50]

if(len(twit_loc)<50):
    maxlim=len(twit_loc)
else:
    maxlim=50

print(len(twit_text))



df=pd.DataFrame()
df["text"]=twit_text
df["location"]=twit_loc
df["id"]=twit_id

class bert_instance():
    bert_embedding = BertEmbedding()
              
    def return_top(self,processed_texts,enquiry):
        all_vectors=[]
        enquiry_vector=[]
        enquiry_vector.append(self.return_vectors(enquiry))
        enquiry_vector=np.array(enquiry_vector)
        for text in processed_texts:
            all_vectors.append(self.return_vectors(text))
        all_vectors=np.array(all_vectors)
        print(all_vectors)
        print(all_vectors.shape)
        matrix=cosine_similarity(all_vectors,enquiry_vector)
        return(matrix)
        
    def return_vector(self,text):
        vectorfile=self.bert_embedding([text]) 
        print(len(vectorfile))
        #for i in range(len(vectorfile)):
        vectorlist=vectorfile[0][1]
        #print(vectorlist)
        sum_vector=np.empty(shape=vectorlist[0].shape)
        sum_amt=0
        for vector in vectorlist:
            sum_amt+=(vector[0])
            sum_vector+=vector
        sum_vector/=len(vectorlist)
        sum_vector=np.nan_to_num(sum_vector)
        return(sum_vector)
    
    def return_vectors(self,texts):
        vectorfile=self.bert_embedding(texts) 
        print((vectorfile))
        #for i in range(len(vectorfile)):
        #vectorlist=vectorfile[0][1]
        return(vectorfile)
        
        
b=bert_instance()     
"""
test_texts=["haha what a good day","this was a horrible experience, never coming again","airplanes airlines and all things air"]
vectors_test=(b.return_vectors(test_texts))
print(len(vectors_test))
"""

vectorfile=b.return_vectors(twit_text)
#print((vectorfile[0][1][0]))

print(len(vectorfile[0]))
vectors=[np.sum(vectorfile[i][1], axis=0)/len(vectorfile[i][0]) for i in range(maxlim)]

#print(vectors[0])

df["vectors"]=vectors

#print(len(vectors))

Sum_of_squared_distances=[]

#Set the range of K you want to iterate over
n1=3
n2=20
K = list(range(n1,n2))


import heapq
k_dataframes={}
for k in K:
    print(k)
    data2=pd.DataFrame()
    data1=vectors
    #pickle_in = open(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\models\kmeans_models_non_normalized\kmeans_stopremoved_"+str(k)+"_model.sav", "rb")
    #km = pickle.load(pickle_in)
    #Declare classifier with a fixed random_state for reproducible results on the same dataset
    km = KMeans(init='k-means++',n_clusters=k,random_state=42)
    km = km.fit(data1)
    print("data fitted")
    #Save the model in a file
    Sum_of_squared_distances.append(km.inertia_)
    #Keep the predicted cluster column
    data2["predicted_cluster"] = km.predict(data1)
    #Save the text and prediction results, with the other columns
    k_dataframes[k]=data2
    #data2.to_csv(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\predictions_data\kmeans_non_normalized\k_stopremoved_prediction_"+str(k)+".csv")

#set y to sum of squared distances
    
#y=np.array([2100.623624655299, 1857.2592194987199, 1681.075267828128, 1523.7001054382924, 1405.1119094554388, 1305.7837646584303, 1220.071583357704, 1145.715439205652, 1086.0949152804553, 1026.8731730325428, 981.6652586836576, 937.0084082255889, 901.1357191724567, 865.9194579197589, 833.0293650135773, 804.2991454877847, 776.4368891780016, 751.1484537482778, 726.0835911822736, 703.6948204022663, 683.1015042558823, 663.5211800884217, 645.5895606656763, 629.1588305495045, 611.4133688957772, 598.1855315083351, 585.9529804928725, 572.8571394147199, 558.1568668038037, 548.5219067209142, 535.5092106926658, 524.9075368101027, 515.2180303188433, 505.1909617122323, 495.53781604263486, 487.66778013026965, 478.81370524259074, 470.7978976426045, 463.29737476311715, 454.6963038986051, 448.9235403190749, 440.65073290258005, 433.34403976969145, 426.5974746896789, 420.833945730095, 414.6314662492843, 409.0382665641183, 402.4759439292774, 397.95295952763064, 392.7173955367127, 386.8328310519695, 381.64714753513755, 377.91757768087774, 372.7740766457247, 367.5419347416316, 362.88136010000574, 359.28411715096206, 354.2163296114541, 350.7999848474966, 347.3188956316405, 343.1122673873914, 338.4504563679499, 334.73407260105006, 331.59839987979433, 327.6020597273829, 323.73936296503433, 320.1393733435595, 317.16553523872676, 314.0077846892909, 310.6436891700004, 307.23413482716364, 304.6399397881545, 301.5171259706773, 298.5204128208743, 296.3679111761611, 292.9129101327989, 289.83360166420147, 288.00049966134213, 285.8275236345384, 282.8060871132475, 279.9117595475845, 278.148983766226, 275.6314045388512, 273.86116523032655, 271.04149815709707, 268.93383483609233, 265.77245500027243, 264.2902543768614, 261.5684327678432, 260.27799682798553, 257.94457398358117, 256.286441386735, 253.83972256679556, 251.61319123146953, 249.8968678041895, 248.92148362610027, 247.2324052961459, 245.2232435117058, 243.23236805307064, 241.73451508167355, 240.3267295616746, 238.6938667306622, 237.09273558634456, 234.87897889821556, 233.11380005240616, 231.14194403916775, 229.93658050988302, 228.67628409993466, 226.6272582994602, 226.18046015220864, 224.2054960530747, 222.81725412540462, 221.17430634946382, 219.79671511277002, 218.67988586782946, 217.3629637198929, 215.76133617196328, 214.6902172631066, 213.17687360757913, 211.64066687365505, 210.97491817271182, 209.3913332122382, 208.37447612652136, 207.34986150091063, 205.23488868745105, 204.33150026849904, 203.730246675026, 201.83909597871005, 201.0159863057369, 200.18350908900015, 198.7787383713179, 197.85140697955234, 196.81465848488918, 196.33929407940755, 194.53549621161324, 193.61651246204494, 192.42503441874098, 191.56231130334012, 190.859929864696, 189.13153562283367, 188.84631774247063, 187.72344407140483, 186.3628745515761, 186.15115902472826, 185.22160315307494, 183.63121857252946, 183.52839834158152, 182.10273965825533, 181.0926763514996, 179.92952743883745, 179.2894212059453, 178.66913306068633, 177.39504692196462, 177.14503166117103, 176.40321869198905, 175.08109410006068, 174.10118130093147, 173.2602133385659, 172.74494588394626, 171.63532307095204, 171.35298950562088, 170.54009528225106, 169.43402840168648, 168.84587298192972, 167.66444038316135, 167.15036796146052, 167.00543523357493, 165.54793625495995, 164.7396647558209, 164.16596563590315, 163.7772632537395, 163.12486429488948, 162.2254485629508, 161.7390109933849, 161.07279648177362, 160.02350707760348, 159.4765298971288, 158.99455848054887, 158.3667572519789, 157.200177552758, 156.6584671906476, 156.07972905510172, 155.23661944494822, 155.06589361976737, 154.6902259933607, 153.96424030485838, 153.26250914498198, 152.70057258026327, 152.10164394093215, 151.61329649904232, 151.09632930398016, 150.18660896513558, 149.64160681337245, 148.96910700370125, 148.13350863567646])
y=np.array(Sum_of_squared_distances)
values=y
#Set n depending on the first value of k
n=n1
x=np.array(list(range(n,len(y)+n)))

#get coordinates of all the points
nPoints = len(x)
allCoord = np.vstack((range(nPoints), values)).T
#np.array([range(nPoints), values])

# get the first point
firstPoint = allCoord[0]
# get vector between first and last point - this is the line
lineVec = allCoord[-1] - allCoord[0]
lineVecNorm = lineVec / np.sqrt(np.sum(lineVec**2))

# find the distance from each point to the line:
# vector between all points and first point
vecFromFirst = allCoord - firstPoint

# To calculate the distance to the line, we split vecFromFirst into two 
# components, one that is parallel to the line and one that is perpendicular 
# Then, we take the norm of the part that is perpendicular to the line and 
# get the distance.
# We find the vector parallel to the line by projecting vecFromFirst onto 
# the line. The perpendicular vector is vecFromFirst - vecFromFirstParallel
# We project vecFromFirst by taking the scalar product of the vector with 
# the unit vector that points in the direction of the line (this gives us 
# the length of the projection of vecFromFirst onto the line). If we 
# multiply the scalar product by the unit vector, we have vecFromFirstParallel
scalarProduct = np.sum(vecFromFirst * np.matlib.repmat(lineVecNorm, nPoints, 1), axis=1)
vecFromFirstParallel = np.outer(scalarProduct, lineVecNorm)
vecToLine = vecFromFirst - vecFromFirstParallel

# distance to line is the norm of vecToLine
distToLine = np.sqrt(np.sum(vecToLine ** 2, axis=1))

# knee/elbow is the point with max distance value
idxOfBestPoint = np.argmax(distToLine)

print("Knee of the curve is at index =",idxOfBestPoint)
print("Knee value =", values[idxOfBestPoint])

optimal_k=idxOfBestPoint+n1

best_dataframe=k_dataframes[optimal_k]
best_dataframe["vectors"]=df["vectors"]
best_dataframe["id"]=twit_id
best_dataframe["location"]=twit_loc
best_dataframe["text"]=twit_text

unique_clusters=range(n1,optimal_k+1)

print(unique_clusters)
cluster_length=[]
for cluster in unique_clusters:
    cluster_df=best_dataframe[best_dataframe["predicted_cluster"]==cluster]
    cluster_length.append(len(cluster_df))

len_cluster_tuples=list(heapq.nlargest(10, zip(cluster_length, unique_clusters)))
len_cluster_tuples=list(zip(*len_cluster_tuples)) 
top_clusters=list(len_cluster_tuples[1])

final_texts=[]

print(best_dataframe["predicted_cluster"])

for top_cluster in top_clusters:
    cluster_df=best_dataframe[best_dataframe["predicted_cluster"]==top_cluster]
    if(cluster_df.empty==True):
        continue
    cluster_df=cluster_df.reset_index()
    sim_matrix=cosine_similarity(list(cluster_df["vectors"]))
    sums=[]
    for i in sim_matrix:
        sums.append(sum(i))
    index=np.argmax(sums)
    
    final_texts.append(cluster_df["text"][index])

print((final_texts))

diction={"USA":final_texts,"Singapore":[]}


#twit is the list of the output from the api

#0. For each country
#1. BERT - make a dataframe
#2. Automated K means - clustering
#3. Top 3 cluster representatives
#4. Return


