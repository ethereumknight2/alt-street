import { siteConfig } from './config';

export interface NewsletterSubscribeResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface NewsletterAdapter {
  subscribe(email: string): Promise<NewsletterSubscribeResult>;
}

class BeehiivAdapter implements NewsletterAdapter {
  async subscribe(email: string): Promise<NewsletterSubscribeResult> {
    const { publicationId, apiKey } = siteConfig.newsletter.beehiiv;

    if (!publicationId || !apiKey) {
      return {
        success: false,
        error: 'Beehiiv not configured. Please set BEEHIIV_PUBLICATION_ID and BEEHIIV_API_KEY.',
      };
    }

    try {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: 'website',
            utm_medium: 'organic',
          }),
        }
      );

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed! Please check your email to confirm.',
        };
      } else {
        const data = await response.json();
        return {
          success: false,
          error: data.message || 'Failed to subscribe. Please try again.',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again later.',
      };
    }
  }
}

class ConvertKitAdapter implements NewsletterAdapter {
  async subscribe(email: string): Promise<NewsletterSubscribeResult> {
    const { formId, apiKey } = siteConfig.newsletter.convertkit;

    if (!formId || !apiKey) {
      return {
        success: false,
        error: 'ConvertKit not configured. Please set CONVERTKIT_FORM_ID and CONVERTKIT_API_KEY.',
      };
    }

    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed! Please check your email to confirm.',
        };
      } else {
        const data = await response.json();
        return {
          success: false,
          error: data.message || 'Failed to subscribe. Please try again.',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again later.',
      };
    }
  }
}

export function getNewsletterAdapter(): NewsletterAdapter {
  const provider = siteConfig.newsletter.provider;

  if (provider === 'beehiiv') {
    return new BeehiivAdapter();
  } else {
    return new ConvertKitAdapter();
  }
}
