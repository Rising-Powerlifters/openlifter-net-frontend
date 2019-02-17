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

// Defines all the project-wide data types in a single place.

export type Equipment = "Raw" | "Wraps" | "Single-ply" | "Multi-ply";
export type Event = "S" | "B" | "D" | "SB" | "SD" | "BD" | "SBD";
export type Flight = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
export type Formula = "Glossbrenner" | "IPF Points" | "Wilks";
export type Lift = "S" | "B" | "D";

// Mx (pronounced "Muks" or "Miks") is an honorific that does not indicate gender.
//
// Powerlifting federations use Mx for lifters who do not neatly fall into M or F
// categories. It is typically used as a category for transgender athletes.
export type Sex = "M" | "F" | "Mx";

export type LiftStatus =
  | -1 // Failure.
  | 0 // Not yet taken.
  | 1; // Success.

// Used for mapping Lift -> entry[fieldKg].
export type FieldKg = "squatKg" | "benchKg" | "deadliftKg";

// Used for mapping Lift -> entry[fieldStatus].
export type FieldStatus = "squatStatus" | "benchStatus" | "deadliftStatus";

export type Entry = {
  id: number,
  day: number,
  platform: number,
  flight: Flight,
  name: string,
  sex: Sex,
  birthDate: string,
  age: number,
  intendedWeightClassKg: string,
  equipment: Equipment,
  divisions: Array<string>,
  events: Array<Event>,
  lot: number,
  memberId: string,
  paid: boolean,
  bodyweightKg: number,
  squatRackInfo: string,
  benchRackInfo: string,
  squatKg: Array<number>,
  benchKg: Array<number>,
  deadliftKg: Array<number>,
  squatStatus: Array<LiftStatus>,
  benchStatus: Array<LiftStatus>,
  deadliftStatus: Array<LiftStatus>
};

export type PlatePairCount = {
  weightKg: number,
  pairCount: number
};

// Represents a single plate loaded on the bar, for the BarLoad component.
export type LoadedPlate = {
  weightAny: number, // The weight used for display, kg or pounds.
  isAlreadyLoaded: boolean // Used for diffs: if true, it's rendered faintly.
};

export type LiftingOrder = {
  orderedEntries: Array<Entry>,
  attemptOneIndexed: number,
  currentEntryId: number | null,
  nextAttemptOneIndexed: number | null,
  nextEntryId: number | null
};

// Type used for FormGroup validation.
export type Validation = null | "success" | "warning" | "error";
