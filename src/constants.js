export const inputErrStr = Object.freeze({
  required: 'שדה חובה',
  pattern: 'אנא כתוב כתובת אימייל תקפה',
});

//regex
export const emailReg = new RegExp(/^[^@]+@[^@]+\.[^@]+$/);
