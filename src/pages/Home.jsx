import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Home.css";

// 1. MOVE CONSTANTS OUTSIDE THE COMPONENT
// This stops React's linter from getting confused and asking for them in dependency arrays.
const API_URL = "http://127.0.0.1:8000/api";
const API_KEY = "AIzaSyAjcz_-ApKM7UoRE2-6SRaxkPXYMcK9S6I";

function Home() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  const [collections, setCollections] = useState(() => {
    return JSON.parse(localStorage.getItem("collections")) || [];
  });

  // 2. ONLY ONE fetchBookmarks function, safely wrapped in useCallback.
  // Because API_URL is outside, this dependency array [] stays completely empty!
  const fetchBookmarks = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/`);
      setBookmarks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []); 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookmarks();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchBookmarks]);

  const searchVideos = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: search,
            maxResults: 10,
            type: "video",
            key: API_KEY, // Uses the constant from outside
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addBookmark = async (video) => {
    const alreadyExists = bookmarks.find(
      (item) => item.video_id === video.id.videoId
    );

    if (alreadyExists) {
      alert("Already Bookmarked");
      return;
    }

    try {
      await axios.post(`${API_URL}/bookmarks/`, {
        title: video.snippet.title,
        video_id: video.id.videoId,
        thumbnail: video.snippet.thumbnails.medium.url,
        user_email: "test@gmail.com",
      });

      fetchBookmarks();
      alert("Bookmark Saved");
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookmark = async (id) => {
    try {
      await axios.delete(`${API_URL}/bookmarks/${id}/`);
      fetchBookmarks(); 
      alert("Bookmark Removed");
    } catch (error) {
      console.log(error);
      alert("Error removing bookmark");
    }
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("bookmarks");
  };

  const createCollection = () => {
    if (collectionName.trim() === "") {
      alert("Enter collection name");
      return;
    }

    const newCollection = {
      id: Date.now(),
      name: collectionName,
      videos: [],
    };

    const updatedCollections = [...collections, newCollection];

    setCollections(updatedCollections);
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
    setCollectionName("");
  };

  const deleteCollection = (id) => {
    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );

    setCollections(updatedCollections);
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
  };

  const addToCollection = (collectionId, video) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        const alreadyExists = collection.videos.find(
          (v) => v.id.videoId === video.id.videoId
        );

        if (alreadyExists) {
          alert("Video already exists in collection");
          return collection;
        }

        return {
          ...collection,
          videos: [...collection.videos, video],
        };
      }
      return collection;
    });

    setCollections(updatedCollections);
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>YouTube Bookmarker</h1>

      <input
        type="text"
        placeholder="Search Videos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchVideos();
          }
        }}
      />

      <button onClick={searchVideos}>Search</button>
      <button onClick={() => setSearch("")}>Clear</button>

      <hr />

      <h2>Search Results</h2>

      {videos.map((video) => (
        <div
          key={video.id.videoId}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <h3>{video.snippet.title}</h3>
          <p>
            <b>Channel:</b> {video.snippet.channelTitle}
          </p>
          <p>
            <b>Published:</b> {video.snippet.publishTime}
          </p>

          <button onClick={() => addBookmark(video)}>Bookmark</button>

          <a
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Watch Video</button>
          </a>
        </div>
      ))}

      <hr />

      <h2>Create Collection</h2>

      <input
        type="text"
        placeholder="Collection Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />

      <button onClick={createCollection}>Create Collection</button>

      <h2>My Collections</h2>

      <p>Total Collections: {collections.length}</p>

      {collections.length === 0 ? (
        <p>No collections yet.</p>
      ) : (
        collections.map((collection) => (
          <div
            key={collection.id}
            style={{
              border: "1px solid blue",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{collection.name}</h3>
            <p>Videos: {collection.videos.length}</p>

            {collection.videos.map((video) => (
              <div
                key={video.id.videoId}
                style={{
                  border: "1px solid gray",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                <p>{video.snippet.title}</p>
              </div>
            ))}

            <button onClick={() => deleteCollection(collection.id)}>
              Delete Collection
            </button>
          </div>
        ))
      )}

      <hr />

      <button onClick={clearBookmarks}>Clear All Bookmarks</button>

      <h2>My Bookmarks</h2>

      <p>Total Bookmarks: {bookmarks.length}</p>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map((video) => (
          <div
            key={video.id}
            style={{
              border: "1px solid green",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img src={video.thumbnail} width="200" alt="" />
            <h3>{video.title}</h3>
            <p>{video.user_email}</p>

            <button onClick={() => removeBookmark(video.id)}>Remove</button>

            {collections.length > 0 && (
              <div style={{ marginTop: "15px", paddingTop: "10px", borderTop: "1px dashed #ccc" }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}><b>Add to collection:</b></p>
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                    onClick={() => {
                      const formattedVideoForCollection = {
                        id: { videoId: video.video_id },
                        snippet: { title: video.title }
                      };
                      addToCollection(collection.id, formattedVideoForCollection);
                      alert(`Added to ${collection.name}`);
                    }}
                  >
                    + {collection.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;