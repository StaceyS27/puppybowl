const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let player;
  beforeAll(async () => {
    player = await fetchSinglePlayer();
  });

  test("it is a function", () => {
    expect(typeof fetchSinglePlayer).toBe("function");
  })

  test("that returns an object", () => {
    expect(typeof fetchSinglePlayer()).toBe("object");
  });

});

// TODO: Tests for `addNewPlayer`

describe("addNewPlayer", () => {
  let newPlayer;
  beforeAll(async () => {
    newPlayer = await addNewPlayer();
  });

  test("it is a function", () => {
    expect(typeof addNewPlayer).toBe("function");
  })

  test("that returns an object", () => {
    expect(typeof addNewPlayer()).toBe("object");
  });

});

// (Optional) TODO: Tests for `removePlayer`

// (Optional) TODO: Tests for `render` functions