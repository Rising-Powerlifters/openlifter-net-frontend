// vim: set ts=2 sts=2 sw=2 et:

const defaultPlatformsOnDay = 1;

const initialState = {
  name: "",
  formula: "Wilks",
  federation: "",
  date: new Date(),
  dateString: getDateString(new Date()),
  lengthDays: 1,
  platformsOnDays: [defaultPlatformsOnDay],
  divisions: [],
  weightClassesKgMen: [],
  weightClassesKgWomen: [],
  inKg: true
};

function getDateString(dateTime) {
  return [dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate()].join("/");
}

export default (state = initialState, action) => {
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
      return { ...state, date: action.date, dateString: getDateString(action.date) };
    case "SET_LENGTH_DAYS": {
      const numDays = Number(action.length);

      if (numDays >= state.platformsOnDays.length) {
        let newPlatformsOnDays = state.platformsOnDays.slice();
        newPlatformsOnDays.push(defaultPlatformsOnDay);

        return { ...state, lengthDays: numDays, platformsOnDays: newPlatformsOnDays };
      }
      return { ...state, lengthDays: numDays };
    }
    case "SET_PLATFORM_COUNT": {
      let newPlatformsOnDays = state.platformsOnDays.slice();
      newPlatformsOnDays[action.data.day - 1] = Number(action.data.count);
      return { ...state, platformsOnDays: newPlatformsOnDays };
    }
    case "SET_IN_KG":
      return { ...state, inKg: action.inKg };
    case "SET_WEIGHTCLASSES": {
      const sex = action.sex;
      const classesKg = action.classesKg;
      if (sex === "M") {
        return { ...state, weightClassesKgMen: classesKg };
      }
      return { ...state, weightClassesKgWomen: classesKg };
    }
    case "OVERWRITE_STORE": {
      // Copy all the state objects into an empty object.
      let obj = Object.assign({}, state);

      // Copy in the action's objects, overwriting the state's objects.
      return Object.assign(obj, action.store.meet);
    }
    default:
      return state;
  }
};
