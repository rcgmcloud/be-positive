BloodType = {

  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {

  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 90,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */


  receive_patient : function (blood_inventory, patient) {
    var factorRh = patient.blood_type[bloodtype.length-3];
    var bloodArr = patient.blood_type.split("_");
    var factorBlood = bloodArr[0] + "_";

    //if their specific blood is available, give it to them!
    if (blood_inventory[patient.blood_type] > 0){
      return BloodType[patient.blood_type];
    }
    //out of POS? well, if they are POS, and NEG is avail, give them corresponding NEG!
    if (factorRh === 'P' && blood_inventory[factorBlood + "NEG"] > 0){
      return BloodType[factorBlood + "NEG"];
    }

    //is AB blood failing? Let's find other options!
    //Let's deal with AB NEG first...
    if(patient.blood_type === "AB_NEG"
      && blood_inventory.A_NEG > 0 || blood_inventory.B_NEG > 0){
      if (blood_inventory.A_NEG > blood_inventory.B_NEG){
        return BloodType.A_NEG;
      }
      return BloodType.B_NEG;
    }
    //Let's deal with AB POS...
  //   if (patient.blood_type === "AB_POS"
  //     && blood_inventory.A_POS > 0
  // || blood_inventory.B_POS > 0 )


    //IF FAILING SO FAR, TURN OUR HEADS TO THE 'O' BLOOD!
    //if type is NEG && corresponding NEG is avail, give them!
    if (factorRh === 'N' && BloodType.O_NEG > 0){
      return BloodType.O_NEG;
    }
    //LAST RESORT: give them the most compatible blood, O Positive!
    return BloodType.O_POS;
  }

};