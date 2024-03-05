
export class Apis {
  readonly baseUrl = "http://app.smartopd.in/sopd/";
  // readonly baseUrl = "http://localhost:8088/sopd/";
  // readonly baseUrl = "/sopd/";

  //default page size
  readonly PAGE_SIZE = 20;

  //user apis
  readonly LOGIN = this.baseUrl + "users/login";
  readonly USER = this.baseUrl + "users";
  readonly CURRENT_USER = this.baseUrl + "users/currentUser";

  //Patinet apis
  readonly PATIENTS = this.baseUrl + "patients";

  //history apis
  readonly HISTORY = this.baseUrl + "history";

  //transaction apis
  readonly TRANSACTION = this.baseUrl + "transactions";

  //App Setting apis
  readonly MENU_ITEMS = this.baseUrl + "app/appMenu";

  //preferences
  readonly PREFERENCES = this.baseUrl + "preferences";

  //admin menu
  readonly APP_MENU = this.baseUrl + "admin/menu";

  //admin Medicine Types
  readonly MEDS = this.baseUrl + "medicines";
  readonly MED_TYPE = this.baseUrl + "medicines/types";
  readonly EXTEND_ACC = this.baseUrl + "admin/user/extend";
  readonly VERIFY_ACC = this.baseUrl + "admin/user/verify";

  // appintmnet
  readonly APPT = this.baseUrl + "appointment";

  // Reports
  readonly REP_CURR_MONTH = this.baseUrl + "reports/currMonthPatient";
  readonly REP_CURR_FEE = this.baseUrl + "reports/currMonthFee"
  readonly PATIENT_COUNT = this.baseUrl + "reports/patientCounts";
  readonly REP_IPD_COUNT = this.baseUrl + "reports/currMonthIPD";

  //IPD
  readonly IPD = this.baseUrl + "ipd";

  //DOC
  readonly DOCUMENTS = this.baseUrl + "documents";

  getUserId() {
    if (
      sessionStorage.getItem("USER_ID") == undefined ||
      sessionStorage.getItem("USER_ID") == ""
    ) {
      return "";
    } else {
      return sessionStorage.getItem("USER_ID");
    }
  }

  setUserId(userId: string) {
    sessionStorage.setItem("USER_ID", userId);
  }

  getAuthToken() {
    if (sessionStorage.getItem("AUTH_KEY") == undefined) {
      return "";
    } else {
      return sessionStorage.getItem("AUTH_KEY");
    }
  }

  setAuthToken(authKey: string) {
    sessionStorage.setItem("AUTH_KEY", authKey);
  }

  isAdmin() {
    var returnValue = false;
    if (sessionStorage.getItem("USER_ROLE") != undefined) {
      if (sessionStorage.getItem("USER_ROLE") == "ROLE_ADMIN") {
        returnValue = true;
      }
    }
    return returnValue;
  }

  setAdmin(role: string) {
    sessionStorage.setItem("USER_ROLE", role);
  }

  cleatData() {
    sessionStorage.clear();
  }
}

