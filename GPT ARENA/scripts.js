// Game Categories Data
const categories = {
  arcade: {
    name: "PLAY GAMES",
    background: "images/play.jpg",
    display: "block",
    games: [
      {
        name: "SUPER MARIO",
        path: "Games/Play/Supermario/super-mario-bros",
        background: "images/play2.jpg",
        Image: "Games/Play/Supermario/bg.png",
      },
      {
        name: "ANGRY BIRDS",
        path: "Games/Play/angry-birds",
        background: "images/play2.jpg",
        Image: "Games/Play/angry-birds/bg.webp",
      },
      {
        name: "CUP CAKE",
        path: "Games/Play/cupcake2048",
        background: "images/play2.jpg",
        Image: "Games/Play/cupcake2048/bg.avif",
      },
      {
        name: "NINJA VS EVIL CORP",
        path: "Games/Play/ninjavsevilcorp",
        background: "images/play2.jpg",
        Image: "Games/Play/ninjavsevilcorp/bg.webp",
      },
      {
        name: "STACK UP",
        path: "Games/Play/stack",
        background: "images/play2.jpg",
        Image: "Games/Play/stack/bg.jpg",
      },
      {
        name: "TOWER MASTER",
        path: "Games/Play/towermaster",
        background: "images/play2.jpg",
        Image: "Games/Play/towermaster/bg.jpg",
      },
      {
        name: "TETRIS",
        path: "Games/Play/tetris",
        background: "images/play2.jpg",
        Image: "Games/Play/tetris/bg.png",
      },
      {
        name: "RADIUS RAID",
        path: "Games/Play/radiusraid",
        background: "images/play2.jpg",
        Image: "Games/Play/radiusraid/bg.webp",
      },
      {
        name: "RACER",
        path: "Games/Play/racer",
        background: "images/play2.jpg",
        Image: "Games/Play/racer/bg.webp",
      },
    ],
  },
  action: {
    name: "SURVIVAL GAMES",
    background: "images/background2.jpg",
    display: "none",
    games: [
      {
        name: "TEMPLE RUN",
        path: "Games/Survival/TempleRun",
        background: "Games/Survival/TempleRun/bg.webp",
        Image: "Games/Survival/TempleRun/bg.webp",
      },
      { name: "Ninja Runner", path: "games/action/ninja-runner" },
      { name: "Robot Battle", path: "games/action/robot-battle" },
    ],
  },
  puzzle: {
    display: "none",
    name: "BETTING GAMES",
    background: "images/betting.jpg",
    games: [
      { name: "Color Match", path: "games/puzzle/color-match" },
      { name: "Block Slide", path: "games/puzzle/block-slide" },
      { name: "Pattern Quest", path: "games/puzzle/pattern-quest" },
    ],
  },
  sports: {
    display: "none",
    name: "WINNING GAMES",
    background: "images/winning.avif",
    games: [
      { name: "Soccer Star", path: "games/sports/soccer-star" },
      { name: "Basketball Pro", path: "games/sports/basketball-pro" },
      { name: "Tennis Ace", path: "games/sports/tennis-ace" },
    ],
  },
};

// Initialize the website
function initializeWebsite() {
  const categoriesGrid = document.getElementById("categories");

  // Create category cards
  Object.entries(categories).forEach(([key, category]) => {
    const categoryCard = document.createElement("div");
    categoryCard.className = "category-card";
    categoryCard.style.backgroundImage = `url(${category.background})`;

    categoryCard.style.maxWidth = `320px`;
    categoryCard.style.display = category.display;

    categoryCard.innerHTML = `
            <h2 class="category-name">${category.name}</h2>
        `;

    categoryCard.addEventListener("click", () => showGames(key));
    categoriesGrid.appendChild(categoryCard);
  });
}

// Show games for selected category
function showGames(categoryKey) {
  const categoriesSection = document.getElementById("categories").parentElement;
  const gamesSection = document.getElementById("games-section");
  const gamesGrid = document.getElementById("games-grid");

  // Hide categories, show games
  categoriesSection.classList.add("hidden");
  gamesSection.classList.remove("hidden");

  // Clear and populate games grid
  gamesGrid.innerHTML = "";
  categories[categoryKey].games.forEach((game) => {
    // Target the container where the image will be added
    //const container = document.getElementById('image-container');

    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.style.backgroundImage = `url(${game.background})`;
    gameCard.innerHTML = `<h3>${game.name}</h3>`;
    // Create a new image element
    const img = document.createElement("img");

    // Set the image source and attributes
    img.src = game.Image; // Replace with your image URL
    img.alt = "Placeholder Image";
    img.style.objectFit = "contain"; // Ensures the image fits inside the container while maintaining aspect ratio
    img.style.width = "100%"; // Makes the image scale to the container's width
    img.style.height = "100%";
    // img.width ; // Optional: Set width
    // img.height ; // Optional: Set height

    // Append the image to the container
    gameCard.appendChild(img);

    gameCard.addEventListener("click", () => loadGame(game.path));
    gamesGrid.appendChild(gameCard);
  });
}

// Return to categories view
function showCategories() {
  const categoriesSection = document.getElementById("categories").parentElement;
  const gamesSection = document.getElementById("games-section");

  categoriesSection.classList.remove("hidden");
  gamesSection.classList.add("hidden");
}

// Load and display game in iframe
function loadGame(gamePath) {
  const gameOverlay = document.getElementById("game-overlay");
  const gameFrame = document.getElementById("game-frame");

  gameFrame.src = `${gamePath}/index.html`;
  gameOverlay.classList.remove("hidden");
}

// Close game overlay
function closeGame() {
  const gameOverlay = document.getElementById("game-overlay");
  const gameFrame = document.getElementById("game-frame");

  gameOverlay.classList.add("hidden");
  gameFrame.src = "";
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeWebsite);
