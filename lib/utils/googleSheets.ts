import { ContactFormData } from "./validation";

/**
 * Saves lead data to Google Sheets via Google Apps Script webhook
 * @param data - The contact form data to save
 * @returns Promise that resolves if successful, rejects on error
 */
export async function saveLeadToGoogleSheets(
  data: ContactFormData
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Google Sheets webhook failed: ${response.status} ${errorText}`
      );
    }

    const result = await response.json().catch(() => ({}));
    if (result.success === false) {
      throw new Error(
        `Google Sheets webhook returned error: ${result.error || "Unknown error"}`
      );
    }
  } catch (error) {
    // Re-throw with more context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to save to Google Sheets: ${String(error)}`);
  }
}

