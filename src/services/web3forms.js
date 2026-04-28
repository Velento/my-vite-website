const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Web3Forms access key is public-by-design (confirmed in the Web3Forms UI:
// "This is a public key, like a form id. You can safely use it in client side code").
// We still allow an env override so the key can be swapped per environment.
const PUBLIC_ACCESS_KEY = '6b931942-d695-4ae7-a98b-54516694c708';

function getAccessKey() {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || PUBLIC_ACCESS_KEY;
}

export async function sendLeadToWeb3Forms({ name, phone, promo }) {
  const lines = [`Имя: ${name}`, `Телефон: ${phone}`];
  if (promo) lines.push(`Промокод: ${promo}`);

  const body = {
    access_key: getAccessKey(),
    subject: 'Новая заявка с сайта LegalLine',
    from_name: 'LegalLine',
    name,
    phone,
    promo: promo || '',
    message: lines.join('\n'),
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // ignore parse errors — we'll throw below
  }

  if (!response.ok || !data?.success) {
    const description = data?.message || `HTTP ${response.status}`;
    throw new Error(`Web3Forms ${response.status}: ${description}`);
  }

  return data;
}
