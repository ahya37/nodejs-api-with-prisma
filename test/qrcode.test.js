import supertest from "supertest";
import { createTestUser, removeTestUser } from "./test.util";
import { web } from "../src/aplication/web";
import { logger } from "../src/aplication/logging";

describe('POST /api/qrcode', function () {
    beforeEach(async () => {

        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('shoul can new qrcode', async (done) => {
        const result = await supertest(web)
                .post('/api/qrcode')
                .set('Authorization','test')
                .send({
                    deviceId: "dvc1"
                });
        
        logger.info(result);
        expect(result.status).toBe(200);
        done();
    });
});