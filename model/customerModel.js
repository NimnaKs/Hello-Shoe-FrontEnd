export class CustomerModel {
    constructor(
        customerId ,
        customerName,
        gender,
        level,
        joinDate,
        totalPoint,
        dob,
        address1,
        address2,
        address3,
        address4,
        postalCode,
        contactNo,
        email,
        recentPurchasedDate
    ){
        this.customerId=customerId;
        this.customerName = customerName;
        this.gender = gender;
        this.dob = dob;
        this.level=level;
        this.joinDate=joinDate;
        this.totalPoint=totalPoint;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.address4 = address4;
        this.postalCode = postalCode;
        this.contactNo = contactNo;
        this.email = email;
        this.recentPurchasedDate=recentPurchasedDate;
    }
}