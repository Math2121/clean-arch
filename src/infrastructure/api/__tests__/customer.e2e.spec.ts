import { app, sequelize } from "../express";
import request from "supertest"
describe("E2E customers", () => {
    beforeEach(async() => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Street",
                    number: 123,
                    zip: "12345",
                    city: "New York"
                }
            })
        expect(response.status).toBe(201)
        expect(response.body.name).toEqual("John Doe")
        expect(response.body.address.street).toEqual("123 Street")
    })

    it("should create a new customer with error", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: ""
            })
        expect(response.status).toBe(500)
  
    })
    it("should list all customers", async()=> {
        await request(app)
           .post("/customers")
           .send({
                name: "John Doe",
                address: {
                    street: "123 Street",
                    number: 123,
                    zip: "12345",
                    city: "New York"
                }
            })
        await request(app)
            .post("/customers")
            .send({
                 name: "Jane Doe",
                 address: {
                     street: "123 Street",
                     number: 123,
                     zip: "12345",
                     city: "New York"
                 }
             })
        const response = await request(app)
           .get("/customers").send()
        expect(response.status).toBe(200)
        expect(response.body.customers.length).toBeGreaterThan(1)

        const listResponseXml = await request(app)
        .get("/customers")
        .set("Accept", "application/xml")
        .send()

        expect(listResponseXml.status).toBe(200)
        expect(listResponseXml.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
        expect(listResponseXml.text).toContain('<customers>')
        expect(listResponseXml.text).toContain('</customers>')
        
        expect(listResponseXml.text).toContain('John Doe')
        expect(listResponseXml.text).toContain('Jane Doe')
        


    })
})