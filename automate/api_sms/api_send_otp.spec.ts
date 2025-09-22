import { test, expect, request as pwRequest } from '@playwright/test';

const PATH = 'https://staging-sms-api.devfullteam.tech/sms-api-service/sms/send-sms'; //staging
// const PATH = 'https://sms-api.fullteam.tech/sms-api-service/sms/send-otp'; //production
const DEFAULT_TOKEN = process.env.SMS_API_TOKEN ?? 'cWFfdGVzdF9vdHA6cWFfdGVzdF9vdHA=';

function uid(prefix: string) {
  return `${prefix}${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0,15)}`;
}

test.describe('SMS API', () => {
  test('send SMS Single', async () => {
    const ctx = await pwRequest.newContext({
      extraHTTPHeaders: { Authorization: `Bearer ${DEFAULT_TOKEN}` },
    });
    const body = {
      request_id: uid('sfrq'),
      transaction_id: uid('sfts'),
      mobile_number: '66868884270',
      sender_name: 'FULLTEAM',
      message: 'ทดสอบ รหัส OTP ของคุณคือ #otp_code# Ref code #reference_code#'

    };
    const res = await ctx.post(PATH, { data: body });
    const json = await res.json();
    console.log('Response JSON:', json);
  });
});