import numpy as np
import faiss

# Generate random vectors for demonstration
num_vectors = 1000
vector_dim = 128
np.random.seed(42)
vectors = np.random.rand(num_vectors, vector_dim).astype('float32')

# Indexing the vectors using Faiss
index = faiss.IndexFlatL2(vector_dim)
index.add(vectors)

# Querying the index
query_vector = np.random.rand(1, vector_dim).astype('float32')  # Random query vector
k = 5  # Number of nearest neighbors to retrieve

distances, indices = index.search(query_vector, k)

print("Query Vector:")
print(query_vector)
print("Nearest Neighbors:")
print(vectors[indices[0]])
print("Distances:")
print(distances[0])


# pip install faiss-cpu  # for CPU version
# or
# pip install faiss-gpu  # for GPU version
