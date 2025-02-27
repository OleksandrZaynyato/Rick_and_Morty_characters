# Rick and Morty Character Info Site

## 📖 Description
Welcome to the Rick and Morty Character Info Site! This is a simple web application built using **JavaScript** that fetches data about characters from the popular animated show _Rick and Morty_ using the [Rick and Morty API](https://rickandmortyapi.com/).

## 🚀 Features

- **Character Information:** View detailed info about your favorite characters, including name, species, gender, status, and origin.
- **Episode Information:** View all episodes.
- **Location Information:** View all locations and episodes when they were mentioned at first.
- **Search Functionality:** Search for characters by name to find detailed information.
- **Watchlist:** Make your watchlist.
- **API Integration:** Fetches character data dynamically from the [Rick and Morty API](https://rickandmortyapi.com/).

## 🛠 Tech Stack

- **JavaScript (Vanilla):** For scripting and API calls.
- **Rick and Morty API:** The public API that provides character data.
- **HTML/CSS:** For structuring and styling the web pages.

## 📌 Installation

1. Clone this repository to your local machine:

    ```bash
    git clone [https://github.com/yourusername/rick-and-morty-character-info.git](https://github.com/OleksandrZaynyato/Rick_and_Morty_characters.git)
    ```

2. Open the project directory:

    ```bash
    cd rick-and-morty-character-info
    ```

3. Run index.html
4. Set photo_5226868993736956619_y.jpg as your profile picture

## 🎯 Usage
After launching, open in your browser:
  ```
  http://localhost:3000
  ```

- Upon loading the site, you'll see a list of popular Rick and Morty characters.
- You can search for any character by typing their name in the search bar.
- Each character's card includes information such as species, gender, status, and origin.
- Click on a character's card to view more detailed information.
- Add episodes to watchlist

## Example API Request

The app uses the following endpoint from the Rick and Morty API:

```javascript
const url = 'https://rickandmortyapi.com/api/character/?page=';
const url = 'https://rickandmortyapi.com/api/episode/?page=';
const url = 'https://rickandmortyapi.com/api/location/?page=';
