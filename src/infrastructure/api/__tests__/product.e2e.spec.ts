import { app, sequelize } from "../express";
import request from "supertest"
describe("E2E product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all customers", async () => {
        await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Product 1",
                price: 100
            })
        const response = await request(app)
            .get("/products").send()
        expect(response.status).toBe(200)
        expect(response.body.products.length).toEqual(1)

        const listResponseXml = await request(app)
            .get("/products")
            .set("Accept", "application/xml")
            .send()

        expect(listResponseXml.status).toBe(200)
        expect(listResponseXml.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
        expect(listResponseXml.text).toContain('<product>')
        expect(listResponseXml.text).toContain('</product>')

        expect(listResponseXml.text).toContain('Product 1')

    })
})