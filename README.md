# YouTube Bookmarker

## Project Overview

YouTube Bookmarker is a React-based web application that allows users to search YouTube videos, bookmark their favorite videos, organize videos into collections, and watch videos directly on YouTube.

## Features

### Authentication

* Google Sign-In using Firebase Authentication
* Secure Login and Logout

### Video Search

* Search videos using YouTube Data API v3
* Display video thumbnail
* Display video title
* Display channel name
* Display published date

### Bookmark Management

* Add videos to bookmarks
* Remove bookmarked videos
* Prevent duplicate bookmarks
* Clear all bookmarks
* Persist bookmarks using Local Storage

### Collections

* Create collections
* Delete collections
* Add bookmarked videos to collections
* Prevent duplicate videos inside collections
* View videos inside collections
* Persist collections using Local Storage

### Additional Features

* Search videos using Enter key
* Clear search box
* Watch videos directly on YouTube
* Responsive user interface

## Technologies Used

* React.js
* Vite
* Axios
* Firebase Authentication
* YouTube Data API v3
* Local Storage
* CSS

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to project folder

```bash
cd youtube-bookmarker
```

3. Install dependencies

```bash
npm install
```

4. Start development server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Assumptions

* User data is stored in browser Local Storage.
* Collections are maintained locally.
* Internet connection is required for YouTube API requests.

## Limitations

* Data is device-specific.
* Collections are not shared across devices.
* Public collection sharing is not implemented using a backend database.

## Future Improvements

* Firestore Database Integration
* Public Collection Sharing
* Search Inside Collections
* Improved UI/UX
* User Profile Management

## Author

Shessymol Jaymon

B.Tech Computer Science Engineering

APJ Abdul Kalam Technological University (KTU)
