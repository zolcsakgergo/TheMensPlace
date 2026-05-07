import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isConfigured, projectId } from "../env";

export const client: SanityClient | null = isConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
