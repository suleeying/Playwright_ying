import { test, expect, request as pwRequest } from '@playwright/test';

// const PATH = 'https://staging-sms-api.devfullteam.tech/sms-api-service/sms/send-sms'; //staging
const PATH = 'https://sms-api.fullteam.tech/sms-api-service/sms/send-sms'; //production
const DEFAULT_TOKEN = process.env.SMS_API_TOKEN ?? 'cWFfdGVzdF9zbXM6cWFfdGVzdF9zbXM=';

function uid(prefix: string) {
  return `${prefix}${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0,15)}`;
}

test.describe('SMS API', () => {
  test('send SMS Multiple', async () => {
    const ctx = await pwRequest.newContext({
      extraHTTPHeaders: { Authorization: `Bearer ${DEFAULT_TOKEN}` },
    });

    const mobiles = ['66868884270', '66823861894'];
    for (const mobile of mobiles) {
      const body = {
        request_id: uid('sfrq'),
        transaction_id: uid('sfts'),
        sender_name: 'FULLTEAM',
        mobile_number: mobile,
        message: 'ทดสอบ มัลติ หนึ่งเครดิต หนึ่งเครดิต หนึ่งเครดิต หนึ่งเครดิต หนึ่งเครดิ',
      };
      const res = await ctx.post(PATH, { data: body });
      const json = await res.json();
      console.log(`Response for ${mobile}:`, json);
    }
  });
});