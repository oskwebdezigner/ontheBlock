import { DrawerActions, CommonActions } from "@react-navigation/native";
let navObj = null;
function setGlobalRef(ref) {
  navObj = ref;
}

function navigate(path, props = {}) {
  navObj.navigate(path, props);
}

function toggleDrawer() {
  navObj.dispatch(DrawerActions.toggleDrawer());
}

function ResetNavigation() {
  navObj.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    })
  );
}

export default {
  setGlobalRef,
  navigate,
  toggleDrawer,
  ResetNavigation,
};
