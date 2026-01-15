import axios from "axios";

const baseURL = process.env.PAYPAL_BASE_URL!;

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await axios.post(
    `${baseURL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data.access_token as string;
}

export async function paypalRequest<T>(
  method: "GET" | "POST",
  url: string,
  data?: any
): Promise<T> {
  const accessToken = await getAccessToken();

  const res = await axios({
    method,
    url: `${baseURL}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
