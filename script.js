// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2306-GHP-ET-WEB-PT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

//---------------------------------------CONTAINERS---------------------------------------
const playerContainerEl = document.getElementById("player-container");
const newPlayerFormEl = document.getElementById("new-player-form");

//---------------------------------------FETCH ALL PLAYERS---------------------------------------
/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    const playersArray = result.data.players
    console.log(playersArray);
    return playersArray;
  } catch (err) {
    console.error("Error: Your dog just chased a bug, resulting in a temporary glitch. We'll have it fetched in no time!", err);
  }
}

//---------------------------------------FETCH SINGLE PLAYERS---------------------------------------
/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`)
    const result = await response.json();
    singlePlayerObj = result.data.player
    return singlePlayerObj;
  } catch (err) {
    console.error(`Error:#${playerId} just chased a bug, resulting in a temporary glitch. We'll have it fetched in no time!`, err);
  }
};


//---------------------------------------ADD NEW PLAYERS---------------------------------------
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerObj)
    });

    const player = await response.json();
    console.log("Player added: ", player);

    const players = await fetchAllPlayers();
    renderAllPlayers(players);

  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};


//---------------------------------------REMOVE PLAYER---------------------------------------
/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`,
      {
        method: "DELETE",
      },
    );
    const result = await response.json();
    console.log(result);

    const players = await fetchAllPlayers();
    renderAllPlayers(players);

  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

//---------------------------------------DETAILS BUTTON ON CARD---------------------------------------
const getDetailButton = (player) => {
  const detailButton = document.createElement('button');
  detailButton.textContent = "See Details";
  detailButton.addEventListener('click', (event) => {
    renderSinglePlayer(player);//See details" button that, when clicked, calls `renderSinglePlayer`to display more information about the player
  });
  return detailButton;
}

//---------------------------------------RENDER ALL PLAYERS---------------------------------------
/**
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

const renderAllPlayers = async (playerList) => {
  //Create error if there is no `playerList` or the `playerList`file is empty
  if (!playerList || playerList.length === 0) {
    const h2 = document.createElement('h2');
    h2.textContent = "Error: Your dog just chased a bug, resulting in a temporary glitch. We'll have it fixed soon!";
    playerContainerEl.appendChild(h2);
    return;
  }
  //Clears the HTML for a clean file
  playerContainerEl.innerHTML = ""
  //
  playerList.forEach(player => {
    //Create container for the player card
    const playerEl = document.createElement('div');//Creating div element 
    playerEl.classList.add('playerCard');//Creating class element for CSS

    //Render the Name
    const playerNameHeading = document.createElement('h2');
    playerNameHeading.textContent = `Name: ${player.name}`;

    //Render the ID
    const playerIdHeading = document.createElement('h3');
    playerIdHeading.textContent = `ID: ${player.id}`;

    //Render the Image
    const playerImage = document.createElement('img');
    playerImage.src = player.imageUrl;
    playerImage.alt = player.name;

    //TO DO:Render team name (if the player has one, or "Unassigned") (see below!=])

    //Append all the sections into the playerContainerEl
    playerEl.append(
      playerNameHeading,
      playerIdHeading,
      playerImage,
      getDetailButton(player),
      getDeleteButton(player),
    );
    //Append this player to main player container
    playerContainerEl.appendChild(playerEl)
  });
};

//---------------------------------------RENDER SINGLE PLAYER---------------------------------------
/**
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = async (player) => {
  //Create error if there is no `playerList` or the `playerList`file is empty
  playerContainerEl.innerHTML = " ";
  if (!player || player.length === 0) {
    const h2 = document.createElement('h2');
    h2.textContent = "Error: Your dog just chased a bug, resulting in a temporary glitch. We'll have it fixed soon!";
    playerContainerEl.appendChild(h2);
    return;
  }

  //Clears the HTML for a clean file
  playerContainerEl.innerHTML = ""

  //Make a new player view container
  const singlePlayerViewContainer = document.createElement('div');
  singlePlayerViewContainer.classList.add('single-player-card');//Class for CSS

  const playerInfoEl = document.createElement('div');
  playerInfoEl.classList.add('player');

  //Render the Name
  const playerNameHeading = document.createElement('h2');
  playerNameHeading.textContent = `Name: ${player.name}`;

  //Render the ID
  const playerIdHeading = document.createElement('h3');
  playerIdHeading.textContent = `ID: ${player.id}`;

  //Render the Breed
  const playerBreedHeading = document.createElement('h3');
  playerBreedHeading.textContent = `Breed: ${player.breed}`;

  //Render the Status
  const playerStatusHeading = document.createElement('h3');
  playerStatusHeading.textContent = `Status: ${player.status}`;

  //Render the Image
  const playerImage = document.createElement('img');
  playerImage.src = player.imageUrl;
  playerImage.alt = player.name;

  //Render Team Name
  const singlePlayerObj = await fetchSinglePlayer(player.id);

  const playerTeam = document.createElement('h3');

  if (singlePlayerObj.teamId === null) {
    playerTeam.textContent = "Team: Unassigned";
  }
  else {
    playerTeam.textContent = `Team: ${singlePlayerObj.team.name}`;
  }


  playerInfoEl.append(
    playerNameHeading,
    playerIdHeading,
    playerImage,
    playerBreedHeading,
    playerStatusHeading,
    playerTeam,
    getBackButton(),
    getDeleteButton(player),
  )

  //Append
  playerContainerEl.appendChild(playerInfoEl);

};

//---------------------------------------DELETE BUTTON---------------------------------------
//Delete button for all players view or single player view

const getDeleteButton = (player) => {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = "Remove";

  deleteButton.addEventListener('click', (event) => {
    removePlayer(player.id);
  })

  return deleteButton;
}

//---------------------------------------BACK BUTTON---------------------------------------
//Back button from single player view to main view
const getBackButton = () => {
  const backButton = document.createElement('button');
  backButton.textContent = "Return";
  backButton.addEventListener('click', async (event) => {
    const returnToPlayers = await fetchAllPlayers();
    renderAllPlayers(returnToPlayers);
  });
  return backButton;
}

//---------------------------------------RENDER NEW PLAYER FORM---------------------------------------

const renderNewPlayerForm = () => {
  try {
    const playerForm = document.createElement('form');

    //name label and input
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'name';
    nameLabel.textContent = 'Name: ';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name'
    nameInput.placeholder = 'Enter name...';

    // breed label and input
    const breedLabel = document.createElement('label');
    breedLabel.htmlFor = 'breed';
    breedLabel.textContent = 'Breed: ';

    const breedInput = document.createElement('input');
    breedInput.type = 'text';
    breedInput.id = 'breed'
    breedInput.name = 'breed'
    breedInput.placeholder = 'Enter breed...';

    //status label and input
    const statusLabel = document.createElement('label');
    statusLabel.htmlFor = 'status';
    statusLabel.textContent = 'Status: ';

    const statusInput = document.createElement('input');
    statusInput.type = 'text';
    statusInput.id = 'status';
    statusInput.name = 'status';
    statusInput.placeholder = 'Enter status...';

    //image label and input
    const imageLabel = document.createElement('label');
    imageLabel.htmlFor = 'image_url';
    imageLabel.textContent = "Image URL: ";

    const imageInput = document.createElement('input')
    imageInput.type = 'text';
    imageInput.id = 'image_url';
    imageInput.name = 'image_url';
    imageInput.placeholder = "Enter image URL...";

    //submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = "Submit";

    playerForm.append(
      nameLabel,
      nameInput,
      breedLabel,
      breedInput,
      statusLabel,
      statusInput,
      imageLabel,
      imageInput,
      submitButton
    );

    playerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const form = event.target;

      const playerData = {
        name: form.name.value,
        breed: form.breed.value,
        status: form.status.value,
        image_url: form.image_url.value,
      };

      await addNewPlayer(playerData);

      form.reset();
    })

    newPlayerFormEl.appendChild(playerForm);

  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

//---------------------------------------INITIALIZE FUNCTION---------------------------------------
/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  renderNewPlayerForm();
};

//---------------------------------------EXPORT FOR TESTING---------------------------------------
// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
