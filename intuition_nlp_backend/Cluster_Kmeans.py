#script to create k means classifier for the word vectors
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import pickle
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import normalize

#The csv file with results from the Full_Preprocessing
df=pd.read_csv(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\Data\OSR_full_pipeline\final_meaningful_text2.csv",encoding="ANSI")

#File with the word vectors made, which is a result of make_vectors.py
data=pd.read_csv(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\vector_all_stopremoved.tsv",sep = '\t')

#Only take out the word vector columns
#Set N to be the last column in your word vector dataframe
N=str(767)
data=data.loc[:, '0':N]

#convert to numpy array
data1=np.array(data)

centroids=[]
Sum_of_squared_distances=[]

#Set the range of K you want to iterate over
n1=5
n2=200
K = list(range(n1,n2))

#K Means algorithm

#run k means from 5 to 200
for k in K:
    print(k)
    data2=pd.DataFrame()
    #pickle_in = open(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\models\kmeans_models_non_normalized\kmeans_stopremoved_"+str(k)+"_model.sav", "rb")
    #km = pickle.load(pickle_in)
    #Declare classifier with a fixed random_state for reproducible results on the same dataset
    km = KMeans(init='k-means++',n_clusters=k,random_state=42)
    km = km.fit(data1)
    print("data fitted")
    #Save the model in a file
    filehandler = open(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\models\kmeans_models_non_normalized\kmeans_stopremoved_"+str(k)+"_model.sav", 'wb') 
    pickle.dump(km, filehandler)
    Sum_of_squared_distances.append(km.inertia_)
    centroids.append(km.cluster_centers_)
    #Keep the predicted cluster column
    data2["predicted_cluster"] = km.predict(data1)
    print("predicted")
    data2["final_text"]=df["final_text"]
    data2["n_sentences"]=df["n_sentences"]
    data2["word_length"]=df["word_length"]
    #Save the text and prediction results, with the other columns
    data2.to_csv(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\predictions_data\kmeans_non_normalized\k_stopremoved_prediction_"+str(k)+".csv")

#Plot out the elbow graph for Sum of squared distances vs the k value
import matplotlib.pyplot as plt
plt.plot(K, Sum_of_squared_distances, 'bx-')

#Sum_of_squared_distances is the input needed for find_elbow(the y list)

plt.xlabel('k')
plt.ylabel('Sum_of_squared_distances')
plt.title('Elbow Method For Optimal k')
#Save the plot
plt.savefig(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\k_means_stopremoved_vectors_5_to_75.png")
plt.show()
print("Graph plotted")

"""
#Save the centroid of each cluster. Havent had to use this, but may be useful in further cluster analysis
for centroid in centroids:
    df_center=pd.DataFrame.from_records(centroid)
    df_center.to_csv(r"C:\Users\Rahul_Bhattacharjee\Documents\Data_team_work\Classifier\OSR_BERT\vector_files\cluster_centroids\kmeans_cluster_centroids_normalized\kcluster_centers_stopremoved"+str(centroids.index(centroid)+5)+".csv")
    print("cluster centers saved",centroids.index(centroid))
"""



