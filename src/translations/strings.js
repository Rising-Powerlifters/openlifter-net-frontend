// vim: set ts=2 sts=2 sw=2 et:
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

// This defines translation IDs that aren't provided by a <FormattedMessage/>.
//
// Because they're not defined in the source code itself, the automatic scanner
// won't pick them up. So they're defined here instead.
//
// The "manage.js" script picks these up and combines them with the automatically
// detected messages to create the JSON translation files.

let strings = new Array();

/* eslint-disable */

// Strings for the Equipment type.
strings = strings.concat([
  { id: "equipment.bare", defaultMessage: "Bare" },
  { id: "equipment.sleeves", defaultMessage: "Sleeves" },
  { id: "equipment.wraps", defaultMessage: "Wraps" },
  { id: "equipment.single-ply", defaultMessage: "Single-ply" },
  { id: "equipment.multi-ply", defaultMessage: "Multi-ply" },
]);

// Strings for the Event type.
strings = strings.concat([
  { id: "event.s", defaultMessage: "S" },
  { id: "event.b", defaultMessage: "B" },
  { id: "event.d", defaultMessage: "D" },
  { id: "event.sb", defaultMessage: "SB" },
  { id: "event.sd", defaultMessage: "SD" },
  { id: "event.bd", defaultMessage: "BD" },
  { id: "event.sbd", defaultMessage: "SBD" },
]);

// Strings for the Sex type.
strings = strings.concat([
  { id: "sex.m", defaultMessage: "M" },
  { id: "sex.f", defaultMessage: "F" },
  { id: "sex.mx", defaultMessage: "Mx" },
]);

// Strings for the Registration page.
strings = strings.concat([
  { id: "registration.button-delete", defaultMessage: "Delete" },
]);

// Strings for the Lifting page.
strings = strings.concat([
  { id: "lifting.column-age", defaultMessage: "Age" },
  { id: "lifting.column-b1", defaultMessage: "B1" },
  { id: "lifting.column-b2", defaultMessage: "B2" },
  { id: "lifting.column-b3", defaultMessage: "B3" },
  { id: "lifting.column-b4", defaultMessage: "B4" },
  { id: "lifting.column-bestbench", defaultMessage: "Bench" },
  { id: "lifting.column-bestsquat", defaultMessage: "Squat" },
  { id: "lifting.column-bodyweight", defaultMessage: "Bwt" },
  { id: "lifting.column-d1", defaultMessage: "D1" },
  { id: "lifting.column-d2", defaultMessage: "D2" },
  { id: "lifting.column-d3", defaultMessage: "D3" },
  { id: "lifting.column-d4", defaultMessage: "D4" },
  { id: "lifting.column-division", defaultMessage: "Division" },
  { id: "lifting.column-equipment", defaultMessage: "Equip" },
  { id: "lifting.column-finaltotal", defaultMessage: "Total" },
  { id: "lifting.column-finalpoints", defaultMessage: "Points" },
  { id: "lifting.column-lifter", defaultMessage: "Lifter" },
  { id: "lifting.column-lot", defaultMessage: "Lot" },
  { id: "lifting.column-place", defaultMessage: "Place" },
  { id: "lifting.column-projectedtotal", defaultMessage: "Total" },
  { id: "lifting.column-projectedpoints", defaultMessage: "Points" },
  { id: "lifting.column-s1", defaultMessage: "S1" },
  { id: "lifting.column-s2", defaultMessage: "S2" },
  { id: "lifting.column-s3", defaultMessage: "S3" },
  { id: "lifting.column-s4", defaultMessage: "S4" },
  { id: "lifting.column-weightclass", defaultMessage: "Class" },
  { id: "lifting.flight-complete", defaultMessage: "Flight Complete" },
]);
/* eslint-enable */

exports.strings = strings;