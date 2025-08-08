// first have activation code, client_id, client_secret, serial_no

import { test, expect } from "@playwright/test";

const ENV_VAR = process.env.ENV_FILE || 'env-staging.yaml';
const loadConfig = require('../../../../loadConfig');
const env = loadConfig(ENV_VAR);

const activation_code = '601284';
const serial_no = '601284';


test('activate pos', async ({ request }) => {
    const response = await request.post(env.POS_GRPC_API_ENDPOINT + '/pos-profile-service/api/activate-pos', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'activation_code': activation_code,
            'client_id': 'test',
            'client_secret': 'test',
            'serial_no': serial_no
        }
    });
});