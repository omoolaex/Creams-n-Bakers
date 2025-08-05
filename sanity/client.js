import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "b4uxtr36",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // ✅ Forces direct API calls
});