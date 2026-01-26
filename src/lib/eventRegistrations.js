// Mapping of sports event IDs (1..25) to ticket types.
// Keep these strings in sync with whatever your payment provider expects.

export const Tickets = Object.freeze({
  // --- Cricket ---
  CricketMen: "CricketMen",
  CricketWomen: "CricketWomen",

  // --- Football ---
  FootballMen: "FootballMen",
  FootballWomen: "FootballWomen",

  // --- Chess ---
  ChessMen: "ChessMen",
  ChessWomen: "ChessWomen",

  // --- Volleyball ---
  VolleyballMen: "VolleyballMen",
  VolleyballWomen: "VolleyballWomen",

  // --- Basketball ---
  BasketballMen: "BasketballMen",
  BasketballWomen: "BasketballWomen",

  // --- Badminton ---
  BadmintonMen: "BadmintonMen",
  BadmintonWomen: "BadmintonWomen",

  // --- E-sports ---
  BGMIValorant: "BGMIValorant",
  FreeFire: "FreeFire",

  // --- Lawn-Tennis ---
  LawnTennis: "LawnTennis",

  // --- Table Tennis ---
  TableTennisTeamMen: "TableTennisTeamMen",
  TableTennisTeamWomen: "TableTennisTeamWomen",
  TableTennisSoloMen: "TableTennisSoloMen",
  TableTennisWomenSolo: "TableTennisWomenSolo",
  TableTennisMixedDoubles: "TableTennisMixedDoubles",

  // --- Carrom ---
  Carrom: "Carrom",
});

// Use this serial no as event id
export const eventRegistrations = Object.freeze({
  // --- Cricket ---
  1: Tickets.CricketMen,
  2: Tickets.CricketWomen,

  // --- Football ---
  3: Tickets.FootballMen,
  4: Tickets.FootballWomen,

  // --- Chess ---
  5: Tickets.ChessMen,
  6: Tickets.ChessWomen,

  // --- Volleyball ---
  7: Tickets.VolleyballMen,
  8: Tickets.VolleyballWomen,

  // --- Basketball ---
  9: Tickets.BasketballMen,
  10: Tickets.BasketballWomen,

  // --- Badminton ---
  11: Tickets.BadmintonMen,
  12: Tickets.BadmintonWomen,

  // --- E-sports ---
  13: Tickets.BGMIValorant, // BGMI
  14: Tickets.BGMIValorant, // Valorant
  15: Tickets.FreeFire,

  // --- Lawn-Tennis ---
  16: Tickets.LawnTennis,
  17: Tickets.LawnTennis,

  // --- Table Tennis ---
  18: Tickets.TableTennisTeamMen,
  19: Tickets.TableTennisTeamWomen,
  20: Tickets.TableTennisSoloMen,
  21: Tickets.TableTennisWomenSolo,
  22: Tickets.TableTennisMixedDoubles,

  // --- Carrom ---
  23: Tickets.Carrom,
  24: Tickets.Carrom,
  25: Tickets.Carrom,
});

export const getTicketTypeForEventID = (eventID) => {
  return eventRegistrations[Number(eventID)];
};
