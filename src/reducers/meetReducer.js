// vim: set ts=2 sts=2 sw=2 et:
// @flow strict
//
// This file is part of OpenLifter, simple Powerlifting meet software.
// Copyright (C) 2019 The OpenPowerlifting Project.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { localDateToIso8601 } from "../logic/date";
import { lbs2kg } from "../logic/units";

import type { MeetSetupAction, OverwriteStoreAction } from "../types/actionTypes";
import type { PlatePairCount } from "../types/dataTypes";
import type { MeetState } from "../types/stateTypes";

const defaultPlatformsOnDay = 1;

const defaultBarAndCollarsWeightKg = 25; // Assuming metal 2.5kg collars.
const defaultBarAndCollarsWeightLbs = 45; // Assuming plastic collars.

// Default kg plates, allowing for increments of 0.5kg.
const defaultPlatePairCountsKg: Array<PlatePairCount> = [
  { weightKg: 50, pairCount: 0 },
  { weightKg: 25, pairCount: 8 },
  { weightKg: 20, pairCount: 1 },
  { weightKg: 15, pairCount: 1 },
  { weightKg: 10, pairCount: 1 },
  { weightKg: 5, pairCount: 1 },
  { weightKg: 2.5, pairCount: 1 },
  { weightKg: 1.25, pairCount: 1 },
  { weightKg: 1, pairCount: 1 },
  { weightKg: 0.75, pairCount: 1 },
  { weightKg: 0.5, pairCount: 1 },
  { weightKg: 0.25, pairCount: 1 }
];

// Default lbs plates, allowing for increments of 1lb.
const defaultPlatePairCountsLbs: Array<PlatePairCount> = [
  { weightKg: lbs2kg(100), pairCount: 0 },
  { weightKg: lbs2kg(45), pairCount: 8 },
  { weightKg: lbs2kg(35), pairCount: 0 },
  { weightKg: lbs2kg(25), pairCount: 1 },
  { weightKg: lbs2kg(10), pairCount: 2 },
  { weightKg: lbs2kg(5), pairCount: 1 },
  { weightKg: lbs2kg(2.5), pairCount: 1 },
  { weightKg: lbs2kg(1.25), pairCount: 1 },
  { weightKg: lbs2kg(0.5), pairCount: 2 }
];

const initialState: MeetState = {
  name: "",
  formula: "Wilks",
  federation: "",
  date: localDateToIso8601(new Date()),
  lengthDays: 1,
  platformsOnDays: [defaultPlatformsOnDay],
  divisions: [],
  weightClassesKgMen: [],
  weightClassesKgWomen: [],
  weightClassesKgMx: [],
  inKg: true,
  combineSleevesAndWraps: false,
  allow4thAttempts: true,
  country: "",
  state: "",
  city: "",
  barAndCollarsWeightKg: defaultBarAndCollarsWeightKg,
  platePairCounts: defaultPlatePairCountsKg
};

// Given a sorted list of weight classes (in kg) and a bodyweight (in kg),
// return a string describing the weight class.
export const getWeightClassStr = (classes: Array<number>, bodyweightKg: number): string => {
  if (bodyweightKg === 0) return "";
  if (classes.length === 0) return "";

  for (let i = 0; i < classes.length; i++) {
    if (bodyweightKg <= classes[i]) {
      return String(classes[i]);
    }
  }
  return String(classes[classes.length - 1]) + "+";
};

type Action = MeetSetupAction | OverwriteStoreAction;

export default (state: MeetState = initialState, action: Action): MeetState => {
  switch (action.type) {
    case "SET_MEET_NAME":
      return { ...state, name: action.name };

    case "SET_FORMULA":
      return { ...state, formula: action.formula };

    case "SET_FEDERATION":
      return { ...state, federation: action.federation };

    case "SET_DIVISIONS":
      return { ...state, divisions: action.divisions };

    case "SET_MEET_DATE":
      return { ...state, date: action.date };

    case "SET_LENGTH_DAYS": {
      const numDays = Number(action.length);

      if (numDays >= state.platformsOnDays.length) {
        const diff = numDays - state.platformsOnDays.length;

        let newPlatformsOnDays: Array<number> = state.platformsOnDays.slice();
        for (let i = 0; i < diff; i++) {
          newPlatformsOnDays.push(defaultPlatformsOnDay);
        }

        return { ...state, lengthDays: numDays, platformsOnDays: newPlatformsOnDays };
      }
      return { ...state, lengthDays: numDays };
    }

    case "SET_PLATFORM_COUNT": {
      const day = Number(action.day);
      const count = Number(action.count);

      let newPlatformsOnDays: Array<number> = state.platformsOnDays.slice();
      newPlatformsOnDays[day - 1] = count;
      return { ...state, platformsOnDays: newPlatformsOnDays };
    }

    case "SET_IN_KG": {
      // Changing the units also changes the loading, so re-initialize from defaults.
      const defaultPlates = action.inKg ? defaultPlatePairCountsKg : defaultPlatePairCountsLbs;
      const defaultBar = action.inKg ? defaultBarAndCollarsWeightKg : lbs2kg(defaultBarAndCollarsWeightLbs);
      return { ...state, inKg: action.inKg, platePairCounts: defaultPlates, barAndCollarsWeightKg: defaultBar };
    }

    case "SET_WEIGHTCLASSES": {
      const sex = action.sex;
      const classesKg = action.classesKg;
      switch (sex) {
        case "M":
          return { ...state, weightClassesKgMen: classesKg };
        case "F":
          return { ...state, weightClassesKgWomen: classesKg };
        case "Mx":
          return { ...state, weightClassesKgMx: classesKg };
        default:
          (sex: empty) // eslint-disable-line
          return state;
      }
    }

    case "SET_BAR_AND_COLLARS_WEIGHT_KG": {
      return { ...state, barAndCollarsWeightKg: action.weightKg };
    }

    case "SET_PLATE_PAIR_COUNT": {
      const { weightKg, pairCount } = action;

      // Find the index of the object in the platesOnSide array by comparing weights.
      const index = state.platePairCounts.findIndex(p => p.weightKg === weightKg);

      // Clone the array.
      let newPlates: Array<PlatePairCount> = state.platePairCounts.slice();

      // Replace with a new object in the new array.
      newPlates[index] = { weightKg, pairCount };

      return { ...state, platePairCounts: newPlates };
    }

    case "UPDATE_MEET": {
      const changes = action.changes;

      // Make a new MeetState with just the changes overwritten.
      let newState = Object.assign({}, state);
      return Object.assign(newState, changes);
    }

    case "OVERWRITE_STORE":
      return action.store.meet;

    default:
      (action.type: empty); // eslint-disable-line
      return state;
  }
};
