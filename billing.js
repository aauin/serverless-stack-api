import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";
  const secretAPIKey = "sk_test_od8tOrvoBE7BO4qE3jcXWSrw00qCQFSZs5";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(secretAPIKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }
}