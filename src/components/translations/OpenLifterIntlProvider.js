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

import * as React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import translations from "../../translations/locales";

import type { GlobalState, LanguageState } from "../../types/stateTypes";

interface StateProps {
  language: LanguageState;
}

// TODO: Can get rid of this if we can get Flow typedefs for React.Component.
interface ImplicitProps {
  children: Array<Object>;
}

type Props = StateProps & ImplicitProps;

class OpenLifterIntlProvider extends React.Component<Props> {
  render() {
    const language = this.props.language;

    // Load our translations from the json files
    const messages = translations[language];

    return (
      // This is going to wrap any children passed to this component with an IntlProvider
      // This will put translations of all of our child components in our app
      <IntlProvider locale={language} key={language} messages={messages}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  language: state.language
});

export default connect(
  mapStateToProps,
  null
)(OpenLifterIntlProvider);
