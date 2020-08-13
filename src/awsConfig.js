export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "minions-webapp-uploud",
  },
  orders_apiGateway: {
    REGION: "us-east-1",
    NAME: "prod-minions-webapp-orders-api",
    URL: "https://0i1gl8qra7.execute-api.us-east-1.amazonaws.com/prod/",
  },
  products_apiGateway: {
    REGION: "us-east-1",
    NAME: "prod-minions-webapp-products-api",
    URL: "https://zirgcl1e7a.execute-api.us-east-1.amazonaws.com/prod/",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_MWyJN6i2k",
    APP_CLIENT_ID: "3n36448jj7hgjsatm0a54e23m8",
    IDENTITY_POOL_ID: "us-east-1:57b03a2f-68be-4c7f-b5c2-d9130628bc2b",
  },
};
