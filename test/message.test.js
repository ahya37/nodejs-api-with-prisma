import supertest from "supertest";
import { web } from "../src/aplication/web";
import { logger } from "../src/aplication/logging";
import { phoneNumberFormatter } from "../src/utils/phoneNumberformatter";

describe('POST /api/message', function() {
    it('should can send message', async() => {
        
        const result = await supertest(web)
                    .post('/api/message')
                    .set('Authorization','test')
                    .send({
                        sender:"dvc3",
                        number: phoneNumberFormatter("081281529300"),
                        message:"Hello ini server baru"
                    });

        expect(result.status).toBe(200);
    })
})