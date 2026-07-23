document.addEventListener("DOMContentLoaded", () => {
  console.log("Nap Game Loaded");
});
const games = [
  {
    name: "MYE COIN",
    image: "../assets/images/Nap_Game/DS-game_nap/MYECOIN.png",
  },

  {
    name: "HẠO KHÍ CHIẾN HỒN",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "HẠO KHÍ DU HIỆP",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png",
  },

  {
    name: "BOOM TANK",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png",
  },

  {
    name: "CHÂN VƯƠNG",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png",
  },

  {
    name: "BOOM TANK",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "HẠO KHÍ CHIẾN HỒN",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "HẠO KHÍ DU HIỆP",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "BOOM TANK",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "CHÂN VƯƠNG",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "BOOM TANK",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "HẠO KHÍ CHIẾN HỒN",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "HẠO KHÍ DU HIỆP",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "BOOM TANK",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },

  {
    name: "CHÂN VƯƠNG",
    image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
  },
];

const gameList = document.getElementById("gameList");

function renderGame(list) {
  gameList.innerHTML = "";

  list.forEach((game) => {
    gameList.innerHTML += `

<div class="col">

<div class="game-card ${game.name === "MYE COIN" ? "mye-card" : ""}">

<div class="game-thumb">

<img src="${game.image}" alt="${game.name}">

</div>

<div class="game-name">

${game.name}

</div>

</div>

</div>

`;
  });
}

renderGame(games);

const search = document.getElementById("searchGame");

search.addEventListener("keyup", () => {
  const keyword = search.value.toLowerCase();

  const result = games.filter((game) =>
    game.name.toLowerCase().includes(keyword),
  );

  renderGame(result);
});
