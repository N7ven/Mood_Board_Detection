import moment from 'moment';

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve({
    base64Str: reader.result.split(',')[1],
    fileName: file.name,
    type: file.type,
    extension: file.type.split('/')[1]
  });
  reader.onerror = (error) => reject(error);
});

const dateFormat = (date) => {
  return moment(new Date(date)).format('dddd, MMMM Do YYYY, h:mm:ss a');
};

const filterDropDownData = (data, id) => {
  if (!data?.length > 0 || !id) return [];
  const filteredData = data.find((item) => item.refTypeId === id);
  if (!filteredData) return [];
  return filteredData.data;
};

const filterDropDownValue = (data, parentRefId, childRefId) => {
  let filteredData = {};
  if (!data?.length > 0) return null;
  if (parentRefId) {
    filteredData = data.find((item) => item.refTypeId === parentRefId);
    if (!filteredData) return null;
    return filteredData.data.find((item) => item.refId === childRefId);
  }
  return null;
};

const filterDropDownCodeValue = (data, parentRefId, childRefCode) => {
  let filteredData = {};
  if (!data?.length > 0) return null;
  if (parentRefId && childRefCode) {
    filteredData = data.find((item) => item.refTypeId === parentRefId);
    if (!filteredData) return null;
    return filteredData.data.find((item) => item.refCode === childRefCode);
  }
  return null;
};

const getRolesValue = (data, roleId) => {
  let filteredData = {};
  if (!data?.length > 0) return null;
  if (roleId) {
    filteredData = data.find((item) => item.roleId === roleId);
  }
  return filteredData;
};

const getRoleAccessLevelValue = (data, accessLevelId) => {
  let filteredData = {};
  if (!data?.length > 0) return null;
  if (accessLevelId) {
    filteredData = data.find((item) => item.accessLevelId === accessLevelId);
  }
  return filteredData;
};

export {
  toBase64,
  dateFormat,
  filterDropDownData,
  filterDropDownValue,
  filterDropDownCodeValue,
  getRolesValue,
  getRoleAccessLevelValue
};
