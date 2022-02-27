// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

const request = axios.create({
  baseURL: "https://api.staging.sopost.dev/v1",
});

type Request = {
  name: string;
  email: string;
  items: {
    forks: boolean;
    knives: boolean;
    spoons: boolean;
  };
  address: {
    line_1: string;
    line_2: string;
    town: string;
    district: string;
    territory: string;
    country: string;
    postcode: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: string }>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
    }

    const { name, email, items, address } = req.body as Request;

    const line_items = [];
    if (items.forks) {
      line_items.push({
        stock_partition_id: process.env.SOPOST_FORKS,
      });
    }
    if (items.knives) {
      line_items.push({
        stock_partition_id: process.env.SOPOST_KNIVES,
      });
    }
    if (items.spoons) {
      line_items.push({
        stock_partition_id: process.env.SOPOST_SPOONS,
      });
    }

    const data = {
      activity_id: process.env.SOPOST_ACTIVITY_ID,
      full_name: name,
      email,
      provider: "SoPost-JuanInterviewTask",
      identity: uuidv4(),
      line_items,
      address: {
        line_1: address.line_1,
        line_2: address.line_2,
        town: address.town,
        district: address.district,
        territory: address.territory,
        postcode: address.postcode,
      },
      consents: [],
      locale: "en_GB",
    };

    console.log(data);
    const response = await request.post("/orders", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SOPOST_USERNAME}:${process.env.SOPOST_PASSWORD}`
        ).toString("base64")}`,
      },
    });
    console.log(response);
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to place the order" });
  }
}
