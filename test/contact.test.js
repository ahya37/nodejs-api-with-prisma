import supertest from "supertest";
import { web } from "../src/aplication/web";
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test.util";

describe('POST /api/contacts', function () {

    beforeEach(async () => {

        await createTestUser();

    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization','test')
            .send({
                firstName: "test",
                lastName:"test",
                email:"test@oz.com",
                phone:"0988766677"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.firstName).toBe("test");
        expect(result.body.data.lastName).toBe("test");
        expect(result.body.data.email).toBe("test@oz.com");
        expect(result.body.data.phone).toBe("0988766677");

    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization','test')
            .send({
                firstName: "",
                lastName:"test",
                email:"testoz",
                phone:"09887666770000000000000000000000000000000000000000000000000000"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();

    });
})