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

// The top bar of the Lifting page, containing huge text about the current lifter.

import React from "react";
import { connect } from "react-redux";

import { Entry } from "../../types/dataTypes";
import { GlobalState, RegistrationState } from "../../types/stateTypes";

import styles from "./TopBar.module.scss";

interface OwnProps {
  attemptOneIndexed: number;
  orderedEntries: Array<Entry>;
  currentEntryId: number | null;
}

interface StateProps {
  registration: RegistrationState;
}

type Props = OwnProps & StateProps;

class LiftingHeader extends React.Component<Props> {
  render() {
    // Defaults, in case of no lifter.
    let lifterName = "Flight Complete";
    let info = "";

    // In the case of a lifter, set fields.
    if (this.props.currentEntryId !== null && this.props.currentEntryId !== undefined) {
      const idx = this.props.registration.lookup[this.props.currentEntryId];
      const entry = this.props.registration.entries[idx];
      lifterName = entry.name;

      let infoBuilder: Array<string> = [];

      if (typeof entry.instagram === "string" && entry.instagram !== "") {
        infoBuilder.push("@" + entry.instagram);
      }
      if (entry.age > 0) {
        infoBuilder.push(String(entry.age));
      }
      if (entry.divisions.length > 0) {
        infoBuilder.push(entry.divisions.join(", "));
      }

      info = infoBuilder.join(" – "); // This is an &ndash;.
    }

    return (
      <div className={styles.topBar}>
        <div className={styles.lifterName}>{lifterName}</div>
        <div className={styles.info}>{info}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => {
  return {
    registration: state.registration
  };
};

export default connect(
  mapStateToProps,
  null
)(LiftingHeader);
