import FirecrawlApp from "firecrawl";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          prompt:
            "Extract product name, current price, currency code, and product image URL from this product page. " +
            "Respond as a JSON object with keys: productName, currentPrice, currencyCode, productImageUrl.",
        },
      ],
      onlyMainContent: false,
      timeout: 120000,
    });

    // ✅ use top‑level `json` as in your RAW RESULT
    const extractedData = result?.json || null;

   // console.log("FIRECRAWL JSON DATA ===>", extractedData);

    if (!extractedData?.productName || !extractedData?.currentPrice) {
      throw new Error("No product data extracted");
    }

    return {
      productName: extractedData.productName,
      currentPrice: String(extractedData.currentPrice),
      currencyCode: extractedData.currencyCode ?? null,
      productImageUrl: extractedData.productImageUrl ?? null,
    };
  } catch (error) {
    console.error("Firecrawl extract error:", error);
    throw error;
  }
}
