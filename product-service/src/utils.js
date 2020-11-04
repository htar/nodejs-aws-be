export const generateResponse = ({code = 200,body = {},allowedOrigins = "*"}) => {
  return {
    statusCode: code,
    body: JSON.stringify(body),
    headers: { "Access-Control-Allow-Origin": allowedOrigins },
  };
};
