import supertest from "supertest";
import { createTestUser, getTestUser, removeAllTestAccounts, removeTestUser } from "./test.util.js";
import { web } from "../src/aplication/web.js";
import { logger } from "../src/aplication/logging.js";

describe('POST /api/accounts', function(){
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestAccounts();
        await removeTestUser();
    });

    it('should can new account', async () => {
        const testUser = getTestUser();

        const result = await supertest(web)
                .post('/api/accounts')
                .set('Authorization','test')
                .send({
                    username: testUser.username,
                    whatsapp_id: "test",
                    status:'connected'
                });

        expect(result.status).toBe(200);
        expect(result.body.data.whatsapp_id).toBe("test");
        expect(result.body.data.status).toBe("connected");

    })
})