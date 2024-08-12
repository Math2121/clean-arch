import { Notification } from "./notification"

describe("Notification test", () => {
    it("should create errors", () => {
        const notification = new Notification()

        const error = {
            message: "error",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.messages('customer')).toBe("customer: error")

        const error2 = {
            message: "error message",
            context: "customer"
        }
        notification.addError(error2)
        expect(notification.messages('customer')).toBe("customer: error, customer: error message")

        const erro3 = {
            message: "error message3",
            context: "order"
        }
        notification.addError(erro3)
        expect(notification.messages('customer')).toBe("customer: error, customer: error message")

        expect(notification.messages()).toBe("customer: error, customer: error message, order: error message3")
    })

    it("should check if notification has at least one error", () => {
        const notification = new Notification()

        expect(notification.hasErrors()).toBe(false)

        const error = {
            message: "error",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.hasErrors()).toBe(true)

        notification.clearErrors()

        expect(notification.hasErrors()).toBe(false)
    })

    it("should get all errors props", () => {
        const notification = new Notification()

        const error = {
            message: "error",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.getErrors()).toEqual([error])

        const error2 = {
            message: "error message",
            context: "customer"
        }
        notification.addError(error2)
        expect(notification.getErrors()).toEqual([error, error2])

        const error3 = {
            message: "error message3",
            context: "order"
        }
        notification.addError(error3)
        expect(notification.getErrors()).toEqual([error, error2, error3])
    })
})