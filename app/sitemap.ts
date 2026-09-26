import type { MetadataRoute } from "next";
import { personal } from "@/lib/data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: personal.portfolio, changeFrequency: "monthly", priority: 1 }];
}
