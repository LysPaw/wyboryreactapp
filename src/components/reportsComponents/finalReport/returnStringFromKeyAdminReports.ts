export default (key: string) => {
  switch (key) {
    case 'a1':
      return 'Number of voting cards received by committee';
    case 'a2':
      return 'Number of voters with permission to vote by the end of the voting';
    case 'a3':
      return 'Number of unused voting cards';
    case 'a4':
      return 'Number of voters who received voting card';
    case 'a5':
      return 'Number of voting cards extracted from a ballot box';
    case 'a6':
      return 'Number of valid voting cards';
    case 'a7':
      return 'Number of invalid voting cards';
    case 'a7a':
      return 'including voting cards with the "X" sign next to the surname of two or more candidates';
    case 'a7b':
      return 'including voting cards without the "X" sign next to the surname of any candidate';
    case 'a7c':
      return 'including voting cards which were damaged';
    case 'b1':
      return 'Ben XYZ';
    case 'b2':
      return 'Dan ZYX';
    case 'b3':
      return 'Keanu XZY';
    case 'b4':
      return 'Romuald YZX';
    case 'b5':
      return 'Levi ZXY';
    case 'c1':
      return 'Comment on presumed cause of difference between sum of numbers from pt. 3, 4 and pt. 1;\n if there is no difference enter "no comment"';
    case 'c2':
      return 'Comment on presumed cause of difference between numbers pt. 5 and pt. 4;\n if there is no difference enter "no comment"';
    case 'c3':
      return 'Comment on presumed cause of damaged voting cards from pt. 7c;\n if the number from pt. 7c is 0, enter "no comment"';
    case 'c4':
      return 'Events that deviate from the norm;\n if there were no such events, enter "no comment"';
    case 'c5':
      return 'Number of presented persons of trust;\n if there was no one, enter "no comment"';
    case 'c6':
      return 'Annotations brought by persons of trust;\n if there were no annotations, enter "no comment"';
    case 'c7':
      return 'Annotations brought by other committee members; if there were no annotations, enter "no comment"';
    case 'c8':
      return 'Other comments';
    case 'd1':
      return 'Committee position regarding annotations above';
    default:
      return null;
  }
};

export const checkForImportantReportKeys = (key: string) => {
  switch (key) {
    case 'a1':
      return true;
    case 'a2':
      return true;
    case 'a3':
      return true;
    case 'a4':
      return true;
    case 'a5':
      return true;
    case 'a6':
      return true;
    case 'a7':
      return true;
    case 'a7a':
      return true;
    case 'a7b':
      return true;
    case 'a7c':
      return true;
    case 'b1':
      return true;
    case 'b2':
      return true;
    case 'b3':
      return true;
    case 'b4':
      return true;
    case 'b5':
      return true;
    case 'c1':
      return true;
    case 'c2':
      return true;
    case 'c3':
      return true;
    case 'c4':
      return true;
    case 'c5':
      return true;
    case 'c6':
      return true;
    case 'c7':
      return true;
    case 'c8':
      return true;
    case 'd1':
      return true;
    default:
      return false;
  }
};

export const sectionDividers = (key: string) => {
  switch (key) {
    case 'a1':
      return 'I. Settlement of voter-registration lists';
    case 'b1':
      return 'II. Establishing the result of voting';
    case 'c1':
      return 'III. Valid voting card for each cadicate';
    case 'd1':
      return 'IV. Comments and annotation';
    default:
      return null;
  }
};

export const isTextArea = (key: string) => {
  switch (key) {
    case 'c1':
      return true;
    case 'c2':
      return true;
    case 'c3':
      return true;
    case 'c4':
      return true;
    case 'c6':
      return true;
    case 'c7':
      return true;
    case 'c8':
      return true;
    case 'd1':
      return true;
    default:
      return false;
  }
};

export const emptyFieldError = (key: string, value: string) => {
  switch (key) {
    case 'c8':
      return false;
    case 'd1':
      return false;
    default:
      if (value) return false;
      else return true;
  }
};
