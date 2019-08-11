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

// Defines shared types produced by Redux actions.

import { Entry, Flight, Formula, Lift, Sex } from "./dataTypes";
import { GlobalState, MeetState, LanguageState, LiftingState } from "./stateTypes";

//////////////////////////////////////////////////////////
// Global Actions.
//////////////////////////////////////////////////////////

export interface OverwriteStoreAction {
  type: "OVERWRITE_STORE";
  store: GlobalState;
}

//////////////////////////////////////////////////////////
// Language Actions.
//////////////////////////////////////////////////////////

export interface ChangeLanguageAction {
  type: "CHANGE_LANGUAGE";
  language: LanguageState;
}

//////////////////////////////////////////////////////////
// MeetSetup Actions.
//////////////////////////////////////////////////////////

export interface SetMeetNameAction {
  type: "SET_MEET_NAME";
  name: string;
}

export interface SetFormulaAction {
  type: "SET_FORMULA";
  formula: Formula;
}

export interface SetFederationAction {
  type: "SET_FEDERATION";
  federation: string;
}

export interface SetDivisionsAction {
  type: "SET_DIVISIONS";
  divisions: Array<string>;
}

export interface SetMeetDateAction {
  type: "SET_MEET_DATE";
  date: string;
}

export interface SetLengthDaysAction {
  type: "SET_LENGTH_DAYS";
  length: number;
}

export interface SetPlatformsOnDaysAction {
  type: "SET_PLATFORM_COUNT";
  day: number;
  count: number;
}

export interface SetInKgAction {
  type: "SET_IN_KG";
  inKg: boolean;
}

export interface SetWeightClassesAction {
  type: "SET_WEIGHTCLASSES";
  sex: Sex;
  classesKg: Array<number>;
}

export interface SetBarAndCollarsWeightKgAction {
  type: "SET_BAR_AND_COLLARS_WEIGHT_KG";
  lift: Lift;
  weightKg: number;
}

export interface SetPlateConfigAction {
  type: "SET_PLATE_CONFIG";
  weightKg: number;
  pairCount: number;
  color: string;
}

export interface UpdateMeetAction {
  type: "UPDATE_MEET";
  changes: Partial<MeetState>;
}

export type MeetSetupAction =
  | SetMeetNameAction
  | SetFormulaAction
  | SetFederationAction
  | SetDivisionsAction
  | SetMeetDateAction
  | SetLengthDaysAction
  | SetPlatformsOnDaysAction
  | SetInKgAction
  | SetWeightClassesAction
  | SetBarAndCollarsWeightKgAction
  | SetPlateConfigAction
  | UpdateMeetAction;

//////////////////////////////////////////////////////////
// Registration Actions.
//////////////////////////////////////////////////////////

export interface NewRegistrationAction {
  type: "NEW_REGISTRATION";
  overwriteDefaults: Partial<Entry>;
}

export interface DeleteRegistrationAction {
  type: "DELETE_REGISTRATION";
  entryId: number;
}

export interface UpdateRegistrationAction {
  type: "UPDATE_REGISTRATION";
  entryId: number;
  changes: Partial<Entry>;
}

export interface MergePlatformAction {
  type: "MERGE_PLATFORM";
  day: number;
  platform: number;
  platformEntries: Array<Entry>;
}

export type RegistrationAction =
  | NewRegistrationAction
  | DeleteRegistrationAction
  | UpdateRegistrationAction
  | MergePlatformAction;

//////////////////////////////////////////////////////////
// Lifting Actions.
//////////////////////////////////////////////////////////

export interface EnterAttemptAction {
  type: "ENTER_ATTEMPT";
  entryId: number;
  lift: Lift;
  attemptOneIndexed: number;
  weightKg: number;
}

export interface MarkLiftAction {
  type: "MARK_LIFT";
  entryId: number;
  lift: Lift;
  attemptOneIndexed: number;
  success: boolean;
}

export interface SetLiftingGroupAction {
  type: "SET_LIFTING_GROUP";
  day: number;
  platform: number;
  flight: Flight;
  lift: Lift;
}

export interface OverrideAttemptAction {
  type: "OVERRIDE_ATTEMPT";
  attempt: number;
}

export interface OverrideEntryIdAction {
  type: "OVERRIDE_ENTRY_ID";
  entryId: number;
}

export interface SetTableInfoAction {
  type: "SET_TABLE_INFO";
  changes: Partial<LiftingState>;
}