// vim: set ts=2 sts=2 sw=2 et:
// @flow
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

// Defines logic for parsing strings into OpenLifter datatypes.
// The strings can come from the user and are therefore untrusted.

import type { Equipment, Event, Sex } from "../types/dataTypes";

// Strictly parse a string to an integer. Negatives are allowed.
export const parseInteger = (s: string): ?number => {
  // Characters will be compared to ASCII charcodes.
  const ascii_0 = 0x30;
  const ascii_9 = 0x39;
  const ascii_minus = 0x2d;

  // Disallow the empty string.
  if (s.length === 0) {
    return;
  }

  // Check the string character-by-character.
  for (let i = 0; i < s.length; ++i) {
    let charcode = s.charCodeAt(i);

    // A single negative is allowed at the front.
    if (i === 0 && charcode === ascii_minus) {
      continue;
    } else if (charcode < ascii_0 || charcode > ascii_9) {
      return;
    }
  }

  return parseInt(s, 10);
};

// Strictly parse a string to a Sex.
export const parseSex = (s: string): ?Sex => {
  if (s === "M") return "M";
  if (s === "F") return "F";
  if (s === "Mx") return "Mx";
  return;
};

// Strictly parse a string to an Equipment.
export const parseEquipment = (s: string): ?Equipment => {
  if (s === "Bare") return "Bare";
  if (s === "Sleeves") return "Sleeves";
  if (s === "Wraps") return "Wraps";
  if (s === "Single-ply") return "Single-ply";
  if (s === "Multi-ply") return "Multi-ply";
  return;
};

// Strictly parse a string to an Event.
// Valid characters are "SBD", which must occur in that order.
export const parseEvent = (s: string): ?Event => {
  if (s === "") {
    return;
  }

  const has_squat = s.includes("S");
  const has_bench = s.includes("B");
  const has_deadlift = s.includes("D");

  let acc = "";
  if (has_squat) acc += "S";
  if (has_bench) acc += "B";
  if (has_deadlift) acc += "D";

  // Having reconstructed the string in the right order, check whether it matches.
  if (acc !== s) {
    return;
  }

  return ((s: any): Event);
};

// Strictly parse a YYYY-MM-DD date.
export const parseDate = (s: string): ?string => {
  if (s.length !== 10) {
    return;
  }

  let pieces = s.split("-");
  if (pieces.length !== 3) {
    return;
  }

  if (pieces[0].length !== 4 || pieces[1].length !== 2 || pieces[2].length !== 2) {
    return;
  }

  let year = parseInteger(pieces[0]);
  let month = parseInteger(pieces[1]);
  let day = parseInteger(pieces[2]);

  if (typeof year !== "number" || year < 1920) return;
  if (typeof month !== "number" || month < 1 || month > 12) return;
  if (typeof day !== "number" || day < 1 || day > 31) return;

  return s;
};