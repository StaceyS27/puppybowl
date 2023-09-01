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

  test("returns an object", async () => {
    expect(typeof fetchSinglePlayer()).toBe('object');
  })
  
  test("returns player with name and id", async () => {
      // expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
})

// TODO: Tests for `addNewPlayer`
describe("addNewPlayer", () => {

  test("playerId is a number", async () => {
    expect(typeof playerId).toBe('number');
  }
  
  )

  test("returns an object", async () => {
    expect(typeof player).toBe('object'); 
  })

  test("returns player with name and id", async () => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });

})




// (Optional) TODO: Tests for `removePlayer`

// (Optional) TODO: Tests for `render` functions
