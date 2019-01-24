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

import { combineReducers } from "redux";
import languageReducer from "./languageReducer";
import meetReducer from "./meetReducer";
import registrationReducer from "./registrationReducer";
import liftingReducer from "./liftingReducer";

import type { LanguageState } from "./languageReducer";
import type { MeetState } from "./meetReducer";
import type { RegistrationState } from "./registrationReducer";
import type { LiftingState } from "./liftingReducer";

export type GlobalState = {
  language: LanguageState,
  meet: MeetState,
  registration: RegistrationState,
  lifting: LiftingState
};

// Using combineReducers() guarantees that each part of the state object
// fully bears the responsibility of managing itself by only sending a
// subset of the state to the reducer.
//
// For example, the meetReducer() receives a new 'state' object
// equal to 'state.meet' from the root. Because there is no way to access
// the root state object from a child state object, the meetReducer() is
// fully-encapsulated, allowing for sane reasoning about effects on global state.
export default combineReducers({
  language: languageReducer,
  meet: meetReducer,
  registration: registrationReducer,
  lifting: liftingReducer
});
