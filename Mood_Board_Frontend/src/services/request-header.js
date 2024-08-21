const RequestHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${localStorage.getItem('token')}`
};

export default RequestHeader;
