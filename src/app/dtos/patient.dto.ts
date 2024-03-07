export class PatientModel {
    constructor() {
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.mobileNo = "";
        this.gender = "";
    }
    public id: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public gender: string;
    public mobileNo: string;
    public address: string;
    public dateOfBirth: string;
    public age: string;
    public ipd: IpdModel;
    public admitDate: string;
    public patientId: number;
    public status: string;
    public dobMode: true;
}

export class IpdModel {
    public id: number;
    public admitDate: string;
}

export class ExtraFields {
    constructor(_filedName = "", _fieldType = "text", _value = "") {
        this.fieldName = _filedName;
        this.fieldType = _fieldType;
        this.fieldValue = _value;
    }
    public id: number;
    public fieldName: string;
    public fieldValue: string;
    public fieldType: string;
}

export class Options {
    constructor(_label = "", _value = "") {
        this.label = _label;
        this.value = _value;
    }
    public label: string;
    public value: string;
}

export class AdvanceExtraField extends ExtraFields {
    constructor(_filedName = "", _fieldType = "text", _value = "", _uuid = DefaultValues.OTHER, _options: Options[] = []) {
        super(_filedName, _fieldType, _value)
        this.uuid = _uuid;
        this.options = _options;
    }
    public uuid: DefaultValues;
    public options: Options[];
}

export class HistoryModel {
    constructor() {
        this.complaints = "";
        this.treatment = "";
        this.investigation = "";
    }
    public complaints: string;
    public investigation: string;
    public treatment: string;
    public fees: number;
    public feesPaid: boolean = true;
    public amountPaid: number;
    public extraFields: ExtraFields[];
    public createdDate: string;
    public historyType: string;
    public ipdId: number;
    public showIpdPanel = false;
    public treatType: string;
    public medicines: PresMedicineModel[];
}

export class PresMedicineModel {
    public name: string;
    public type: string;
    public sch: number[];
    public qty: string;
    public bOa: string;
}

export class CountModel {
  public order: number;
  public label: string;
  public patientCount: number;
  public ipdCount: number;
}

export class HistoryPrintObj {
    public print: boolean;
    public patient: PatientModel;
    public history: HistoryModel;
}

export enum PatientFormType {
    CREATE, EDIT, FILTER
}

export enum RightDrawerType {
    PATIENT, HISTORY, NEW_HISTORY, IPD_ROUND, DISCHARGE
}

export class TransactionModel {
    public id: number;
    public transactionDate: string;
    public amount: number;
    public transactionNo: string;
    public status: string;
    public paidOn: string;
    public historyId: number;
    public clinicId: number;
    public patientId: number;
    public balanceAmount: number;
    public payMode = false;
    public paymantOf: number;
}

export class LoginModel {
    constructor(_username: string, _password: string){
      this.userName = _username;
      this.password = _password;
    }
    public userName: string;
    public password: string;
  }
  

export enum DefaultValues {
    OTHER = "OTHER",
    TOP_SPACE = "TOP_SPACE",
    DEF_TAB = "DEF_TAB",
    PES_TYPE = "PES_TYPE",
    PES_LANG = "PES_LANG"
}

export class SnackBar {
    constructor(_messgae: string, _classList?: string, _icon?: string){
        this.message = _messgae;
        this.icon = _icon;
        this.classList = _classList;
    }
    public message: string;
    public classList?: string;
    public icon?: string;
}

export class UserModel {
    public id: number;
    public firstName: string;
	public lastName: string;
	public email: string;
	public mobileNo: string;
	public password: string;
    public clinic: ClinicModel;
	public verificationStatus: boolean;
	public showDetails: boolean = false;
	public expiryDate: string;
	public remDays: number;
	public extendBy: number;
}

export class ClinicModel {
    public id: number;
	public clinicName: string
	public contactNo: string;
	public address: string;
}

export class MenuItem {
    public id: number;
    public name: string;
    public logo: string;
    public path: string;
    public active : boolean;
    public displayOrder: number;
	public visible: boolean;
}

export class MedicineTypeModel {
    constructor() {
        this.medicineType = "";
        this.shortName = "";
    }
    public id: number;
    public medicineType: string;
    public shortName: string;
}

export class MedicineModel {
    constructor() {
        this.medicineName = "";
    }
    public id: number;
    public medicineName: string;
    public medicineType: MedicineTypeModel;
    public editMode = false;
    public medicineTypeName: string;
}

export class IpdHistoryModel {
    constructor() {
        this.observations = "";
        this.treatment = "";
    }
    public id: number;
    public observations: string;
    public treatment: string;
    public extraFields: ExtraFields[];
    public patientId: number;
    public timeStamp: string;
}

export class DischargeModel {
    constructor() {
        this.feesPaid = true;
        this.prescription = "";
    }
    public prescription: string;
    public fees: number;
    public feesPaid : boolean;
    public amountPaid: number;
    public patinetId: number;
    public ipdId: number;
}

export class AutoLoginData {
    public canAutoLogin = false;
    public loginData: LoginModel;
}
