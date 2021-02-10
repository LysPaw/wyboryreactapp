export const displayHelperArrIPart = [
  'Number of voting cards received by committee',
  'Number of voters with permission to vote by the end of the voting',
  'Number of unused voting cards',
  'Number of voters who received voting card',
];
export const displayHelperArrIIPart = [
  { str: 'Number of voting cards extracted from a ballot box', protocolValue: '5' },
  { str: 'Number of valid voting cards', protocolValue: '6' },
  { str: 'Number of invalid voting cards', protocolValue: '7' },
  {
    str: 'including voting cards with the "X" sign next to the surname of two or more candidates',
    protocolValue: '7a',
  },
  { str: 'including voting cards without the "X" sign next to the surname of any candidate', protocolValue: '7b' },
  { str: 'including voting cards which were damaged', protocolValue: '7c' },
];
export const displayHelperArrIIIPart = ['Ben XYZ', 'Dan ZYX', 'Keanu XZY', 'Romuald YZX', 'Levi ZXY'];
export const displayHelperArrIVPart = [
  {
    str:
      'Comment on presumed cause of difference between sum of numbers from pt. 3, 4 and pt. 1;\n if there is no difference enter "no comment"',
    inputType: 'string',
  },
  {
    str:
      'Comment on presumed cause of difference between numbers pt. 5 and pt. 4;\n if there is no difference enter "no comment"',
    inputType: 'string',
  },
  {
    str:
      'Comment on presumed cause of damaged voting cards from pt. 7c;\n if the number from pt. 7c is 0, enter "no comment"',
    inputType: 'string',
  },
  { str: `Events that deviate from the norm;\n if there were no such events, enter "no comment"`, inputType: 'string' },
  { str: `Number of presented persons of trust;\n if there was no one, enter "no comment"`, inputType: 'number' },
  {
    str: `Annotations brought by persons of trust;\n if there were no annotations, enter "no comment"`,
    inputType: 'string',
  },
  {
    str: 'Annotations brought by other committee members; if there were no annotations, enter "no comment"',
    inputType: 'string',
  },
  { str: 'Other comments', inputType: 'string' },
];
