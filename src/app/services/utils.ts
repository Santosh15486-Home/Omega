import { PatientModel } from "../dtos/patient.dto";


export class Utils {
  public static isEmailIdValid(email: string): boolean {
    if (!email) {
      return false;
    }
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(String(email).toLowerCase());
  }

  public static isMobileNoValid(mobileNo: string, mandetory = true): boolean {
    if (mandetory) {
      if (!mobileNo) {
        return false;
      }
    }
    if (!mandetory) {
      if (!mobileNo) {
        return true;
      }
      if (mobileNo == "") {
        return true;
      }
    }
    var regmm = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    return regmm.test(mobileNo);
  }

  public static isStringValid(
    str: string,
    minLength = 0,
    maxLength = 0
  ): boolean {
    if (!str) {
      return false;
    }
    if (str.trim() == "") {
      return false;
    }
    if (str.length < minLength) {
      return false;
    }
    if (maxLength != 0 && str.length > maxLength) {
      return false;
    }
    return true;
  }

  public static calculateAge(patientList: PatientModel[]): PatientModel[] {
    patientList.forEach((patient: PatientModel) => {
      patient.age = "NA";
      if (patient.dateOfBirth) {
        try {
          patient.age = this.getAgeByDob(patient.dateOfBirth);
        } catch (e) { }
      }
    });
    return patientList;
  }
  public static toCamelCase(str: string): string {
    return str
      .split(" ")
      .map(function (word, index) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  public static getAgeByDob(dob: string): string {
    if (!dob) {
      return "";
    }
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    let month = 12 + m;
    if (month >= 12) {
      month = month - 12;
    }
    return (isNaN(age) ? '0' : age) + "-" + (isNaN(month) ? '0' : month);
  }

  public static getDobByAge(age: string): string {
    const arr = age.split("-");
    const yesrs = +arr[0];
    let months = 0
    if (arr.length == 2) {
      months = +arr[1];
    }
    const today = new Date();
    let dob = today.getFullYear();
    dob = today.getFullYear() - yesrs;
    if (months != 0 && months > today.getMonth()) {
      dob = dob - 1;
    }
    let m = today.getMonth() - months + 1;
    if (m < 1) {
      m = m + 12;
    }
    let retMon = "";
    if (m < 10) {
      retMon = "0" + m;
    } else {
      retMon = "" + m;
    }
    return dob + "-" + retMon + "-" + today.getDate();
  }

  public static calculateDayDiff(expiryDate: string) {
    let date = new Date(expiryDate);
    let currentDate = new Date();
    let days = Math.floor((date.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
}