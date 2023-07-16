import supertest from "supertest";
import { web } from "../src/aplication/web";
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test.util";
import { logger } from "../src/aplication/logging";

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
            .set('Authorization', 'test')
            .send({
                firstName: "test",
                lastName: "test",
                email: "test@oz.com",
                phone: "0988766677"
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
            .set('Authorization', 'test')
            .send({
                firstName: "",
                lastName: "test",
                email: "testoz",
                phone: "09887666770000000000000000000000000000000000000000000000000000"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();

    });
});

describe('GET /api/contacts/:contactId', function () {

    beforeEach(async () => {

        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')

        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.firstName).toBe(testContact.firstName);
        expect(result.body.data.lastName).toBe(testContact.lastName);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('should return 404 if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id + 1)
            .set('Authorization', 'test')

        logger.info(result);
        expect(result.status).toBe(404);
    });

});

describe('PUT /api/contacts/:contactId', function () {

    beforeEach(async () => {

        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can update exists contact', async () => {

        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                firstName: "Ahya",
                lastName: "Ahmad",
                email: "ahya@oz.com",
                phone: "09887666778"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.firstName).toBe("Ahya");
        expect(result.body.data.lastName).toBe("Ahmad");
        expect(result.body.data.email).toBe("ahya@oz.com");
        expect(result.body.data.phone).toBe("09887666778");

    });

    it('should reject if contact is not found', async () => {

        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                firstName: "Ahya",
                lastName: "Ahmad",
                email: "ahya@oz.com",
                phone: "09887666778"
            });

        expect(result.status).toBe(404);

    });
});

describe('DELETE /api/contacts/:contactId', function(){

    beforeEach(async () => {

        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can delete contact', async () => {

        let testContact = await getTestContact();

        const result = await supertest(web)
                .delete('/api/contacts/' + testContact.id)
                .set('Authorization', 'test')

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();

        expect(testContact).toBeNull();
    });

    it('should reject if contact is not found', async () => {

        let testContact = await getTestContact();

        const result = await supertest(web)
                .delete('/api/contacts/' + (testContact.id + 1))
                .set('Authorization', 'test')

        expect(result.status).toBe(404);

    });

});

describe('GET /api/contacts', function() {
    beforeEach(async () => {

        await createTestUser();
        await createTestContact();
        await createManyTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can search without parameter', async () => {
        const result = await supertest(web)
                    .get('/api/contacts')
                    .set('Authorization','test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.data.paging.page).toBe(1);
        expect(result.body.data.paging.total_page).toBe(2);
        expect(result.body.data.paging.total_item).toBe(15);
    })
})